import { Hono } from 'npm:hono'
import { cors } from 'npm:hono/cors'
import { logger } from 'npm:hono/logger'
import { createClient } from 'npm:@supabase/supabase-js@2'
import * as kv from './kv_store.tsx'

const app = new Hono()

app.use('*', logger(console.log))
app.use('*', cors())

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
)

// Initialize storage buckets
const initStorage = async () => {
  const buckets = ['make-66e6c95d-hackathon-covers', 'make-66e6c95d-organizer-logos']
  
  for (const bucketName of buckets) {
    const { data: existingBuckets } = await supabase.storage.listBuckets()
    const bucketExists = existingBuckets?.some(bucket => bucket.name === bucketName)
    
    if (!bucketExists) {
      await supabase.storage.createBucket(bucketName, { public: false })
      console.log(`Created bucket: ${bucketName}`)
    }
  }
}

initStorage()

// Helper to verify user
async function verifyUser(request: Request) {
  const accessToken = request.headers.get('Authorization')?.split(' ')[1]
  if (!accessToken) {
    return { error: 'No access token provided', status: 401 }
  }
  
  const { data: { user }, error } = await supabase.auth.getUser(accessToken)
  if (error || !user) {
    return { error: 'Unauthorized - Invalid token', status: 401 }
  }
  
  return { user }
}

// Sign up route
app.post('/make-server-66e6c95d/signup', async (c) => {
  try {
    const { email, password, name, role = 'participant' } = await c.req.json()
    
    if (!email || !password || !name) {
      return c.json({ error: 'Missing required fields' }, 400)
    }
    
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name, role },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    })
    
    if (error) {
      console.log('Signup error:', error)
      return c.json({ error: `Failed to create user: ${error.message}` }, 400)
    }
    
    // Store user data in KV
    await kv.set(`user:${data.user.id}`, {
      id: data.user.id,
      email,
      name,
      role,
      createdAt: new Date().toISOString()
    })
    
    return c.json({ user: data.user })
  } catch (error) {
    console.log('Signup error:', error)
    return c.json({ error: `Signup failed: ${error.message}` }, 500)
  }
})

// Get current user profile
app.get('/make-server-66e6c95d/me', async (c) => {
  const { user, error, status } = await verifyUser(c.req.raw)
  if (error) return c.json({ error }, status)
  
  try {
    const userData = await kv.get(`user:${user.id}`)
    
    if (!userData) {
      // Create user profile if it doesn't exist (for Google OAuth users)
      const newUser = {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.name || user.email?.split('@')[0],
        role: user.user_metadata?.role || 'participant',
        createdAt: new Date().toISOString()
      }
      await kv.set(`user:${user.id}`, newUser)
      return c.json(newUser)
    }
    
    return c.json(userData)
  } catch (error) {
    console.log('Get user profile error:', error)
    return c.json({ error: `Failed to get user profile: ${error.message}` }, 500)
  }
})

// Create organizer (Super Admin only)
app.post('/make-server-66e6c95d/organizers', async (c) => {
  const { user, error, status } = await verifyUser(c.req.raw)
  if (error) return c.json({ error }, status)
  
  try {
    const currentUser = await kv.get(`user:${user.id}`)
    if (currentUser?.role !== 'superadmin') {
      return c.json({ error: 'Only super admins can create organizers' }, 403)
    }
    
    const { name, email, description, website } = await c.req.json()
    
    const organizerId = crypto.randomUUID()
    const organizer = {
      id: organizerId,
      name,
      email,
      description,
      website,
      logo: null,
      createdBy: user.id,
      createdAt: new Date().toISOString()
    }
    
    await kv.set(`organizer:${organizerId}`, organizer)
    
    // Add to organizers list
    const organizers = await kv.get('organizers:list') || []
    organizers.push(organizerId)
    await kv.set('organizers:list', organizers)
    
    return c.json(organizer)
  } catch (error) {
    console.log('Create organizer error:', error)
    return c.json({ error: `Failed to create organizer: ${error.message}` }, 500)
  }
})

// Get all organizers
app.get('/make-server-66e6c95d/organizers', async (c) => {
  const { user, error, status } = await verifyUser(c.req.raw)
  if (error) return c.json({ error }, status)
  
  try {
    const organizerIds = await kv.get('organizers:list') || []
    const organizers = await kv.mget(organizerIds.map((id: string) => `organizer:${id}`))
    
    return c.json(organizers.filter(Boolean))
  } catch (error) {
    console.log('Get organizers error:', error)
    return c.json({ error: `Failed to get organizers: ${error.message}` }, 500)
  }
})

// Update organizer role for a user
app.post('/make-server-66e6c95d/organizers/:organizerId/assign', async (c) => {
  const { user, error, status } = await verifyUser(c.req.raw)
  if (error) return c.json({ error }, status)
  
  try {
    const currentUser = await kv.get(`user:${user.id}`)
    if (currentUser?.role !== 'superadmin') {
      return c.json({ error: 'Only super admins can assign organizers' }, 403)
    }
    
    const organizerId = c.req.param('organizerId')
    const { userEmail } = await c.req.json()
    
    // Find user by email
    const users = await kv.getByPrefix('user:')
    const targetUser = users.find((u: any) => u.email === userEmail)
    
    if (!targetUser) {
      return c.json({ error: 'User not found' }, 404)
    }
    
    // Update user role
    targetUser.role = 'organizer'
    targetUser.organizerId = organizerId
    await kv.set(`user:${targetUser.id}`, targetUser)
    
    return c.json(targetUser)
  } catch (error) {
    console.log('Assign organizer error:', error)
    return c.json({ error: `Failed to assign organizer: ${error.message}` }, 500)
  }
})

// Create hackathon
app.post('/make-server-66e6c95d/hackathons', async (c) => {
  const { user, error, status } = await verifyUser(c.req.raw)
  if (error) return c.json({ error }, status)
  
  try {
    const currentUser = await kv.get(`user:${user.id}`)
    if (currentUser?.role !== 'organizer' && currentUser?.role !== 'superadmin') {
      return c.json({ error: 'Only organizers can create hackathons' }, 403)
    }
    
    const hackathonData = await c.req.json()
    const hackathonId = crypto.randomUUID()
    
    const hackathon = {
      id: hackathonId,
      ...hackathonData,
      organizerId: currentUser.organizerId || hackathonData.organizerId,
      createdBy: user.id,
      createdAt: new Date().toISOString(),
      participants: []
    }
    
    await kv.set(`hackathon:${hackathonId}`, hackathon)
    
    // Add to hackathons list
    const hackathons = await kv.get('hackathons:list') || []
    hackathons.push(hackathonId)
    await kv.set('hackathons:list', hackathons)
    
    return c.json(hackathon)
  } catch (error) {
    console.log('Create hackathon error:', error)
    return c.json({ error: `Failed to create hackathon: ${error.message}` }, 500)
  }
})

// Get all hackathons
app.get('/make-server-66e6c95d/hackathons', async (c) => {
  try {
    const hackathonIds = await kv.get('hackathons:list') || []
    const hackathons = await kv.mget(hackathonIds.map((id: string) => `hackathon:${id}`))
    
    return c.json(hackathons.filter(Boolean))
  } catch (error) {
    console.log('Get hackathons error:', error)
    return c.json({ error: `Failed to get hackathons: ${error.message}` }, 500)
  }
})

// Get hackathon by ID
app.get('/make-server-66e6c95d/hackathons/:id', async (c) => {
  try {
    const hackathonId = c.req.param('id')
    const hackathon = await kv.get(`hackathon:${hackathonId}`)
    
    if (!hackathon) {
      return c.json({ error: 'Hackathon not found' }, 404)
    }
    
    return c.json(hackathon)
  } catch (error) {
    console.log('Get hackathon error:', error)
    return c.json({ error: `Failed to get hackathon: ${error.message}` }, 500)
  }
})

// Update hackathon
app.put('/make-server-66e6c95d/hackathons/:id', async (c) => {
  const { user, error, status } = await verifyUser(c.req.raw)
  if (error) return c.json({ error }, status)
  
  try {
    const hackathonId = c.req.param('id')
    const hackathon = await kv.get(`hackathon:${hackathonId}`)
    
    if (!hackathon) {
      return c.json({ error: 'Hackathon not found' }, 404)
    }
    
    const currentUser = await kv.get(`user:${user.id}`)
    if (hackathon.createdBy !== user.id && currentUser?.role !== 'superadmin') {
      return c.json({ error: 'Not authorized to update this hackathon' }, 403)
    }
    
    const updates = await c.req.json()
    const updatedHackathon = { ...hackathon, ...updates, id: hackathonId }
    
    await kv.set(`hackathon:${hackathonId}`, updatedHackathon)
    
    return c.json(updatedHackathon)
  } catch (error) {
    console.log('Update hackathon error:', error)
    return c.json({ error: `Failed to update hackathon: ${error.message}` }, 500)
  }
})

// Register for hackathon
app.post('/make-server-66e6c95d/hackathons/:id/register', async (c) => {
  const { user, error, status } = await verifyUser(c.req.raw)
  if (error) return c.json({ error }, status)
  
  try {
    const hackathonId = c.req.param('id')
    const hackathon = await kv.get(`hackathon:${hackathonId}`)
    
    if (!hackathon) {
      return c.json({ error: 'Hackathon not found' }, 404)
    }
    
    if (!hackathon.participants) {
      hackathon.participants = []
    }
    
    if (hackathon.participants.includes(user.id)) {
      return c.json({ error: 'Already registered' }, 400)
    }
    
    hackathon.participants.push(user.id)
    await kv.set(`hackathon:${hackathonId}`, hackathon)
    
    return c.json({ message: 'Successfully registered', hackathon })
  } catch (error) {
    console.log('Register for hackathon error:', error)
    return c.json({ error: `Failed to register: ${error.message}` }, 500)
  }
})

// Get hackathon participants
app.get('/make-server-66e6c95d/hackathon/:id/participants', async (c) => {
  const { user, error, status } = await verifyUser(c.req.raw)
  if (error) return c.json({ error }, status)
  
  try {
    const hackathonId = c.req.param('id')
    const hackathon = await kv.get(`hackathon:${hackathonId}`)
    
    if (!hackathon) {
      return c.json({ error: 'Hackathon not found' }, 404)
    }
    
    // Get participant details
    const participantIds = hackathon.participants || []
    const participants = await kv.mget(participantIds.map((id: string) => `user:${id}`))
    
    return c.json(participants.filter(Boolean).map((p: any) => ({
      id: p.id,
      name: p.name,
      email: p.email,
      role: p.role,
      joinedAt: p.createdAt,
      avatar: p.avatar
    })))
  } catch (error) {
    console.log('Get participants error:', error)
    return c.json({ error: `Failed to get participants: ${error.message}` }, 500)
  }
})

// Get hackathon teams
app.get('/make-server-66e6c95d/hackathon/:id/teams', async (c) => {
  const { user, error, status } = await verifyUser(c.req.raw)
  if (error) return c.json({ error }, status)
  
  try {
    const hackathonId = c.req.param('id')
    const teams = await kv.getByPrefix(`team:${hackathonId}:`) || []
    
    return c.json(teams)
  } catch (error) {
    console.log('Get teams error:', error)
    return c.json({ error: `Failed to get teams: ${error.message}` }, 500)
  }
})

// Get hackathon projects
app.get('/make-server-66e6c95d/hackathon/:id/projects', async (c) => {
  const { user, error, status } = await verifyUser(c.req.raw)
  if (error) return c.json({ error }, status)
  
  try {
    const hackathonId = c.req.param('id')
    const projects = await kv.getByPrefix(`project:${hackathonId}:`) || []
    
    return c.json(projects)
  } catch (error) {
    console.log('Get projects error:', error)
    return c.json({ error: `Failed to get projects: ${error.message}` }, 500)
  }
})

// Get hackathon messages
app.get('/make-server-66e6c95d/hackathon/:id/messages', async (c) => {
  const { user, error, status } = await verifyUser(c.req.raw)
  if (error) return c.json({ error }, status)
  
  try {
    const hackathonId = c.req.param('id')
    const messages = await kv.getByPrefix(`message:${hackathonId}:`) || []
    
    return c.json(messages)
  } catch (error) {
    console.log('Get messages error:', error)
    return c.json({ error: `Failed to get messages: ${error.message}` }, 500)
  }
})

// Send hackathon message
app.post('/make-server-66e6c95d/hackathon/:id/message', async (c) => {
  const { user, error, status } = await verifyUser(c.req.raw)
  if (error) return c.json({ error }, status)
  
  try {
    const hackathonId = c.req.param('id')
    const hackathon = await kv.get(`hackathon:${hackathonId}`)
    
    if (!hackathon) {
      return c.json({ error: 'Hackathon not found' }, 404)
    }
    
    const currentUser = await kv.get(`user:${user.id}`)
    if (hackathon.createdBy !== user.id && currentUser?.role !== 'superadmin') {
      return c.json({ error: 'Not authorized to send messages for this hackathon' }, 403)
    }
    
    const { message, type = 'announcement' } = await c.req.json()
    const messageId = crypto.randomUUID()
    
    const messageData = {
      id: messageId,
      hackathonId,
      from: currentUser.name,
      message,
      type,
      timestamp: new Date().toISOString()
    }
    
    await kv.set(`message:${hackathonId}:${messageId}`, messageData)
    
    return c.json(messageData)
  } catch (error) {
    console.log('Send message error:', error)
    return c.json({ error: `Failed to send message: ${error.message}` }, 500)
  }
})

// Upload file endpoint
app.post('/make-server-66e6c95d/upload', async (c) => {
  const { user, error, status } = await verifyUser(c.req.raw)
  if (error) return c.json({ error }, status)
  
  try {
    const formData = await c.req.formData()
    const file = formData.get('file') as File
    const bucket = formData.get('bucket') as string
    
    if (!file || !bucket) {
      return c.json({ error: 'File and bucket are required' }, 400)
    }
    
    const fileName = `${crypto.randomUUID()}-${file.name}`
    const arrayBuffer = await file.arrayBuffer()
    
    const { data, error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(fileName, arrayBuffer, {
        contentType: file.type,
      })
    
    if (uploadError) {
      console.log('Upload error:', uploadError)
      return c.json({ error: `Upload failed: ${uploadError.message}` }, 500)
    }
    
    // Get signed URL
    const { data: signedUrlData } = await supabase.storage
      .from(bucket)
      .createSignedUrl(fileName, 60 * 60 * 24 * 365) // 1 year
    
    return c.json({ url: signedUrlData?.signedUrl, path: fileName })
  } catch (error) {
    console.log('Upload error:', error)
    return c.json({ error: `Upload failed: ${error.message}` }, 500)
  }
})

Deno.serve(app.fetch)
