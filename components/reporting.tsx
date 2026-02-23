'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, TrendingDown, Users, Clock, Sparkles, Target, DollarSign, Zap, MessageSquare, FileText } from 'lucide-react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

// Chart data
const SESSIONS_DATA = [
  { date: 'Oct 25', sessions: 45, users: 28, messages: 120 },
  { date: 'Oct 26', sessions: 52, users: 32, messages: 140 },
  { date: 'Oct 27', sessions: 48, users: 30, messages: 135 },
  { date: 'Oct 28', sessions: 61, users: 38, messages: 165 },
  { date: 'Oct 29', sessions: 55, users: 34, messages: 150 },
  { date: 'Oct 30', sessions: 67, users: 40, messages: 175 },
  { date: 'Oct 31', sessions: 58, users: 36, messages: 155 },
]

const ENGAGEMENT_DATA = [
  { engagement: 'High Engagement', lastWeek: 42, thisWeek: 48 },
  { engagement: 'Medium Engagement', lastWeek: 35, thisWeek: 32 },
  { engagement: 'Low Engagement', lastWeek: 23, thisWeek: 20 },
]

const INTENT_DATA = [
  { name: 'Account Issue', value: 35, fill: '#3b82f6' },
  { name: 'Billing Question', value: 25, fill: '#10b981' },
  { name: 'Feature Request', value: 20, fill: '#f59e0b' },
  { name: 'Product Info', value: 15, fill: '#8b5cf6' },
  { name: 'Other', value: 5, fill: '#6b7280' },
]

const FEEDBACK_DATA = [
  { name: 'Positive', value: 60, fill: '#14b8a6' },
  { name: 'Neutral', value: 25, fill: '#64748b' },
  { name: 'Negative', value: 15, fill: '#f97316' },
]

const RECENT_FEEDBACK = [
  { id: 1, text: 'Excellent response time', sentiment: 'positive', date: '2026-02-27' },
  { id: 2, text: 'Could improve clarity', sentiment: 'neutral', date: '2026-02-27' },
  { id: 3, text: 'Task too long (Neutral)', sentiment: 'neutral', date: '2026-02-26' },
  { id: 4, text: 'Confusing (Negative)', sentiment: 'negative', date: '2026-02-26' },
]

const AI_INSIGHTS = [
  { id: 1, text: 'HCPs from wave 3 email had 3x deeper engagement on PFS data.', impact: 'high' },
  { id: 2, text: 'Cardiovexra Doc Locator emails resulted in 45% higher query completion rates than welcome emails.', impact: 'high' },
  { id: 3, text: 'Safety-related questions from identified HCPs average 2.3x longer session duration.', impact: 'medium' },
  { id: 4, text: 'Unidentified users show 67% higher bounce rates on technical dosing queries.', impact: 'medium' },
  { id: 5, text: 'Morning sessions (8-11 AM) have 28% better containment rates than afternoon sessions.', impact: 'medium' },
  { id: 6, text: 'Oncomyra webinar attendees request 4x more clinical trial data compared to other sources.', impact: 'high' },
]

const FAQ_VOLUME_BY_AUDIENCE = [
  { audience: 'HCP', count: 85 },
  { audience: 'Patient', count: 42 },
  { audience: 'Caregiver', count: 18 },
]

const FAQ_VOLUME_BY_PRODUCT = [
  { product: 'Cardiovexra', count: 78, fill: '#3b82f6' },
  { product: 'Oncomyra', count: 52, fill: '#10b981' },
  { product: 'General', count: 15, fill: '#f59e0b' },
]

const FAQ_VOLUME_BY_REGION = [
  { region: 'US', count: 92 },
  { region: 'EU', count: 38 },
  { region: 'APAC', count: 15 },
]

const UNANSWERED_INTENTS = [
  { intent: 'Long-term safety data >5 years', count: 12 },
  { intent: 'Pediatric dosing guidance', count: 8 },
  { intent: 'Off-label use cases', count: 6 },
  { intent: 'Generic availability timeline', count: 5 },
]

export default function Reporting() {
  return (
    <div className="space-y-6">
      {/* AI Insights Section */}
      <Card className="border-purple-500/30 bg-gradient-to-br from-purple-50 to-white">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <CardTitle className="text-lg">AI-Generated Insights</CardTitle>
          </div>
          <CardDescription>High-impact observations from your AI Navigator data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {AI_INSIGHTS.map((insight) => (
              <div
                key={insight.id}
                className={`flex items-start gap-3 p-4 rounded-lg border-l-4 ${
                  insight.impact === 'high'
                    ? 'bg-purple-50 border-purple-500'
                    : 'bg-blue-50 border-blue-400'
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    insight.impact === 'high' ? 'bg-purple-500' : 'bg-blue-400'
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{insight.text}</p>
                  <span
                    className={`inline-block mt-2 text-xs font-semibold px-2 py-1 rounded ${
                      insight.impact === 'high'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {insight.impact === 'high' ? 'High Impact' : 'Medium Impact'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Sessions</p>
                <p className="text-3xl font-bold text-foreground">455</p>
                <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  +12%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Active Users</p>
                <p className="text-3xl font-bold text-foreground">36</p>
                <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  +8%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Avg Session Time</p>
                <p className="text-3xl font-bold text-foreground">6m 44s</p>
                <div className="flex items-center gap-1 mt-2 text-sm text-red-600">
                  <TrendingDown className="w-4 h-4" />
                  -3%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Messages</p>
                <p className="text-3xl font-bold text-foreground">1,247</p>
                <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  +15%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Containment Rate</p>
                <p className="text-3xl font-bold text-foreground">87%</p>
                <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  +5%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Goal Completion Rate</p>
                <p className="text-3xl font-bold text-foreground">72%</p>
                <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  +9%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Avg Cost per Resolution</p>
                <p className="text-3xl font-bold text-foreground">$0.18</p>
                <div className="flex items-center gap-1 mt-2 text-sm text-red-600">
                  <TrendingDown className="w-4 h-4" />
                  -12%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Token Consumption</p>
                <p className="text-3xl font-bold text-foreground">2.4M</p>
                <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  +18%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Engagement Depth */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg">Engagement Depth</CardTitle>
            <CardDescription>Last Week vs This Week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ENGAGEMENT_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="engagement" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }}
                />
                <Legend />
                <Bar dataKey="lastWeek" fill="#3b82f6" name="Last Week" />
                <Bar dataKey="thisWeek" fill="#1e40af" name="This Week" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Intent Categories */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg">Top Intent Categories</CardTitle>
            <CardDescription>Distribution by type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {INTENT_DATA.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.fill }}
                    />
                    <span className="text-sm text-foreground">{item.name}</span>
                  </div>
                  <span className="font-semibold text-foreground">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Daily Activity Trends */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-lg">Daily Activity Trends</CardTitle>
          <CardDescription>Sessions, Messages, and Users over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={SESSIONS_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="sessions"
                stroke="#3b82f6"
                name="Sessions"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="messages"
                stroke="#f59e0b"
                name="Messages"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#10b981"
                name="Users"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* FAQ Library Volume Analytics */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-lg">FAQ Library Volume Distribution</CardTitle>
          <CardDescription>Content breakdown by audience, product, and region</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* By Audience */}
            <div>
              <h4 className="text-sm font-semibold mb-3 text-foreground">By Audience</h4>
              <div className="space-y-2">
                {FAQ_VOLUME_BY_AUDIENCE.map((item) => (
                  <div key={item.audience} className="flex items-center justify-between p-2 bg-secondary rounded">
                    <span className="text-sm text-foreground">{item.audience}</span>
                    <span className="font-semibold text-foreground">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* By Product */}
            <div>
              <h4 className="text-sm font-semibold mb-3 text-foreground">By Product Type</h4>
              <div className="space-y-2">
                {FAQ_VOLUME_BY_PRODUCT.map((item) => (
                  <div key={item.product} className="flex items-center justify-between p-2 bg-secondary rounded">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }} />
                      <span className="text-sm text-foreground">{item.product}</span>
                    </div>
                    <span className="font-semibold text-foreground">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* By Region */}
            <div>
              <h4 className="text-sm font-semibold mb-3 text-foreground">By Region</h4>
              <div className="space-y-2">
                {FAQ_VOLUME_BY_REGION.map((item) => (
                  <div key={item.region} className="flex items-center justify-between p-2 bg-secondary rounded">
                    <span className="text-sm text-foreground">{item.region}</span>
                    <span className="font-semibold text-foreground">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Intent Analytics & Unanswered */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="w-5 h-5" />
              Intent Analytics
            </CardTitle>
            <CardDescription>Query classification and routing efficiency</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Total Intents</p>
                  <p className="text-2xl font-bold text-blue-700">847</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Resolved</p>
                  <p className="text-2xl font-bold text-green-700">816</p>
                </div>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Resolution Rate</p>
                <p className="text-2xl font-bold text-yellow-700">96.3%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Unanswered Intents
            </CardTitle>
            <CardDescription>Top unresolved queries requiring content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {UNANSWERED_INTENTS.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                  <span className="text-sm text-foreground flex-1">{item.intent}</span>
                  <span className="font-semibold text-red-700 ml-2">{item.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Personalization & Content Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Personalization Metrics
            </CardTitle>
            <CardDescription>Tailored content delivery performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                <span className="text-sm text-foreground">Personalized Responses</span>
                <span className="font-semibold text-foreground">78%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                <span className="text-sm text-foreground">HCP-Specific Content</span>
                <span className="font-semibold text-foreground">64%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                <span className="text-sm text-foreground">Region-Adapted</span>
                <span className="font-semibold text-foreground">92%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                <span className="text-sm text-foreground">Product-Focused</span>
                <span className="font-semibold text-foreground">85%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Content Volume Metrics
            </CardTitle>
            <CardDescription>Document and FAQ usage statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                <span className="text-sm text-foreground">Total Documents</span>
                <span className="font-semibold text-foreground">247</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                <span className="text-sm text-foreground">Active FAQs</span>
                <span className="font-semibold text-foreground">145</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                <span className="text-sm text-foreground">Avg Docs/Session</span>
                <span className="font-semibold text-foreground">3.2</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                <span className="text-sm text-foreground">Content Utilization</span>
                <span className="font-semibold text-foreground">89%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feedback & Sentiment */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg">Feedback & Sentiment</CardTitle>
            <CardDescription>Overall sentiment distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={FEEDBACK_DATA}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} (${value}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {FEEDBACK_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg">Recent Feedback</CardTitle>
            <CardDescription>Latest user feedback and sentiment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {RECENT_FEEDBACK.map((feedback) => (
                <div key={feedback.id} className="flex items-start gap-3 pb-3 border-b border-border last:border-0">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      feedback.sentiment === 'positive'
                        ? 'bg-green-500'
                        : feedback.sentiment === 'negative'
                          ? 'bg-red-500'
                          : 'bg-gray-500'
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{feedback.text}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(feedback.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
