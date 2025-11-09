import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { apiCall } from '../utils/api'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Plus, X, Upload, ArrowLeft, Save, Calendar, MapPin, DollarSign, Users, Award, GraduationCap, Clock } from 'lucide-react'
import { toast } from 'sonner@2.0.3'

interface Judge {
  name: string
  title: string
  bio?: string
  photo?: string
}

interface Mentor {
  name: string
  expertise: string
  bio?: string
  photo?: string
}

interface ScheduleItem {
  time: string
  title: string
  description?: string
}

export function CreateHackathon() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditing = !!id

  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  
  // Form states
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [about, setAbout] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [organizerLogo, setOrganizerLogo] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [location, setLocation] = useState('')
  const [prizePool, setPrizePool] = useState('')
  const [maxParticipants, setMaxParticipants] = useState('')
  const [status, setStatus] = useState('upcoming')
  const [judges, setJudges] = useState<Judge[]>([])
  const [mentors, setMentors] = useState<Mentor[]>([])
  const [schedule, setSchedule] = useState<ScheduleItem[]>([])

  useEffect(() => {
    if (isEditing) {
      loadHackathon()
    }
  }, [id])

  const loadHackathon = async () => {
    try {
      const data = await apiCall(`/hackathons/${id}`)
      setTitle(data.title || '')
      setDescription(data.description || '')
      setAbout(data.about || '')
      setCoverImage(data.coverImage || '')
      setOrganizerLogo(data.organizerLogo || '')
      setStartDate(data.startDate || '')
      setEndDate(data.endDate || '')
      setLocation(data.location || '')
      setPrizePool(data.prizePool || '')
      setMaxParticipants(data.maxParticipants?.toString() || '')
      setStatus(data.status || 'upcoming')
      setJudges(data.judges || [])
      setMentors(data.mentors || [])
      setSchedule(data.schedule || [])
    } catch (error: any) {
      console.error('Failed to load hackathon:', error)
      toast.error('Failed to load hackathon details')
      navigate('/dashboard')
    }
  }

  const handleImageUpload = async (file: File, type: 'cover' | 'logo') => {
    try {
      setUploading(true)
      const formData = new FormData()
      formData.append('file', file)
      
      const result = await apiCall('/upload-image', {
        method: 'POST',
        body: formData,
        headers: {}
      })
      
      if (type === 'cover') {
        setCoverImage(result.url)
      } else {
        setOrganizerLogo(result.url)
      }
      
      toast.success('Image uploaded successfully')
    } catch (error: any) {
      console.error('Image upload failed:', error)
      toast.error('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const addJudge = () => {
    setJudges([...judges, { name: '', title: '', bio: '', photo: '' }])
  }

  const updateJudge = (index: number, field: keyof Judge, value: string) => {
    const updated = [...judges]
    updated[index] = { ...updated[index], [field]: value }
    setJudges(updated)
  }

  const removeJudge = (index: number) => {
    setJudges(judges.filter((_, i) => i !== index))
  }

  const addMentor = () => {
    setMentors([...mentors, { name: '', expertise: '', bio: '', photo: '' }])
  }

  const updateMentor = (index: number, field: keyof Mentor, value: string) => {
    const updated = [...mentors]
    updated[index] = { ...updated[index], [field]: value }
    setMentors(updated)
  }

  const removeMentor = (index: number) => {
    setMentors(mentors.filter((_, i) => i !== index))
  }

  const addScheduleItem = () => {
    setSchedule([...schedule, { time: '', title: '', description: '' }])
  }

  const updateScheduleItem = (index: number, field: keyof ScheduleItem, value: string) => {
    const updated = [...schedule]
    updated[index] = { ...updated[index], [field]: value }
    setSchedule(updated)
  }

  const removeScheduleItem = (index: number) => {
    setSchedule(schedule.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title || !description || !startDate || !endDate || !location) {
      toast.error('Please fill in all required fields')
      return
    }

    try {
      setLoading(true)
      
      const hackathonData = {
        title,
        description,
        about,
        coverImage,
        organizerLogo,
        startDate,
        endDate,
        location,
        prizePool,
        maxParticipants: maxParticipants ? parseInt(maxParticipants) : undefined,
        status,
        judges: judges.filter(j => j.name && j.title),
        mentors: mentors.filter(m => m.name && m.expertise),
        schedule: schedule.filter(s => s.time && s.title)
      }

      if (isEditing) {
        await apiCall(`/hackathons/${id}`, {
          method: 'PUT',
          body: JSON.stringify(hackathonData)
        })
        toast.success('Hackathon updated successfully')
      } else {
        await apiCall('/hackathons', {
          method: 'POST',
          body: JSON.stringify(hackathonData)
        })
        toast.success('Hackathon created successfully')
      }
      
      navigate('/dashboard')
    } catch (error: any) {
      console.error('Failed to save hackathon:', error)
      toast.error(error.message || 'Failed to save hackathon')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-4xl mb-2">
            {isEditing ? 'Edit Hackathon' : 'Create New Hackathon'}
          </h1>
          <p className="text-gray-600">
            {isEditing ? 'Update your hackathon details' : 'Fill in the details to launch your hackathon'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Hackathon Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Web3 Innovation Challenge"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Short Description *</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="A brief description of your hackathon"
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label htmlFor="about">Detailed About Section</Label>
                <Textarea
                  id="about"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  placeholder="Detailed information about the hackathon, themes, goals, etc."
                  rows={5}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date *</Label>
                  <Input
                    id="startDate"
                    type="datetime-local"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="endDate">End Date *</Label>
                  <Input
                    id="endDate"
                    type="datetime-local"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g., Online / San Francisco, CA"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="prizePool">Prize Pool</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="prizePool"
                      value={prizePool}
                      onChange={(e) => setPrizePool(e.target.value)}
                      placeholder="e.g., $50,000"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="maxParticipants">Max Participants</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="maxParticipants"
                      type="number"
                      value={maxParticipants}
                      onChange={(e) => setMaxParticipants(e.target.value)}
                      placeholder="e.g., 500"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Images
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="coverImage">Cover Image URL</Label>
                <Input
                  id="coverImage"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  placeholder="https://example.com/cover.jpg"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Recommended size: 1200x600px
                </p>
              </div>

              <div>
                <Label htmlFor="organizerLogo">Organizer Logo URL</Label>
                <Input
                  id="organizerLogo"
                  value={organizerLogo}
                  onChange={(e) => setOrganizerLogo(e.target.value)}
                  placeholder="https://example.com/logo.png"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Recommended size: 200x200px
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Judges */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-between">
                <span className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Judges
                </span>
                <Button type="button" onClick={addJudge} size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Judge
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {judges.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No judges added yet</p>
              ) : (
                judges.map((judge, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-3 relative">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeJudge(index)}
                      className="absolute top-2 right-2"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Input
                        placeholder="Judge Name"
                        value={judge.name}
                        onChange={(e) => updateJudge(index, 'name', e.target.value)}
                      />
                      <Input
                        placeholder="Title/Role"
                        value={judge.title}
                        onChange={(e) => updateJudge(index, 'title', e.target.value)}
                      />
                    </div>
                    <Textarea
                      placeholder="Bio (optional)"
                      value={judge.bio || ''}
                      onChange={(e) => updateJudge(index, 'bio', e.target.value)}
                      rows={2}
                    />
                    <Input
                      placeholder="Photo URL (optional)"
                      value={judge.photo || ''}
                      onChange={(e) => updateJudge(index, 'photo', e.target.value)}
                    />
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Mentors */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-between">
                <span className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Mentors
                </span>
                <Button type="button" onClick={addMentor} size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Mentor
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mentors.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No mentors added yet</p>
              ) : (
                mentors.map((mentor, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-3 relative">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeMentor(index)}
                      className="absolute top-2 right-2"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Input
                        placeholder="Mentor Name"
                        value={mentor.name}
                        onChange={(e) => updateMentor(index, 'name', e.target.value)}
                      />
                      <Input
                        placeholder="Expertise"
                        value={mentor.expertise}
                        onChange={(e) => updateMentor(index, 'expertise', e.target.value)}
                      />
                    </div>
                    <Textarea
                      placeholder="Bio (optional)"
                      value={mentor.bio || ''}
                      onChange={(e) => updateMentor(index, 'bio', e.target.value)}
                      rows={2}
                    />
                    <Input
                      placeholder="Photo URL (optional)"
                      value={mentor.photo || ''}
                      onChange={(e) => updateMentor(index, 'photo', e.target.value)}
                    />
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-between">
                <span className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Schedule
                </span>
                <Button type="button" onClick={addScheduleItem} size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Event
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {schedule.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No schedule items added yet</p>
              ) : (
                schedule.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-3 relative">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeScheduleItem(index)}
                      className="absolute top-2 right-2"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <Label className="text-xs text-gray-600 mb-1">Time</Label>
                        <Input
                          type="time"
                          value={item.time}
                          onChange={(e) => updateScheduleItem(index, 'time', e.target.value)}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label className="text-xs text-gray-600 mb-1">Event Title</Label>
                        <Input
                          placeholder="Event Title"
                          value={item.title}
                          onChange={(e) => updateScheduleItem(index, 'title', e.target.value)}
                        />
                      </div>
                    </div>
                    <Input
                      placeholder="Description (optional)"
                      value={item.description || ''}
                      onChange={(e) => updateScheduleItem(index, 'description', e.target.value)}
                    />
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex gap-4 justify-end sticky bottom-0 bg-white p-4 border-t shadow-lg rounded-t-lg">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/dashboard')}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading || uploading}>
              <Save className="h-4 w-4 mr-2" />
              {loading ? 'Saving...' : isEditing ? 'Update Hackathon' : 'Create Hackathon'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
