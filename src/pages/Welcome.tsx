import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Heart, MessageCircle } from 'lucide-react';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-peaceful flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo & Branding */}
        <div className="text-center space-y-4 animate-fade-in">
          <div className="relative mx-auto w-32 h-32 bg-gradient-calm rounded-full flex items-center justify-center shadow-gentle animate-float">
            <div className="text-6xl">🧠</div>
            <div className="absolute -top-2 -right-2 text-2xl animate-gentle-pulse">✨</div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">MindMate</h1>
            <p className="text-lg text-muted-foreground font-medium">
              Your AI Wellness Companion
            </p>
          </div>
        </div>

        {/* Features Preview */}
        <div className="grid grid-cols-3 gap-4 my-8">
          <Card className="p-4 text-center shadow-gentle border-primary/20">
            <Heart className="h-6 w-6 text-secondary mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Track Mood</p>
          </Card>
          <Card className="p-4 text-center shadow-gentle border-accent/20">
            <MessageCircle className="h-6 w-6 text-accent-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">AI Support</p>
          </Card>
          <Card className="p-4 text-center shadow-gentle border-secondary/20">
            <Sparkles className="h-6 w-6 text-secondary-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Create Art</p>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button 
            className="w-full h-12 text-lg bg-gradient-calm hover:shadow-warm transition-all duration-300 border-0"
            onClick={() => navigate('/auth')}
          >
            Get Started 🌱
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full h-12 text-lg border-primary/30 hover:bg-primary/10 transition-all duration-300"
            onClick={() => navigate('/home')}
          >
            Continue as Guest 👋
          </Button>
        </div>

        {/* Safe Space Message */}
        <Card className="p-4 bg-accent/10 border-accent/30 shadow-gentle">
          <p className="text-sm text-center text-accent-foreground">
            <span className="font-medium">Safe Space Promise:</span><br />
            This is your judgment-free zone for mental wellness and creative expression 💙
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Welcome;