'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  User,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react'

export function DashboardSidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const supabase = createClient()

  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard
    },
    {
      name: 'Profile',
      href: '/profile',
      icon: User
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: Settings
    }
  ]

  const isActive = (href: string) => {
    return pathname === href
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  const NavLinks = () => (
    <>
      {navigationItems.map((item) => {
        const Icon = item.icon
        const active = isActive(item.href)
        return (
          <Link
            key={item.name}
            href={item.href}
            onClick={() => setIsMobileMenuOpen(false)}
            className={cn(
              'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200',
              active
                ? 'bg-blue-50 text-blue-700 shadow-sm'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            )}
          >
            <Icon className={cn('h-5 w-5', active ? 'text-blue-600' : 'text-gray-400')} />
            {item.name}
          </Link>
        )
      })}
    </>
  )

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          size="icon"
          variant="outline"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white shadow-md"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-40 h-screen w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out',
          'flex flex-col',
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-100">
          <Link
            href="/dashboard"
            className="flex items-center gap-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="text-3xl">🌭</span>
            <span className="text-xl font-bold text-gray-900">Space Hotdogs</span>
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-4 space-y-2 overflow-y-auto">
          <nav className="flex flex-col space-y-1">
            <NavLinks />
          </nav>
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-gray-100">
          <Button
            variant="ghost"
            onClick={handleSignOut}
            className="w-full justify-start gap-3 text-gray-700 hover:text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-5 w-5 text-gray-400" />
            Logout
          </Button>
        </div>
      </aside>
    </>
  )
}
