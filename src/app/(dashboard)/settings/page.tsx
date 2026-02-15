'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import {
  Bell,
  Shield,
  Palette,
  Mail,
  Globe,
  Eye,
  EyeOff
} from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-xl text-gray-600">Manage your account preferences</p>
      </div>

      {/* Notification Settings */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-900">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
          <CardDescription className="text-gray-600">
            Configure how you receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base font-medium text-gray-900">Email Notifications</Label>
              <p className="text-sm text-gray-600">Receive email updates about your orders</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base font-medium text-gray-900">Order Updates</Label>
              <p className="text-sm text-gray-600">Get notified when your order status changes</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base font-medium text-gray-900">Promotional Emails</Label>
              <p className="text-sm text-gray-600">Receive special offers and news</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-900">
            <Shield className="h-5 w-5" />
            Security
          </CardTitle>
          <CardDescription className="text-gray-600">
            Manage your account security
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label className="text-base font-medium text-gray-900">Change Password</Label>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="text-sm font-medium text-gray-700">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  placeholder="Enter current password"
                  className="bg-white border-gray-300"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-sm font-medium text-gray-700">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Enter new password"
                  className="bg-white border-gray-300"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                  className="bg-white border-gray-300"
                />
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
              Update Password
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Appearance Settings */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-900">
            <Palette className="h-5 w-5" />
            Appearance
          </CardTitle>
          <CardDescription className="text-gray-600">
            Customize your experience
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base font-medium text-gray-900">Compact Mode</Label>
              <p className="text-sm text-gray-600">Show more content with less spacing</p>
            </div>
            <Switch />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base font-medium text-gray-900">Sidebar Always Visible</Label>
              <p className="text-sm text-gray-600">Keep the sidebar expanded on desktop</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-900">
            <Eye className="h-5 w-5" />
            Privacy
          </CardTitle>
          <CardDescription className="text-gray-600">
            Control your privacy settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base font-medium text-gray-900">Profile Visibility</Label>
              <p className="text-sm text-gray-600">Make your profile visible to other users</p>
            </div>
            <Switch />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base font-medium text-gray-900">Show Online Status</Label>
              <p className="text-sm text-gray-600">Display when you're active</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
          Cancel
        </Button>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
          Save Changes
        </Button>
      </div>
    </div>
  )
}
