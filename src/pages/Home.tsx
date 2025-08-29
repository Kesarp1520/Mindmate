import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BottomNav } from '@/components/ui/bottom-nav';
import { CrisisButton } from '@/components/ui/crisis-button';
import { useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Palette, Sparkles, Sun } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const dailyTips = [
    "Take 5 deep breaths when you feel overwhelmed 🌸",
    "Remember: It's okay to feel whatever you're feeling today 💙",
    "You are stronger than you think, even on difficult days 🌟",
    "Small steps forward are still progress worth celebrating 🎉"
  ];

  const todaysTip = dailyTips[Math.floor(Math.random() * dailyTips.length)];

  return (
    <div className="min-h-screen bg-gradient-peaceful pb-20 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center pt-8 pb-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sun className="h-6 w-6 text-warning animate-gentle-pulse" />
            <h1 className="text-2xl font-bold text-foreground">Good day!</h1>
          </div>
          <p className="text-muted-foreground">How are you feeling today?</p>
        </div>

        {/* Daily Tip Card */}
        <Card className="p-6 bg-gradient-healing shadow-warm border-secondary/20 animate-fade-in">
          <div className="flex items-start gap-3">
            <div className="text-2xl">💡</div>
            <div>
              <h3 className="font-semibold text-secondary-foreground mb-2">Daily Wellness Tip</h3>
              <p className="text-sm text-secondary-foreground/80 leading-relaxed">
                {todaysTip}
              </p>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent" />
            Quick Actions
          </h2>
          
          <div className="grid grid-cols-1 gap-3">
            {/* Mood Log */}
            <Button
              variant="outline"
              className="h-16 justify-between p-4 bg-card/60 border-primary/30 hover:bg-primary/10 hover:shadow-gentle transition-all duration-300"
              onClick={() => navigate('/mood')}
            >
              <div className="flex items-center gap-3">
                <Heart className="h-6 w-6 text-primary" />
                <div className="text-left">
                  <p className="font-medium">Log Your Mood</p>
                  <p className="text-sm text-muted-foreground">Track how you're feeling</p>
                </div>
              </div>
              <div className="text-xl">😊</div>
            </Button>

            {/* AI Chat */}
            <Button
              variant="outline"
              className="h-16 justify-between p-4 bg-card/60 border-accent/30 hover:bg-accent/10 hover:shadow-gentle transition-all duration-300"
              onClick={() => navigate('/chat')}
            >
              <div className="flex items-center gap-3">
                <MessageCircle className="h-6 w-6 text-accent-foreground" />
                <div className="text-left">
                  <p className="font-medium">Chat with AI</p>
                  <p className="text-sm text-muted-foreground">Get supportive guidance</p>
                </div>
              </div>
              <div className="text-xl">🤖</div>
            </Button>

            {/* Creative Outlet */}
            <Button
              variant="outline"
              className="h-16 justify-between p-4 bg-card/60 border-secondary/30 hover:bg-secondary/10 hover:shadow-gentle transition-all duration-300"
              onClick={() => navigate('/creative')}
            >
              <div className="flex items-center gap-3">
                <Palette className="h-6 w-6 text-secondary-foreground" />
                <div className="text-left">
                  <p className="font-medium">Creative Outlet</p>
                  <p className="text-sm text-muted-foreground">Express yourself creatively</p>
                </div>
              </div>
              <div className="text-xl">✨</div>
            </Button>
          </div>
        </div>

        {/* Mood Check-in */}
        <Card className="p-4 bg-primary/5 border-primary/20 shadow-gentle">
          <div className="text-center space-y-3">
            <h3 className="font-medium text-foreground">Quick Mood Check</h3>
            <div className="flex justify-center gap-4">
              {[
                { emoji: '😊', label: 'Great', mood: 'happy' },
                { emoji: '😐', label: 'Okay', mood: 'neutral' },
                { emoji: '😞', label: 'Down', mood: 'sad' }
              ].map((moodOption) => (
                <button
                  key={moodOption.mood}
                  className="p-3 rounded-lg hover:bg-primary/10 transition-colors"
                  onClick={() => navigate(`/mood?quick=${moodOption.mood}`)}
                >
                  <div className="text-2xl mb-1">{moodOption.emoji}</div>
                  <div className="text-xs text-muted-foreground">{moodOption.label}</div>
                </button>
              ))}
            </div>
          </div>
        </Card>
      </div>
      
      <CrisisButton />
      <BottomNav />
    </div>
  );
};

export default Home;