'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Edit2, Trash2, Shield } from 'lucide-react'

export default function UserManagement() {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Smith', email: 'john@indegene.com', role: 'Super Admin', status: 'Active' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@indegene.com', role: 'Business User', status: 'Active' },
    { id: 3, name: 'Mike Chen', email: 'mike@indegene.com', role: 'Business User', status: 'Inactive' },
  ])

  const [showAddUser, setShowAddUser] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold text-foreground">User & Role Management (RBAC)</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Manage user access, define permissions, and configure authentication protocols
          </p>
        </div>
        <Button onClick={() => setShowAddUser(!showAddUser)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add User
        </Button>
      </div>

      {showAddUser && (
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg">Add New User</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  className="w-full mt-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Email</label>
                <input
                  type="email"
                  placeholder="user@indegene.com"
                  className="w-full mt-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">Role</label>
                <select className="w-full mt-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Business User</option>
                  <option>Super Admin</option>
                  <option>Manager</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Status</label>
                <select className="w-full mt-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Pending</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <Button className="bg-primary">Create User</Button>
              <Button variant="outline" onClick={() => setShowAddUser(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Permissions Matrix */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Permission Matrix</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-3 font-semibold text-foreground">Feature</th>
                  <th className="text-center py-3 px-3 font-semibold text-foreground">Business User</th>
                  <th className="text-center py-3 px-3 font-semibold text-foreground">Super Admin</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'FAQ Management', business: true, admin: true },
                  { feature: 'Workflow Builder', business: true, admin: true },
                  { feature: 'AI Navigator Config', business: true, admin: true },
                  { feature: 'User Management', business: false, admin: true },
                  { feature: 'Platform Integrations', business: false, admin: true },
                  { feature: 'Audit Logs', business: false, admin: true },
                  { feature: 'Prompt Library', business: false, admin: true },
                ].map((row) => (
                  <tr key={row.feature} className="border-b border-border hover:bg-secondary">
                    <td className="py-3 px-3 text-foreground">{row.feature}</td>
                    <td className="text-center py-3 px-3">
                      {row.business ? (
                        <span className="text-green-600 font-bold">✓</span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="text-center py-3 px-3">
                      <span className="text-green-600 font-bold">✓</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <div>
        <h4 className="font-semibold text-foreground mb-4">Active Users</h4>
        <div className="space-y-3">
          {users.map((user) => (
            <Card key={user.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {user.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <div className="flex gap-2 mt-2">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center gap-1">
                          <Shield className="w-3 h-3" />
                          {user.role}
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            user.status === 'Active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {user.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive bg-transparent">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
