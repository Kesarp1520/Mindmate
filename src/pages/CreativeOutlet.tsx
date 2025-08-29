import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BottomNav } from '@/components/ui/bottom-nav';
import { ArrowLeft, Sparkles, Heart, Palette, RefreshCw, Share, Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type ContentType = 'poem' | 'affirmation' | 'art-idea' | null;

interface CreativeContent {
  type: ContentType;
  title: string;
  content: string;
  category: string;
}

const CreativeOutlet = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<ContentType>(null);
  const [currentContent, setCurrentContent] = useState<CreativeContent | null>(null);
  const [savedItems, setSavedItems] = useState<CreativeContent[]>([]);

  const contentTypes = [
    {
      id: 'poem' as const,
      title: 'Uplifting Poem',
      description: 'Let AI create a personalized poem to brighten your day',
      emoji: '📝',
      color: 'bg-secondary/20 border-secondary/30 hover:bg-secondary/30'
    },
    {
      id: 'affirmation' as const,
      title: 'Daily Affirmation',
      description: 'Receive powerful affirmations for self-love and growth',
      emoji: '💙',
      color: 'bg-primary/20 border-primary/30 hover:bg-primary/30'
    },
    {
      id: 'art-idea' as const,
      title: 'Creative Art Idea',
      description: 'Get inspired with therapeutic art and craft suggestions',
      emoji: '🎨',
      color: 'bg-accent/20 border-accent/30 hover:bg-accent/30'
    }
  ];

  const generateContent = (type: ContentType): CreativeContent | null => {
    if (!type) return null;

    const content = {
      poem: [
        {
          title: "Seeds of Strength",
          content: "In the garden of your heart,\nSeeds of strength lie waiting.\nWith each breath, with each new start,\nYour soul keeps on creating.\n\nThrough storms and gentle rain,\nYou grow in ways unseen.\nEach struggle, each small pain,\nMakes you beautifully keen.\n\nSo bloom where you are planted,\nShine bright with inner light.\nYour worth is never granted,\nIt's yours by sacred right. 🌱",
          category: "Empowerment"
        },
        {
          title: "Gentle Waves",
          content: "Like waves upon the shore,\nEmotions come and go.\nSome crash, some whisper more,\nAll have wisdom to bestow.\n\nDon't fight the changing tide,\nLet feelings flow through you.\nWith patience as your guide,\nCalm waters will renew.\n\nYou are the endless ocean,\nVast, deep, and ever free.\nIn stillness and in motion,\nPerfectly you will be. 🌊",
          category: "Mindfulness"
        }
      ],
      affirmation: [
        {
          title: "I Am Enough Affirmation",
          content: "I am enough, exactly as I am today.\nI honor my feelings and give myself permission to feel them fully.\nI am worthy of love, kindness, and compassion.\nMy journey is unique and valid.\nI choose to be gentle with myself as I grow.\nEvery small step forward is progress worth celebrating.\nI trust in my ability to navigate life's challenges.\nI am resilient, I am brave, I am loved. 💙",
          category: "Self-Love"
        },
        {
          title: "Growth Mindset Affirmation",
          content: "I embrace challenges as opportunities to grow.\nMy mistakes are lessons that help me become wiser.\nI celebrate my progress, no matter how small.\nI am learning to trust the process of my life.\nDifficult moments are temporary, but my strength is permanent.\nI choose curiosity over judgment.\nI am becoming the person I am meant to be.\nEvery day, I am writing a beautiful story. 🌟",
          category: "Growth"
        }
      ],
      'art-idea': [
        {
          title: "Emotion Color Journal",
          content: "Create a daily emotion color wheel! 🎨\n\n• Get a blank journal or large paper\n• Each day, choose colors that represent your feelings\n• Paint, draw, or color in abstract shapes\n• No rules - let your emotions guide the colors\n• Add words, symbols, or patterns if you feel like it\n• Over time, you'll see beautiful patterns of your emotional journey\n\nThis helps process feelings and creates something beautiful from every emotion! 🌈",
          category: "Therapeutic Art"
        },
        {
          title: "Gratitude Collage",
          content: "Make a gratitude vision board that celebrates YOU! ✨\n\n• Gather magazines, printed photos, or draw your own images\n• Cut out things that make you smile or feel grateful\n• Include: favorite places, activities, people, dreams, positive words\n• Arrange them on poster board or in a journal\n• Add your own doodles, stickers, or decorative elements\n• Place it somewhere you'll see it daily\n\nThis creates a visual reminder of all the good in your life! 🙏",
          category: "Mindfulness Art"
        }
      ]
    };

    const items = content[type];
    const randomItem = items[Math.floor(Math.random() * items.length)];
    
    return {
      type,
      title: randomItem.title,
      content: randomItem.content,
      category: randomItem.category
    };
  };

  const handleTypeSelect = (type: ContentType) => {
    setSelectedType(type);
    const newContent = generateContent(type);
    setCurrentContent(newContent);
  };

  const handleSave = () => {
    if (currentContent) {
      setSavedItems(prev => [currentContent, ...prev]);
    }
  };

  const handleShare = () => {
    if (currentContent) {
      if (navigator.share) {
        navigator.share({
          title: currentContent.title,
          text: currentContent.content
        });
      } else {
        // Fallback for browsers that don't support Web Share API
        navigator.clipboard.writeText(`${currentContent.title}\n\n${currentContent.content}`);
      }
    }
  };

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
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Palette className="h-6 w-6 text-accent" />
              Creative Outlet
            </h1>
            <p className="text-sm text-muted-foreground">Express and heal through creativity</p>
          </div>
        </div>

        {!currentContent ? (
          /* Content Type Selection */
          <div className="space-y-4">
            <div className="text-center space-y-2">
              <h2 className="text-lg font-semibold">What would you like to create today?</h2>
              <p className="text-sm text-muted-foreground">Choose something that speaks to your heart</p>
            </div>
            
            <div className="space-y-3">
              {contentTypes.map((type) => (
                <Card
                  key={type.id}
                  className={`p-4 cursor-pointer transition-all duration-300 hover:shadow-gentle hover:scale-105 ${type.color}`}
                  onClick={() => handleTypeSelect(type.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{type.emoji}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{type.title}</h3>
                      <p className="text-sm text-muted-foreground">{type.description}</p>
                    </div>
                    <Sparkles className="h-5 w-5 text-accent" />
                  </div>
                </Card>
              ))}
            </div>

            {/* Saved Items Preview */}
            {savedItems.length > 0 && (
              <Card className="p-4 shadow-gentle">
                <div className="flex items-center gap-2 mb-3">
                  <Bookmark className="h-4 w-4 text-accent" />
                  <h3 className="font-medium">Your Saved Creations ({savedItems.length})</h3>
                </div>
                <div className="space-y-2">
                  {savedItems.slice(0, 3).map((item, index) => (
                    <div key={index} className="text-sm p-2 bg-muted/50 rounded">
                      <div className="font-medium">{item.title}</div>
                      <div className="text-xs text-muted-foreground">{item.category}</div>
                    </div>
                  ))}
                  {savedItems.length > 3 && (
                    <p className="text-xs text-muted-foreground">And {savedItems.length - 3} more...</p>
                  )}
                </div>
              </Card>
            )}
          </div>
        ) : (
          /* Generated Content Display */
          <div className="space-y-6 animate-fade-in">
            <Card className="p-6 bg-gradient-healing shadow-warm border-secondary/20">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-secondary-foreground">{currentContent.title}</h2>
                    <p className="text-sm text-secondary-foreground/70">{currentContent.category}</p>
                  </div>
                  <div className="text-2xl">
                    {contentTypes.find(t => t.id === currentContent.type)?.emoji}
                  </div>
                </div>
                
                <div className="bg-card/20 p-4 rounded-lg">
                  <p className="text-secondary-foreground whitespace-pre-line leading-relaxed">
                    {currentContent.content}
                  </p>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={handleSave}
                className="flex items-center gap-2"
              >
                <Bookmark className="h-4 w-4" />
                Save
              </Button>
              <Button
                variant="outline"
                onClick={handleShare}
                className="flex items-center gap-2"
              >
                <Share className="h-4 w-4" />
                Share
              </Button>
            </div>

            <div className="space-y-3">
              <Button
                className="w-full bg-gradient-calm hover:shadow-gentle flex items-center gap-2"
                onClick={() => {
                  const newContent = generateContent(selectedType);
                  setCurrentContent(newContent);
                }}
              >
                <RefreshCw className="h-4 w-4" />
                Generate Another {selectedType?.replace('-', ' ')}
              </Button>
              
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setCurrentContent(null);
                  setSelectedType(null);
                }}
              >
                Choose Different Type
              </Button>
            </div>

            {/* Encouragement */}
            <Card className="p-4 bg-success/10 border-success/30 shadow-gentle">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-success-foreground" />
                <p className="text-sm text-success-foreground">
                  Beautiful work! Creativity is one of the most powerful tools for healing and self-expression. 🎨
                </p>
              </div>
            </Card>
          </div>
        )}
      </div>
      
      <BottomNav />
    </div>
  );
};

export default CreativeOutlet;