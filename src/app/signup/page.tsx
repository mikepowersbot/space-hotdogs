'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const supabase = createClient()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })

    if (error) {
      setError(error.message)
    } else {
      setMessage('Check your email to confirm your account!')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900 flex items-center justify-center p-6">
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

      <Card className="w-full max-w-md bg-purple-900/50 border-purple-500/30 backdrop-blur-sm relative z-10">
        <CardHeader className="text-center">
          <div className="text-6xl mb-2">🌭</div>
          <CardTitle className="text-3xl text-white">Join the Galaxy</CardTitle>
          <CardDescription className="text-purple-200">
            Create your Space Hotdogs account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSignup}>
          <CardContent className="space-y-4">
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
              <Label htmlFor="fullName" className="text-purple-200">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="bg-purple-800/30 border-purple-600/50 text-white placeholder:text-purple-300/50"
                placeholder="Commander Shepard"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-purple-200">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-purple-800/30 border-purple-600/50 text-white placeholder:text-purple-300/50"
                placeholder="astronaut@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-purple-200">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-purple-800/30 border-purple-600/50 text-white placeholder:text-purple-300/50"
                placeholder="••••••••"
                minLength={6}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
            <p className="text-center text-purple-300 text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-purple-200 hover:text-white underline">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
