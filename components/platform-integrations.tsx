'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Link2, Settings } from 'lucide-react'

export default function PlatformIntegrations() {
  const integrations = [
    {
      id: 1,
      name: 'Salesforce CRM',
      category: 'CRM',
      status: 'Connected',
      icon: '🔵',
    },
    {
      id: 2,
      name: 'Slack',
      category: 'Communication',
      status: 'Pending',
      icon: '🟣',
    },
    {
      id: 3,
      name: 'HubSpot',
      category: 'Marketing',
      status: 'Connected',
      icon: '🟠',
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold text-foreground">Platform Integrations</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Connect external tools and manage site integrations for the digital human avatar
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Integration
        </Button>
      </div>

      {/* Available Integrations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Available Integrations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Salesforce', desc: 'CRM Platform', logo: '💼' },
              { name: 'Slack', desc: 'Team Communication', logo: '💬' },
              { name: 'HubSpot', desc: 'Marketing Platform', logo: '📊' },
              { name: 'Microsoft Teams', desc: 'Enterprise Chat', logo: '👥' },
              { name: 'Google Workspace', desc: 'Productivity Suite', logo: '📧' },
              { name: 'Veeva', desc: 'Pharma CRM', logo: '⚕️' },
            ].map((int) => (
              <Button
                key={int.name}
                variant="outline"
                className="h-auto flex-col gap-2 p-4 border-2 border-border hover:border-primary bg-transparent"
              >
                <span className="text-2xl">{int.logo}</span>
                <span className="font-semibold text-foreground">{int.name}</span>
                <span className="text-xs text-muted-foreground">{int.desc}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Connected Integrations */}
      <div>
        <h4 className="font-semibold text-foreground mb-4">Connected Services</h4>
        <div className="grid gap-4">
          {integrations.map((integration) => (
            <Card key={integration.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{integration.icon}</div>
                    <div>
                      <p className="font-semibold text-foreground">{integration.name}</p>
                      <p className="text-sm text-muted-foreground">{integration.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${
                        integration.status === 'Connected'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {integration.status}
                    </span>
                    <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                      <Settings className="w-4 h-4" />
                      Configure
                    </Button>
                    {integration.status !== 'Connected' && (
                      <Button size="sm" className="gap-1">
                        <Link2 className="w-4 h-4" />
                        Connect
                      </Button>
                    )}
                  </div>
                </div>

                {/* Integration Details */}
                {integration.status === 'Connected' && (
                  <div className="mt-4 pt-4 border-t border-border space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last Sync</span>
                      <span className="text-foreground">2 hours ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Connection Status</span>
                      <span className="text-green-600 font-medium">Active</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">API Rate Limit</span>
                      <span className="text-foreground">95/1000 requests</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Branding Configuration */}
      <Card className="border-primary/30 bg-gradient-to-br from-blue-50 to-white">
        <CardHeader>
          <CardTitle className="text-lg">Site Integration & Branding</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Website URLs</label>
            <input
              type="text"
              placeholder="https://example.com"
              className="w-full mt-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button variant="outline" className="mt-2 w-full bg-transparent">
              + Add Another URL
            </Button>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Brand Color</label>
            <div className="flex gap-2 mt-2">
              <div className="w-12 h-10 bg-blue-600 rounded-lg border-2 border-primary cursor-pointer" />
              <Button variant="outline">
                Customize Colors
              </Button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Chat Widget Position</label>
            <select className="w-full mt-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
              <option>Bottom Right</option>
              <option>Bottom Left</option>
              <option>Top Right</option>
              <option>Top Left</option>
            </select>
          </div>

          <Button className="w-full mt-4">Save Branding Settings</Button>
        </CardContent>
      </Card>
    </div>
  )
}
