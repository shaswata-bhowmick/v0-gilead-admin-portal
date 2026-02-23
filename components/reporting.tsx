'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, TrendingDown, Users, Clock } from 'lucide-react'
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

export default function Reporting() {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
