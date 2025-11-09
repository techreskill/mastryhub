import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Checkbox } from './ui/checkbox'
import { toast } from 'sonner'
import { Loader2, CheckCircle2 } from 'lucide-react'

interface RegistrationFormProps {
  hackathonId: string
  onSuccess: () => void
  isDark?: boolean
}

export function RegistrationForm({ hackathonId, onSuccess, isDark = false }: RegistrationFormProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    github: '',
    linkedin: '',
    teamSize: '1',
    teamName: '',
    experience: 'beginner',
    interests: '',
    motivation: '',
    agreeTerms: false,
  })

  const inputClasses = isDark ? 'bg-gray-900 border-gray-700 text-white placeholder:text-gray-500' : 'bg-white border-gray-300 text-gray-900'
  const labelClasses = isDark ? 'text-gray-300' : 'text-gray-700'
  const textClasses = isDark ? 'text-white' : 'text-gray-900'
  const bgClasses = isDark ? 'bg-gray-800' : 'bg-gray-50'
  const selectClasses = isDark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.agreeTerms) {
      toast.error('Please agree to terms and conditions')
      return
    }

    setLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Store registration in localStorage for demo
      const registrations = JSON.parse(localStorage.getItem('hackathonRegistrations') || '[]')
      registrations.push({
        hackathonId,
        ...formData,
        registeredAt: new Date().toISOString(),
      })
      localStorage.setItem('hackathonRegistrations', JSON.stringify(registrations))

      toast.success('Successfully registered! Check your email for confirmation.')
      onSuccess()
    } catch (error) {
      toast.error('Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information */}
      <div className="space-y-4">
        <h4 className={`text-lg ${textClasses}`}>Personal Information</h4>
        
        <div>
          <Label htmlFor="fullName" className={labelClasses}>Full Name *</Label>
          <Input
            id="fullName"
            required
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className={`${inputClasses} mt-1`}
            placeholder="John Doe"
          />
        </div>

        <div>
          <Label htmlFor="email" className={labelClasses}>Email *</Label>
          <Input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`${inputClasses} mt-1`}
            placeholder="john@example.com"
          />
        </div>

        <div>
          <Label htmlFor="phone" className={labelClasses}>Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={`${inputClasses} mt-1`}
            placeholder="+1 (555) 000-0000"
          />
        </div>
      </div>

      {/* Social Links */}
      <div className="space-y-4">
        <h4 className={`text-lg ${textClasses}`}>Social Profiles</h4>
        
        <div>
          <Label htmlFor="github" className={labelClasses}>GitHub Profile *</Label>
          <Input
            id="github"
            required
            value={formData.github}
            onChange={(e) => setFormData({ ...formData, github: e.target.value })}
            className={`${inputClasses} mt-1`}
            placeholder="https://github.com/yourusername"
          />
        </div>

        <div>
          <Label htmlFor="linkedin" className={labelClasses}>LinkedIn Profile</Label>
          <Input
            id="linkedin"
            value={formData.linkedin}
            onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
            className={`${inputClasses} mt-1`}
            placeholder="https://linkedin.com/in/yourusername"
          />
        </div>
      </div>

      {/* Team Information */}
      <div className="space-y-4">
        <h4 className={`text-lg ${textClasses}`}>Team Details</h4>
        
        <div>
          <Label htmlFor="teamSize" className={labelClasses}>Team Size *</Label>
          <Select value={formData.teamSize} onValueChange={(value) => setFormData({ ...formData, teamSize: value })}>
            <SelectTrigger className={`${selectClasses} mt-1`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className={selectClasses}>
              <SelectItem value="1" className={isDark ? 'text-white focus:bg-gray-800 focus:text-white' : ''}>Solo (1 person)</SelectItem>
              <SelectItem value="2" className={isDark ? 'text-white focus:bg-gray-800 focus:text-white' : ''}>2 members</SelectItem>
              <SelectItem value="3" className={isDark ? 'text-white focus:bg-gray-800 focus:text-white' : ''}>3 members</SelectItem>
              <SelectItem value="4" className={isDark ? 'text-white focus:bg-gray-800 focus:text-white' : ''}>4 members</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {formData.teamSize !== '1' && (
          <div>
            <Label htmlFor="teamName" className={labelClasses}>Team Name</Label>
            <Input
              id="teamName"
              value={formData.teamName}
              onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
              className={`${inputClasses} mt-1`}
              placeholder="Enter your team name"
            />
          </div>
        )}

        <div>
          <Label htmlFor="experience" className={labelClasses}>Experience Level *</Label>
          <Select value={formData.experience} onValueChange={(value) => setFormData({ ...formData, experience: value })}>
            <SelectTrigger className={`${selectClasses} mt-1`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className={selectClasses}>
              <SelectItem value="beginner" className={isDark ? 'text-white focus:bg-gray-800 focus:text-white' : ''}>Beginner</SelectItem>
              <SelectItem value="intermediate" className={isDark ? 'text-white focus:bg-gray-800 focus:text-white' : ''}>Intermediate</SelectItem>
              <SelectItem value="advanced" className={isDark ? 'text-white focus:bg-gray-800 focus:text-white' : ''}>Advanced</SelectItem>
              <SelectItem value="expert" className={isDark ? 'text-white focus:bg-gray-800 focus:text-white' : ''}>Expert</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Additional Information */}
      <div className="space-y-4">
        <h4 className={`text-lg ${textClasses}`}>Tell Us More</h4>
        
        <div>
          <Label htmlFor="interests" className={labelClasses}>Areas of Interest</Label>
          <Input
            id="interests"
            value={formData.interests}
            onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
            className={`${inputClasses} mt-1`}
            placeholder="e.g., DeFi, NFTs, Gaming"
          />
        </div>

        <div>
          <Label htmlFor="motivation" className={labelClasses}>Why do you want to participate? *</Label>
          <Textarea
            id="motivation"
            required
            value={formData.motivation}
            onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
            className={`${inputClasses} mt-1 min-h-[100px]`}
            placeholder="Share your motivation and what you hope to achieve..."
          />
        </div>
      </div>

      {/* Terms */}
      <div className={`flex items-start gap-3 p-4 ${bgClasses} rounded-lg`}>
        <Checkbox
          id="terms"
          checked={formData.agreeTerms}
          onCheckedChange={(checked) => setFormData({ ...formData, agreeTerms: checked as boolean })}
          className="mt-1"
        />
        <Label htmlFor="terms" className={`text-sm ${labelClasses} cursor-pointer`}>
          I agree to the terms and conditions, code of conduct, and privacy policy. I understand that my
          information will be used for hackathon purposes only.
        </Label>
      </div>

      {/* Submit Button */}
      <div className="flex gap-4 pt-4">
        <Button
          type="submit"
          disabled={loading}
          className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Registering...
            </>
          ) : (
            <>
              <CheckCircle2 className="mr-2 h-5 w-5" />
              Complete Registration
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
