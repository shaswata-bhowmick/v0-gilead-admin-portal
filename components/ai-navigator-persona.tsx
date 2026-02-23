'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Bot, Save, Volume2, UserCircle } from 'lucide-react'

const VOICE_OPTIONS = [
  { id: 'voice-1', name: 'Professional', description: 'Clear and authoritative' },
  { id: 'voice-2', name: 'Friendly', description: 'Warm and approachable' },
  { id: 'voice-3', name: 'Conversational', description: 'Casual and relaxed' },
  { id: 'voice-4', name: 'Empathetic', description: 'Caring and understanding' },
]

const AVATAR_OPTIONS = [
  { id: 'avatar-1', name: 'Avatar 1', image: '/avatars/avatar-1-male.jpg' },
  { id: 'avatar-2', name: 'Avatar 2', image: '/avatars/avatar-2-female.jpg' },
  { id: 'avatar-3', name: 'Avatar 3', image: '/avatars/avatar-3-male.jpg' },
  { id: 'avatar-4', name: 'Avatar 4', image: '/avatars/avatar-4-female.jpg' },
]

export default function AINavigatorPersona() {
  const [personaName, setPersonaName] = useState('Medical AI Assistant')
  const [personaDescription, setPersonaDescription] = useState(
    'A knowledgeable medical information assistant specialized in pharmaceutical products and clinical data.'
  )
  const [greetingMessage, setGreetingMessage] = useState(
    'Hello! I\'m here to help you find accurate information about our pharmaceutical products. How can I assist you today?'
  )
  const [selectedVoice, setSelectedVoice] = useState('voice-1')
  const [selectedAvatar, setSelectedAvatar] = useState('avatar-1')

  const handleSave = () => {
    // Save persona settings
    console.log('[v0] Saving persona settings:', {
      personaName,
      personaDescription,
      greetingMessage,
      selectedVoice,
      selectedAvatar,
    })
    alert('Persona settings saved successfully!')
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">AI Navigator Persona</h2>
        <p className="text-muted-foreground mt-2">
          Configure the personality and appearance of your AI Navigator
        </p>
      </div>

      <div className="grid gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              Basic Information
            </CardTitle>
            <CardDescription>Define the core identity of your AI Navigator</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="persona-name">Name</Label>
              <Input
                id="persona-name"
                value={personaName}
                onChange={(e) => setPersonaName(e.target.value)}
                placeholder="Enter persona name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="persona-description">Persona Description</Label>
              <Textarea
                id="persona-description"
                value={personaDescription}
                onChange={(e) => setPersonaDescription(e.target.value)}
                placeholder="Describe the persona's role and expertise"
                rows={4}
              />
              <p className="text-xs text-muted-foreground">
                This description helps define how the AI Navigator should behave and respond
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="greeting-message">Greeting Message</Label>
              <Textarea
                id="greeting-message"
                value={greetingMessage}
                onChange={(e) => setGreetingMessage(e.target.value)}
                placeholder="Enter the initial greeting message"
                rows={3}
              />
              <p className="text-xs text-muted-foreground">
                This message will be displayed when users first interact with the AI Navigator
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Voice Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="w-5 h-5" />
              Voice & Tone
            </CardTitle>
            <CardDescription>Choose the communication style for your AI Navigator</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {VOICE_OPTIONS.map((voice) => (
                <button
                  key={voice.id}
                  onClick={() => setSelectedVoice(voice.id)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    selectedVoice === voice.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="font-semibold">{voice.name}</div>
                  <div className="text-sm text-muted-foreground mt-1">{voice.description}</div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Avatar Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCircle className="w-5 h-5" />
              Avatar
            </CardTitle>
            <CardDescription>Select a visual representation for your AI Navigator</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {AVATAR_OPTIONS.map((avatar) => (
                <button
                  key={avatar.id}
                  onClick={() => setSelectedAvatar(avatar.id)}
                  className={`p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-3 ${
                    selectedAvatar === avatar.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="relative w-24 h-24 rounded-full overflow-hidden">
                    <Image
                      src={avatar.image}
                      alt={avatar.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-sm font-medium text-center">{avatar.name}</div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} size="lg" className="gap-2">
            <Save className="w-4 h-4" />
            Save Persona Settings
          </Button>
        </div>
      </div>
    </div>
  )
}
