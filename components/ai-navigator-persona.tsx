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
  { 
    id: 'voice-1', 
    name: 'James', 
    gender: 'Male',
    accent: 'US Accent',
    description: 'Professional and authoritative tone, ideal for medical information' 
  },
  { 
    id: 'voice-2', 
    name: 'Michael', 
    gender: 'Male',
    accent: 'US Accent',
    description: 'Warm and approachable, perfect for patient-friendly communication' 
  },
  { 
    id: 'voice-3', 
    name: 'David', 
    gender: 'Male',
    accent: 'US Accent',
    description: 'Clear and conversational, great for educational content' 
  },
  { 
    id: 'voice-4', 
    name: 'Sarah', 
    gender: 'Female',
    accent: 'US Accent',
    description: 'Caring and empathetic, excellent for sensitive topics' 
  },
  { 
    id: 'voice-5', 
    name: 'Emily', 
    gender: 'Female',
    accent: 'US Accent',
    description: 'Confident and articulate, suited for clinical discussions' 
  },
  { 
    id: 'voice-6', 
    name: 'Jennifer', 
    gender: 'Female',
    accent: 'US Accent',
    description: 'Friendly and reassuring, ideal for patient support' 
  },
]

const AVATAR_OPTIONS = [
  { id: 'avatar-1', name: 'Avatar 1', image: '/avatars/avatar-1-male.jpg' },
  { id: 'avatar-2', name: 'Avatar 2', image: '/avatars/avatar-2-female.jpg' },
  { id: 'avatar-3', name: 'Avatar 3', image: '/avatars/avatar-3-male.jpg' },
  { id: 'avatar-4', name: 'Avatar 4', image: '/avatars/avatar-4-female.jpg' },
]

export default function AINavigatorPersona() {
  const [personaName, setPersonaName] = useState('ProOne')
  const [personaDescription, setPersonaDescription] = useState(
    'PharmaOne\'s Medical Information Assistant'
  )
  const [greetingMessage, setGreetingMessage] = useState(
    'Hi, I\'m ProOne, PharmaOne\'s Medical Information Assistant. I can provide you with concise answers about PharmaOne medicines. If your question does not relate to a PharmaOne medicine, please close the chat and use the search bar to ask your question.'
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

  const handlePlayVoice = (voiceId: string) => {
    // Placeholder for voice playback
    console.log('[v0] Playing voice preview:', voiceId)
    alert(`Playing voice preview for ${VOICE_OPTIONS.find(v => v.id === voiceId)?.name}`)
  }

  return (
    <div className="space-y-6">

      <div className="grid gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              Basic Information
            </CardTitle>
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
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {VOICE_OPTIONS.map((voice) => (
                <div
                  key={voice.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedVoice === voice.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="font-semibold text-base">{voice.name}</div>
                      <div className="text-xs text-muted-foreground">{voice.gender} • {voice.accent}</div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePlayVoice(voice.id)}
                    className="w-full mb-3 gap-2"
                  >
                    <Volume2 className="w-4 h-4" />
                    Listen
                  </Button>
                  <p className="text-sm text-muted-foreground mb-3">{voice.description}</p>
                  <Button
                    variant={selectedVoice === voice.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedVoice(voice.id)}
                    className="w-full"
                  >
                    {selectedVoice === voice.id ? 'Selected' : 'Select Voice'}
                  </Button>
                </div>
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
