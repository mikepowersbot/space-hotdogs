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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600 text-xl">Loading...</div>
      </div>
    )
  }

  const userName = profile?.full_name || user?.email?.split('@')[0] || 'User'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-3xl">🌭</span>
            <span className="text-2xl font-bold text-gray-900">Space Hotdogs</span>
          </Link>
          <div className="flex gap-4 items-center">
            <Link href="/profile">
              <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                Edit Profile
              </Button>
            </Link>
            <Button
              onClick={handleSignOut}
              variant="ghost"
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-xl text-gray-600">Welcome back, {userName}!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900">Total Orders</CardTitle>
              <CardDescription className="text-gray-600">
                Your lifetime orders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-gray-900">0</div>
              <p className="text-sm text-gray-500 mt-1">No orders yet</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900">Account Status</CardTitle>
              <CardDescription className="text-gray-600">
                Your membership status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-lg font-semibold text-gray-900">Active</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">Member since {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown'}</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900">Total Spent</CardTitle>
              <CardDescription className="text-gray-600">
                Lifetime purchases
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-gray-900">$0.00</div>
              <p className="text-sm text-gray-500 mt-1">Start ordering to see stats</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900">Recent Activity</CardTitle>
              <CardDescription className="text-gray-600">
                Your latest account actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600">📝</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Account created</p>
                    <p className="text-sm text-gray-600">
                      {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown date'}
                    </p>
                  </div>
                </div>
              </div>
              {!profile?.full_name && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-900 text-sm">
                    Complete your profile to enhance your experience!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900">Quick Actions</CardTitle>
              <CardDescription className="text-gray-600">
                Common tasks and shortcuts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/profile" className="block">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg transition-all">
                  Edit Profile
                </Button>
              </Link>
              <Button
                onClick={handleSignOut}
                variant="outline"
                className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 py-2.5 rounded-lg"
              >
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-gray-200 shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">🍔 Ready to Order?</CardTitle>
            <CardDescription className="text-gray-600">
              Your account is all set! Start exploring our cosmic menu.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button
              size="lg"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-lg shadow-md hover:shadow-lg"
            >
              🛸 Order Now
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}