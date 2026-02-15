'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { User, LogOut, Settings } from 'lucide-react'

interface ActivityItem {
  id: string
  action: string
  date: Date
  icon: string
}

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
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="text-gray-600 text-xl">Loading...</div>
      </div>
    )
  }

  const userName = profile?.full_name || user?.email?.split('@')[0] || 'User'
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  const memberSince = user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : 'Unknown'

  // Mock recent activity data
  const recentActivities: ActivityItem[] = [
    {
      id: '1',
      action: 'Account created',
      date: user?.created_at ? new Date(user.created_at) : new Date(),
      icon: '🎉'
    },
    {
      id: '2',
      action: 'Profile updated',
      date: profile?.updated_at ? new Date(profile.updated_at) : new Date(Date.now() - 86400000),
      icon: '📝'
    },
    {
      id: '3',
      action: 'Order placed - Space Classic',
      date: new Date(Date.now() - 172800000),
      icon: '🌭'
    },
    {
      id: '4',
      action: 'Account login',
      date: new Date(Date.now() - 259200000),
      icon: '🔐'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Welcome back, {userName}!
            </h1>
            <p className="text-blue-100 text-lg">{today}</p>
          </div>
          <div className="flex gap-3">
            <Link href="/profile">
              <Button variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50 font-semibold shadow-sm">
                Edit Profile
              </Button>
            </Link>
            <Button className="bg-blue-800 hover:bg-blue-900 text-white font-semibold shadow-sm">
              🛸 Order Now
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-gray-900">0</div>
            <p className="text-sm text-gray-500 mt-1">No orders yet</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Account Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xl font-bold text-gray-900">Active</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">Premium member</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-gray-900">$0.00</div>
            <p className="text-sm text-gray-500 mt-1">Start ordering to see stats</p>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Member Since</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{memberSince}</div>
            <p className="text-sm text-gray-500 mt-2">Thanks for joining!</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900">Recent Activity</CardTitle>
            <CardDescription className="text-gray-600">
              Your latest account actions and events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-2xl shadow-sm">
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">
                      {activity.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900">Quick Actions</CardTitle>
            <CardDescription className="text-gray-600">
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/profile" className="block">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-xl shadow-sm hover:shadow-md transition-all font-semibold text-base">
                <User className="mr-2 h-5 w-5" />
                Update Profile
              </Button>
            </Link>
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 py-6 rounded-xl font-semibold text-base"
            >
              <LogOut className="mr-2 h-5 w-5" />
              Sign Out
            </Button>
            <Link href="/settings" className="block">
              <Button
                variant="ghost"
                className="w-full text-gray-700 hover:bg-gray-50 py-6 rounded-xl font-semibold text-base"
              >
                <Settings className="mr-2 h-5 w-5" />
                Open Settings
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900">🚀 Ready to Explore?</CardTitle>
          <CardDescription className="text-gray-600 mt-2">
            Your account is all set! Start exploring our cosmic menu and order the best space-grade hotdogs.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button
            size="lg"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-7 rounded-xl shadow-lg hover:shadow-xl transition-all font-semibold text-lg"
          >
            🛸 Browse Menu & Order
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
