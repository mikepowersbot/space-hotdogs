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
    <nav className="relative z-10 p-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-3xl">🌭</span>
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
            Space Hotdogs
          </span>
        </Link>
        {loading ? (
          <div className="w-24 h-10 bg-purple-800/50 animate-pulse rounded-lg" />
        ) : user ? (
          <div className="flex gap-4 items-center">
            <Link href="/dashboard">
              <Button variant="outline" className="border-purple-400 text-purple-200 hover:bg-purple-900/50">
                Dashboard
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="outline" className="border-purple-400 text-purple-200 hover:bg-purple-900/50">
                Profile
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
        ) : (
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="outline" className="border-purple-400 text-purple-200 hover:bg-purple-900/50">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white">
                Sign Up
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
