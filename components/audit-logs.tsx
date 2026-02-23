'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, Filter } from 'lucide-react'

export default function AuditLogs() {
  const [logs] = useState([
    {
      id: 1,
      timestamp: '2024-01-15 14:32:00',
      user: 'John Smith',
      action: 'Updated FAQ Entry',
      resource: 'FAQ #42',
      status: 'Success',
      ip: '192.168.1.100',
    },
    {
      id: 2,
      timestamp: '2024-01-15 13:28:15',
      user: 'Sarah Johnson',
      action: 'Modified Workflow',
      resource: 'Workflow #7',
      status: 'Success',
      ip: '192.168.1.101',
    },
    {
      id: 3,
      timestamp: '2024-01-15 12:15:30',
      user: 'Mike Chen',
      action: 'User Role Changed',
      resource: 'User #5',
      status: 'Success',
      ip: '192.168.1.102',
    },
    {
      id: 4,
      timestamp: '2024-01-15 11:00:45',
      user: 'John Smith',
      action: 'Integration Connected',
      resource: 'Salesforce',
      status: 'Success',
      ip: '192.168.1.100',
    },
    {
      id: 5,
      timestamp: '2024-01-15 10:12:20',
      user: 'System',
      action: 'Failed Login Attempt',
      resource: 'User #12',
      status: 'Failed',
      ip: '203.0.113.45',
    },
  ])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold text-foreground">Global Audit Logs</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Complete activity history with full visibility into all system changes and user actions
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Date Range</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">User</label>
              <select className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                <option>All Users</option>
                <option>John Smith</option>
                <option>Sarah Johnson</option>
                <option>Mike Chen</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Action Type</label>
              <select className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                <option>All Actions</option>
                <option>Create</option>
                <option>Update</option>
                <option>Delete</option>
                <option>Login</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Status</label>
              <select className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                <option>All</option>
                <option>Success</option>
                <option>Failed</option>
              </select>
            </div>
          </div>
          <Button className="mt-4 w-full">Apply Filters</Button>
        </CardContent>
      </Card>

      {/* Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Activity Log</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-3 px-3 font-semibold text-foreground">Timestamp</th>
                  <th className="text-left py-3 px-3 font-semibold text-foreground">User</th>
                  <th className="text-left py-3 px-3 font-semibold text-foreground">Action</th>
                  <th className="text-left py-3 px-3 font-semibold text-foreground">Resource</th>
                  <th className="text-left py-3 px-3 font-semibold text-foreground">IP Address</th>
                  <th className="text-center py-3 px-3 font-semibold text-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id} className="border-b border-border hover:bg-secondary transition-colors">
                    <td className="py-3 px-3 text-foreground font-mono text-xs">{log.timestamp}</td>
                    <td className="py-3 px-3 text-foreground font-medium">{log.user}</td>
                    <td className="py-3 px-3 text-foreground">{log.action}</td>
                    <td className="py-3 px-3 text-muted-foreground">{log.resource}</td>
                    <td className="py-3 px-3 text-muted-foreground font-mono text-xs">{log.ip}</td>
                    <td className="py-3 px-3 text-center">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          log.status === 'Success'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Showing 1-5 of 247 entries</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Previous</Button>
              <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
                1
              </Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Events', value: '2,847', color: 'bg-blue-100 text-blue-800' },
          { label: 'Today', value: '342', color: 'bg-green-100 text-green-800' },
          { label: 'Failed Actions', value: '12', color: 'bg-red-100 text-red-800' },
          { label: 'Active Users', value: '28', color: 'bg-purple-100 text-purple-800' },
        ].map((stat) => (
          <Card key={stat.label} className="text-center">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
              <p className={`text-3xl font-bold ${stat.color.split(' ')[1]}`}>{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
