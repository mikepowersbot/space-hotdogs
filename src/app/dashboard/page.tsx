'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const supabase = createClient()

    const fetchUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
        const { data: profile } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single()
        setProfile(profile)
      }
      setLoading(false)
    }

    fetchUserData()
  }, [])

  const handleSignOut = async () => {
    const supabase = createClient()
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
            <Link href="/profile">
              <Button variant="outline" className="border-purple-400 text-purple-200 hover:bg-purple-900/50">
                Edit Profile
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

      {/* Dashboard Content */}
      <main className="relative z-10 px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-xl text-purple-200">Welcome to your personal space station</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-purple-900/50 border-purple-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Account Info</CardTitle>
                <CardDescription className="text-purple-200">
                  Your basic account details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-purple-300 mb-1">Email</p>
                  <p className="text-white font-medium">{user?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-purple-300 mb-1">Full Name</p>
                  <p className="text-white font-medium">{profile?.full_name || 'Not set'}</p>
                </div>
                <div>
                  <p className="text-sm text-purple-300 mb-1">Member Since</p>
                  <p className="text-white font-medium">
                    {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown'}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-purple-900/50 border-purple-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
                <CardDescription className="text-purple-200">
                  Manage your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link href="/profile" className="block">
                  <Button className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white">
                    Edit Profile
                  </Button>
                </Link>
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className="w-full border-purple-400 text-purple-200 hover:bg-purple-900/50"
                >
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-r from-purple-900/60 to-pink-900/60 border-purple-500/40 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-white text-2xl">🍔 Ready to Order?</CardTitle>
              <CardDescription className="text-purple-200">
                Your account is all set! Start exploring our cosmic menu.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white text-lg py-6 rounded-full shadow-lg shadow-purple-500/50"
              >
                🛸 Order Now
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}
