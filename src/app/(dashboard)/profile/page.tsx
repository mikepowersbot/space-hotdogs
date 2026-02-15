'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { User } from 'lucide-react'

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [fullName, setFullName] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const supabase = createClient()

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
  }, [])

  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setUpdating(true)
    setMessage(null)
    setError(null)

    if (!user) return

    const supabase = createClient()
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
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="text-gray-600 text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Edit Profile</h1>
        <p className="text-xl text-gray-600">Update your personal information</p>
      </div>

      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900">Profile Information</CardTitle>
          <CardDescription className="text-gray-600">
            Make changes to your account profile
          </CardDescription>
        </CardHeader>
        <form onSubmit={updateProfile}>
          <CardContent className="space-y-6">
            {error && (
              <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm transition-all">
                {error}
              </div>
            )}
            {message && (
              <div className="p-4 rounded-lg bg-green-50 border border-green-200 text-green-600 text-sm transition-all">
                {message}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
              <Input
                id="email"
                type="email"
                value={user?.email || ''}
                disabled
                className="bg-gray-50 border-gray-300 text-gray-500 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500">Email cannot be changed</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="avatarUrl" className="text-sm font-medium text-gray-700">Avatar URL (optional)</Label>
              <Input
                id="avatarUrl"
                type="url"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                placeholder="https://example.com/avatar.jpg"
              />
            </div>
          </CardContent>
          <CardContent className="pt-0">
            <Button
              type="submit"
              disabled={updating}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg transition-all font-semibold"
            >
              {updating ? 'Saving...' : 'Save Changes'}
            </Button>
          </CardContent>
        </form>
      </Card>
    </div>
  )
}
