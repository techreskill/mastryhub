import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { motion } from 'motion/react'
import {
  Trophy,
  Award,
  Star,
  Zap,
  Target,
  Users,
  Code,
  Rocket,
  Crown,
  Flame,
  Medal,
  CheckCircle,
  TrendingUp,
  Heart,
  Sparkles,
} from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Progress } from './ui/progress'

interface Achievement {
  id: string
  name: string
  description: string
  icon: any
  color: string
  bgColor: string
  unlocked: boolean
  unlockedAt?: string
  progress?: number
  maxProgress?: number
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

const achievements: Achievement[] = [
  {
    id: 'first-hackathon',
    name: 'First Steps',
    description: 'Participated in your first hackathon',
    icon: Rocket,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    unlocked: true,
    unlockedAt: '2024-01-15',
    rarity: 'common',
  },
  {
    id: 'winner',
    name: 'Champion',
    description: 'Won 1st place in a hackathon',
    icon: Trophy,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    unlocked: true,
    unlockedAt: '2024-02-20',
    rarity: 'legendary',
  },
  {
    id: 'team-player',
    name: 'Team Player',
    description: 'Completed 5 hackathons as part of a team',
    icon: Users,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    unlocked: true,
    unlockedAt: '2024-03-10',
    progress: 5,
    maxProgress: 5,
    rarity: 'rare',
  },
  {
    id: 'code-master',
    name: 'Code Master',
    description: 'Submit 10 projects with clean code',
    icon: Code,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    unlocked: false,
    progress: 7,
    maxProgress: 10,
    rarity: 'epic',
  },
  {
    id: 'speed-demon',
    name: 'Speed Demon',
    description: 'Complete a 24-hour hackathon',
    icon: Zap,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    unlocked: true,
    unlockedAt: '2024-01-28',
    rarity: 'rare',
  },
  {
    id: 'innovator',
    name: 'Innovator',
    description: 'Create a project with cutting-edge technology',
    icon: Sparkles,
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10',
    unlocked: true,
    unlockedAt: '2024-03-05',
    rarity: 'epic',
  },
  {
    id: 'perfect-score',
    name: 'Perfectionist',
    description: 'Achieve a perfect score from all judges',
    icon: Star,
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-500/10',
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    rarity: 'legendary',
  },
  {
    id: 'community-favorite',
    name: 'Community Favorite',
    description: 'Win the most votes in community voting',
    icon: Heart,
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    rarity: 'epic',
  },
  {
    id: 'consistent',
    name: 'Consistent Performer',
    description: 'Participate in 10 consecutive hackathons',
    icon: Target,
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-500/10',
    unlocked: false,
    progress: 6,
    maxProgress: 10,
    rarity: 'rare',
  },
  {
    id: 'mentor',
    name: 'Mentor',
    description: 'Help 20 teams with guidance',
    icon: Award,
    color: 'text-teal-500',
    bgColor: 'bg-teal-500/10',
    unlocked: false,
    progress: 12,
    maxProgress: 20,
    rarity: 'epic',
  },
  {
    id: 'rising-star',
    name: 'Rising Star',
    description: 'Improve ranking in 5 consecutive hackathons',
    icon: TrendingUp,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
    unlocked: false,
    progress: 3,
    maxProgress: 5,
    rarity: 'rare',
  },
  {
    id: 'legend',
    name: 'Hall of Fame',
    description: 'Win 5 hackathons',
    icon: Crown,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    unlocked: false,
    progress: 1,
    maxProgress: 5,
    rarity: 'legendary',
  },
]

const rarityConfig = {
  common: { label: 'Common', color: 'bg-gray-500', borderColor: 'border-gray-500' },
  rare: { label: 'Rare', color: 'bg-blue-500', borderColor: 'border-blue-500' },
  epic: { label: 'Epic', color: 'bg-purple-500', borderColor: 'border-purple-500' },
  legendary: { label: 'Legendary', color: 'bg-yellow-500', borderColor: 'border-yellow-500' },
}

export function AchievementBadges() {
  const unlockedCount = achievements.filter((a) => a.unlocked).length
  const totalCount = achievements.length

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-1">Achievements</h2>
          <p className="text-sm text-gray-500">
            Unlocked {unlockedCount} of {totalCount} achievements
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl mb-1">
            {unlockedCount}/{totalCount}
          </div>
          <Progress value={(unlockedCount / totalCount) * 100} className="w-32" />
        </div>
      </div>

      {/* Achievement Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {achievements.map((achievement, index) => (
          <Dialog key={achievement.id}>
            <DialogTrigger asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer"
              >
                <Card
                  className={`relative p-6 text-center transition-all ${
                    achievement.unlocked
                      ? `${achievement.bgColor} border-2 ${rarityConfig[achievement.rarity].borderColor}`
                      : 'bg-gray-100 dark:bg-gray-800 opacity-60 grayscale'
                  }`}
                >
                  {achievement.unlocked && (
                    <div className="absolute top-2 right-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                  )}
                  
                  <div className="mb-3">
                    <achievement.icon
                      className={`h-12 w-12 mx-auto ${
                        achievement.unlocked ? achievement.color : 'text-gray-400'
                      }`}
                    />
                  </div>
                  
                  <h3 className="text-sm font-semibold mb-1">{achievement.name}</h3>
                  
                  {!achievement.unlocked && achievement.progress !== undefined && (
                    <div className="mt-2 space-y-1">
                      <Progress
                        value={(achievement.progress / (achievement.maxProgress || 1)) * 100}
                        className="h-1"
                      />
                      <p className="text-xs text-gray-500">
                        {achievement.progress}/{achievement.maxProgress}
                      </p>
                    </div>
                  )}
                  
                  {achievement.unlocked && (
                    <Badge
                      className={`mt-2 ${rarityConfig[achievement.rarity].color} text-white text-xs`}
                    >
                      {rarityConfig[achievement.rarity].label}
                    </Badge>
                  )}
                </Card>
              </motion.div>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Achievement Details</DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', duration: 0.5 }}
                    className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-4 ${
                      achievement.unlocked ? achievement.bgColor : 'bg-gray-100 dark:bg-gray-800'
                    }`}
                  >
                    <achievement.icon
                      className={`h-12 w-12 ${
                        achievement.unlocked ? achievement.color : 'text-gray-400'
                      }`}
                    />
                  </motion.div>
                  
                  <h3 className="text-2xl mb-2">{achievement.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{achievement.description}</p>
                  
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <Badge className={`${rarityConfig[achievement.rarity].color} text-white`}>
                      {rarityConfig[achievement.rarity].label}
                    </Badge>
                    {achievement.unlocked && (
                      <Badge className="bg-green-500 text-white">Unlocked</Badge>
                    )}
                  </div>
                </div>

                {achievement.unlocked ? (
                  <Card className="p-4 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                      <CheckCircle className="h-5 w-5" />
                      <div>
                        <p className="text-sm">
                          <strong>Unlocked on</strong>
                        </p>
                        <p className="text-sm">
                          {new Date(achievement.unlockedAt!).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                  </Card>
                ) : (
                  <Card className="p-4 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                    <div className="text-blue-700 dark:text-blue-300">
                      <p className="text-sm mb-2">
                        <strong>Progress:</strong>
                      </p>
                      {achievement.progress !== undefined ? (
                        <div className="space-y-2">
                          <Progress
                            value={(achievement.progress / (achievement.maxProgress || 1)) * 100}
                            className="h-2"
                          />
                          <p className="text-sm">
                            {achievement.progress} / {achievement.maxProgress}
                          </p>
                        </div>
                      ) : (
                        <p className="text-sm">Not started yet</p>
                      )}
                    </div>
                  </Card>
                )}

                <Card className="p-4 bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800">
                  <p className="text-xs text-purple-700 dark:text-purple-300">
                    <strong>Tip:</strong> Complete more hackathons and engage with the community to
                    unlock achievements. Some are rare and require exceptional performance!
                  </p>
                </Card>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>

      {/* Rarity Legend */}
      <Card className="p-4">
        <p className="text-sm mb-3">
          <strong>Rarity Levels:</strong>
        </p>
        <div className="flex flex-wrap gap-2">
          {Object.entries(rarityConfig).map(([key, config]) => (
            <Badge key={key} className={`${config.color} text-white`}>
              {config.label}
            </Badge>
          ))}
        </div>
      </Card>
    </div>
  )
}
