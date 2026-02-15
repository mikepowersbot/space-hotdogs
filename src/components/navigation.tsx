'use client'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export function Navigation() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [supabase, setSupabase] = useState<any>(null)

  useEffect(() => {
    const client = createClient()
    setSupabase(client)

    const getUser = async () => {
      const { data: { user } } = await client.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    getUser()

    const { data: { subscription } } = client.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    if (!supabase) return
    await supabase.auth.signOut()
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <span className="text-3xl">🌭</span>
          <span className="text-2xl font-bold text-gray-900">Space Hotdogs</span>
        </Link>
        {loading ? (
          <div className="w-24 h-10 bg-gray-100 animate-pulse rounded-lg" />
        ) : user ? (
          <div className="flex gap-3 items-center">
            <Link href="/dashboard">
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                Dashboard
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                Profile
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
        ) : (
          <div className="flex gap-3">
            <Link href="/login">
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Sign Up
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}