import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { BottomNav } from '@/components/ui/bottom-nav';
import { ArrowLeft, Sparkles, Type, Smile } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface MoodEntry {
  mood: string;
  emoji: string;
  timestamp: Date;
}

const MoodJournal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [customMoodText, setCustomMoodText] = useState('');
  const [moodInputMode, setMoodInputMode] = useState<'emoji' | 'text'>('emoji');
  const [showResponse, setShowResponse] = useState(false);
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);

  // Check for quick mood from URL params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const quickMood = params.get('quick');
    if (quickMood) {
      setSelectedMood(quickMood);
    }
  }, [location]);

  const moods = [
    { id: 'amazing', emoji: '🌟', label: 'Amazing', color: 'text-success' },
    { id: 'happy', emoji: '😊', label: 'Happy', color: 'text-success' },
    { id: 'good', emoji: '🙂', label: 'Good', color: 'text-accent-foreground' },
    { id: 'neutral', emoji: '😐', label: 'Okay', color: 'text-muted-foreground' },
    { id: 'down', emoji: '😔', label: 'Down', color: 'text-warning' },
    { id: 'sad', emoji: '😞', label: 'Sad', color: 'text-warning' },
    { id: 'overwhelmed', emoji: '😰', label: 'Overwhelmed', color: 'text-destructive' }
  ];

  const getMoodResponse = (moodId: string) => {
    const responses = {
      amazing: "That's wonderful! ✨ Your positive energy is inspiring. Keep shining!",
      happy: "So glad you're feeling happy! 😊 Those good vibes are contagious.",
      good: "Nice to hear you're doing well! 🌱 Keep nurturing that positive momentum.",
      neutral: "It's okay to feel neutral sometimes. 🤍 Every feeling is valid and temporary.",
      down: "I hear you. 💙 It's brave to acknowledge difficult feelings. You're not alone.",
      sad: "Sending you gentle comfort. 🫂 Remember, it's okay to feel sad - you're processing and healing.",
      overwhelmed: "Take a deep breath with me. 🌸 Let's break things down into smaller, manageable pieces."
    };
    return responses[moodId as keyof typeof responses] || "Thank you for sharing how you're feeling. 💙";
  };

  const getCustomMoodResponse = (customText: string) => {
    const lowerText = customText.toLowerCase();
    
    if (lowerText.includes('tired') || lowerText.includes('exhausted')) {
      return "It sounds like you're feeling drained. 😴 Rest is important for healing. Have you been able to get enough sleep lately?";
    }
    if (lowerText.includes('excited') || lowerText.includes('energetic')) {
      return "I love hearing about your excitement! ⚡ That positive energy is wonderful. What's bringing you joy today?";
    }
    if (lowerText.includes('confused') || lowerText.includes('lost')) {
      return "Feeling uncertain is completely normal. 🌫️ Sometimes clarity comes when we give ourselves permission to not have all the answers right now.";
    }
    if (lowerText.includes('grateful') || lowerText.includes('thankful')) {
      return "Gratitude is such a beautiful feeling! 🙏 It's amazing how acknowledging the good can shift our entire perspective.";
    }
    if (lowerText.includes('creative') || lowerText.includes('inspired')) {
      return "Creative energy is flowing through you! 🎨 This is a wonderful time to express yourself and explore new ideas.";
    }
    
    return `Thank you for sharing "${customText}" with me. 💙 Your feelings are completely valid, and I'm here to support you through whatever you're experiencing.`;
  };

  const handleMoodSelect = (moodId: string) => {
    setSelectedMood(moodId);
    setShowResponse(true);
    
    const selectedMoodData = moods.find(m => m.id === moodId);
    if (selectedMoodData) {
      const newEntry: MoodEntry = {
        mood: moodId,
        emoji: selectedMoodData.emoji,
        timestamp: new Date()
      };
      setMoodEntries(prev => [newEntry, ...prev.slice(0, 6)]); // Keep last 7 entries
    }
  };

  const handleCustomMoodSubmit = () => {
    if (!customMoodText.trim()) return;
    
    setSelectedMood('custom');
    setShowResponse(true);
    
    const newEntry: MoodEntry = {
      mood: customMoodText,
      emoji: '💭',
      timestamp: new Date()
    };
    setMoodEntries(prev => [newEntry, ...prev.slice(0, 6)]);
  };

  const getMoodResponseText = () => {
    if (selectedMood === 'custom') {
      return getCustomMoodResponse(customMoodText);
    }
    return getMoodResponse(selectedMood!);
  };

  const getCurrentMoodEmoji = () => {
    if (selectedMood === 'custom') {
      return '💭';
    }
    return moods.find(m => m.id === selectedMood)?.emoji || '💭';
  };

  const getPositiveContent = () => {
    const content = [
      { type: 'poem', text: 'You are enough, just as you are,\nA shining light, a brilliant star.\nEach breath you take, each step you make,\nIs progress for your spirit\'s sake. 🌟' },
      { type: 'quote', text: 'The only way out is through, and you are already on your way. Every small step counts. - You have got this! 💪' },
      { type: 'affirmation', text: 'I am resilient. I am growing. I am exactly where I need to be in this moment. 🌱' },
      { type: 'song', text: '🎵 "Here Comes the Sun" by The Beatles - Because brighter days are always ahead! ☀️' }
    ];
    return content[Math.floor(Math.random() * content.length)];
  };

  const [positiveContent, setPositiveContent] = useState(getPositiveContent());

  return (
    <div className="min-h-screen bg-gradient-peaceful pb-20 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 pt-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/home')}
            className="p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Mood Journal</h1>
            <p className="text-sm text-muted-foreground">How are you feeling right now?</p>
          </div>
        </div>

        {!showResponse ? (
          <>
            {/* Mode Toggle */}
            <div className="flex justify-center">
              <div className="flex bg-muted/50 p-1 rounded-lg">
                <Button
                  variant={moodInputMode === 'emoji' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setMoodInputMode('emoji')}
                  className="flex items-center gap-2"
                >
                  <Smile className="h-4 w-4" />
                  Emoji Moods
                </Button>
                <Button
                  variant={moodInputMode === 'text' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setMoodInputMode('text')}
                  className="flex items-center gap-2"
                >
                  <Type className="h-4 w-4" />
                  Describe Mood
                </Button>
              </div>
            </div>

            {/* Mood Selection */}
            {moodInputMode === 'emoji' ? (
              <Card className="p-6 shadow-warm">
                <div className="text-center mb-6">
                  <h2 className="text-lg font-semibold mb-2">Choose your current mood</h2>
                  <p className="text-sm text-muted-foreground">There's no wrong answer - all feelings are valid</p>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {moods.map((mood) => (
                    <button
                      key={mood.id}
                      onClick={() => handleMoodSelect(mood.id)}
                      className={`p-4 rounded-lg border-2 transition-all duration-300 hover:shadow-gentle hover:scale-105 ${
                        selectedMood === mood.id 
                          ? 'border-primary bg-primary/10' 
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="text-3xl mb-2">{mood.emoji}</div>
                      <div className={`text-sm font-medium ${mood.color}`}>{mood.label}</div>
                    </button>
                  ))}
                </div>
              </Card>
            ) : (
              <Card className="p-6 shadow-warm">
                <div className="text-center mb-6">
                  <h2 className="text-lg font-semibold mb-2">Describe how you're feeling</h2>
                  <p className="text-sm text-muted-foreground">Express your mood in your own words</p>
                </div>
                
                <div className="space-y-4">
                  <Textarea
                    placeholder="I'm feeling... (e.g., excited about my art project, tired from school, grateful for my friends)"
                    value={customMoodText}
                    onChange={(e) => setCustomMoodText(e.target.value)}
                    className="min-h-[100px] resize-none"
                  />
                  <Button
                    onClick={handleCustomMoodSubmit}
                    disabled={!customMoodText.trim()}
                    className="w-full bg-gradient-calm hover:shadow-gentle"
                  >
                    Share My Mood 💭
                  </Button>
                </div>
              </Card>
            )}

            {/* Recent Moods */}
            {moodEntries.length > 0 && (
              <Card className="p-4 shadow-gentle">
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-accent" />
                  Recent Moods
                </h3>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {moodEntries.map((entry, index) => (
                    <div key={index} className="flex-shrink-0 text-center">
                      <div className="text-xl mb-1">{entry.emoji}</div>
                      <div className="text-xs text-muted-foreground">
                        {entry.timestamp.toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </>
        ) : (
          <div className="space-y-6 animate-fade-in">
            {/* AI Response */}
            <Card className="p-6 bg-gradient-healing shadow-warm border-secondary/20">
              <div className="text-center space-y-4">
                <div className="text-4xl">
                  {getCurrentMoodEmoji()}
                </div>
                <p className="text-secondary-foreground font-medium">
                  {getMoodResponseText()}
                </p>
              </div>
            </Card>

            {/* Positive Content Offer */}
            <Card className="p-6 shadow-gentle">
              <div className="text-center space-y-4">
                <h3 className="font-semibold flex items-center justify-center gap-2">
                  <Sparkles className="h-5 w-5 text-accent" />
                  Want something uplifting?
                </h3>
                
                <Card className="p-4 bg-accent/10 border-accent/30">
                  <p className="text-sm text-accent-foreground whitespace-pre-line">
                    {positiveContent.text}
                  </p>
                </Card>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setPositiveContent(getPositiveContent())}
                  >
                    Get Another ✨
                  </Button>
                  <Button
                    className="flex-1 bg-gradient-calm"
                    onClick={() => navigate('/creative')}
                  >
                    Create Something 🎨
                  </Button>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setShowResponse(false);
                  setSelectedMood(null);
                  setCustomMoodText('');
                  setMoodInputMode('emoji');
                }}
              >
                Log Another Mood
              </Button>
              <Button
                className="w-full bg-gradient-calm"
                onClick={() => navigate('/chat')}
              >
                Talk to AI Support 🤖
              </Button>
            </div>
          </div>
        )}
      </div>
      
      <BottomNav />
    </div>
  );
};

export default MoodJournal;