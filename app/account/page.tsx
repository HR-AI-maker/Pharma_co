'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Package, MapPin, User, Settings, ChevronRight } from 'lucide-react'
import { getInitials } from '@/lib/utils'

export default function AccountPage() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/4 mb-8" />
          <div className="h-32 bg-muted rounded mb-6" />
          <div className="grid md:grid-cols-2 gap-4">
            <div className="h-24 bg-muted rounded" />
            <div className="h-24 bg-muted rounded" />
          </div>
        </div>
      </div>
    )
  }

  if (!session) {
    redirect('/login?callbackUrl=/account')
  }

  const menuItems = [
    {
      title: 'My Orders',
      description: 'View and track your orders',
      href: '/account/orders',
      icon: Package,
    },
    {
      title: 'Addresses',
      description: 'Manage your delivery addresses',
      href: '/account/addresses',
      icon: MapPin,
    },
    {
      title: 'Account Settings',
      description: 'Update your profile and password',
      href: '/account/settings',
      icon: Settings,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-foreground mb-8">My Account</h1>

      {/* User Info */}
      <div className="bg-white rounded-xl border border-border p-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-primary">
              {getInitials(session.user.name || session.user.email)}
            </span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {session.user.name || 'Welcome!'}
            </h2>
            <p className="text-muted-foreground">{session.user.email}</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-4 p-6 bg-white rounded-xl border border-border hover:shadow-card transition-shadow group"
          >
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center group-hover:bg-primary-100 transition-colors">
              <item.icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  )
}
