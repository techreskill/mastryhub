import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card'
import { Calendar, Building2, Users, DollarSign, Sparkles, ArrowLeft } from 'lucide-react'
import { motion } from 'motion/react'

export function HackathonInterest() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    eventDate: '',
    expectedParticipants: '',
    estimatedBudget: '',
    location: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    console.log('Hackathon Interest Submission:', formData)
    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds and navigate back
    setTimeout(() => {
      navigate('/')
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-4xl mb-4">Thank You!</h2>
          <p className="text-xl text-gray-400">
            We've received your interest. Our team will contact you soon.
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20 pointer-events-none" />
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-gray-400 hover:text-white hover:bg-white/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl mb-4">
            Host Your{' '}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Hackathon
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Share your vision with us, and we'll help you create an unforgettable Web3 hackathon experience
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Hackathon Details</CardTitle>
              <CardDescription className="text-gray-400">
                Fill in the information below and our team will get in touch with you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact Information */}
                <div className="space-y-6">
                  <h3 className="text-xl text-white flex items-center gap-2">
                    <Users className="h-5 w-5 text-purple-500" />
                    Contact Information
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-300">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className="bg-gray-950/50 border-gray-800 text-white placeholder:text-gray-600"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-300">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        required
                        className="bg-gray-950/50 border-gray-800 text-white placeholder:text-gray-600"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-300">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 123-4567"
                        className="bg-gray-950/50 border-gray-800 text-white placeholder:text-gray-600"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-gray-300">Company/Organization *</Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Acme Inc."
                        required
                        className="bg-gray-950/50 border-gray-800 text-white placeholder:text-gray-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Event Details */}
                <div className="space-y-6 pt-6 border-t border-gray-800">
                  <h3 className="text-xl text-white flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-blue-500" />
                    Event Details
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="eventDate" className="text-gray-300">Preferred Date *</Label>
                      <Input
                        id="eventDate"
                        name="eventDate"
                        type="date"
                        value={formData.eventDate}
                        onChange={handleChange}
                        required
                        className="bg-gray-950/50 border-gray-800 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-gray-300">Location/Format *</Label>
                      <Input
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Virtual / In-person (City)"
                        required
                        className="bg-gray-950/50 border-gray-800 text-white placeholder:text-gray-600"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="expectedParticipants" className="text-gray-300">Expected Participants</Label>
                      <Input
                        id="expectedParticipants"
                        name="expectedParticipants"
                        type="number"
                        value={formData.expectedParticipants}
                        onChange={handleChange}
                        placeholder="100"
                        className="bg-gray-950/50 border-gray-800 text-white placeholder:text-gray-600"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="estimatedBudget" className="text-gray-300">Estimated Prize Pool (USD)</Label>
                      <Input
                        id="estimatedBudget"
                        name="estimatedBudget"
                        value={formData.estimatedBudget}
                        onChange={handleChange}
                        placeholder="$10,000"
                        className="bg-gray-950/50 border-gray-800 text-white placeholder:text-gray-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-6 pt-6 border-t border-gray-800">
                  <h3 className="text-xl text-white flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-pink-500" />
                    Additional Information
                  </h3>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-gray-300">
                      Tell us more about your hackathon vision
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="What themes, technologies, or goals do you have in mind for this hackathon?"
                      rows={6}
                      className="bg-gray-950/50 border-gray-800 text-white placeholder:text-gray-600 resize-none"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/')}
                    className="flex-1 border-gray-800 text-gray-300 hover:bg-white/10"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Interest
                        <Sparkles className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <Card className="bg-gray-900/30 border-gray-800 backdrop-blur-sm">
              <CardContent className="pt-6">
                <Calendar className="h-8 w-8 text-purple-500 mb-3" />
                <h4 className="text-white mb-2">Quick Setup</h4>
                <p className="text-sm text-gray-400">
                  We'll help you get your hackathon up and running in no time
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/30 border-gray-800 backdrop-blur-sm">
              <CardContent className="pt-6">
                <Users className="h-8 w-8 text-blue-500 mb-3" />
                <h4 className="text-white mb-2">Global Reach</h4>
                <p className="text-sm text-gray-400">
                  Access our community of 500+ builders and innovators
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/30 border-gray-800 backdrop-blur-sm">
              <CardContent className="pt-6">
                <DollarSign className="h-8 w-8 text-pink-500 mb-3" />
                <h4 className="text-white mb-2">Full Support</h4>
                <p className="text-sm text-gray-400">
                  From planning to execution, we're with you every step
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
