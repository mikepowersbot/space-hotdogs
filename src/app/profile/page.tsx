'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [fullName, setFullName] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
        const { data: profile } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single()
        if (profile) {
          setFullName(profile.full_name || '')
          setAvatarUrl(profile.avatar_url || '')
        }
      }
      setLoading(false)
    }

    fetchProfile()
  }, [supabase])

  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setUpdating(true)
    setMessage(null)
    setError(null)

    if (!user) return

    const { error } = await supabase
      .from('users')
      .upsert({
        id: user.id,
        full_name: fullName,
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString(),
      })

    if (error) {
      setError(error.message)
    } else {
      setMessage('Profile updated successfully!')
    }

    setUpdating(false)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-purple-200 text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900">
      {/* Stars Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-indigo-900/10 to-slate-900/30" />
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-3xl">🌭</span>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
              Space Hotdogs
            </span>
          </Link>
          <div className="flex gap-4 items-center">
            <Link href="/dashboard">
              <Button variant="ghost" className="text-purple-200 hover:text-white hover:bg-purple-900/30">
                Dashboard
              </Button>
            </Link>
            <Button
              onClick={handleSignOut}
              variant="ghost"
              className="text-purple-200 hover:text-white hover:bg-purple-900/30"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </nav>

      {/* Profile Content */}
      <main className="relative z-10 px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Edit Profile</h1>
            <p className="text-xl text-purple-200">Update your personal information</p>
          </div>

          <Card className="bg-purple-900/50 border-purple-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Profile Information</CardTitle>
              <CardDescription className="text-purple-200">
                Make changes to your account profile
              </CardDescription>
            </CardHeader>
            <form onSubmit={updateProfile}>
              <CardContent className="space-y-6">
                {error && (
                  <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200 text-sm">
                    {error}
                  </div>
                )}
                {message && (
                  <div className="p-3 rounded-lg bg-green-500/20 border border-green-500/50 text-green-200 text-sm">
                    {message}
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-purple-200">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="bg-purple-800/30 border-purple-600/50 text-white/50 cursor-not-allowed"
                  />
                  <p className="text-xs text-purple-300/70">Email cannot be changed</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-purple-200">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="bg-purple-800/30 border-purple-600/50 text-white placeholder:text-purple-300/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="avatarUrl" className="text-purple-200">Avatar URL (optional)</Label>
                  <Input
                    id="avatarUrl"
                    type="url"
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                    className="bg-purple-800/30 border-purple-600/50 text-white placeholder:text-purple-300/50"
                    placeholder="https://example.com/avatar.jpg"
                  />
                </div>
              </CardContent>
              <CardContent className="pt-0">
                <Button
                  type="submit"
                  disabled={updating}
                  className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white"
                >
                  {updating ? 'Saving...' : 'Save Changes'}
                </Button>
              </CardContent>
            </form>
          </Card>
        </div>
      </main>
    </div>
  )
}
