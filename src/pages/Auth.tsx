import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Lock } from 'lucide-react';
import { useState } from 'react';

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-peaceful flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/welcome')}
            className="p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {isLogin ? 'Welcome Back' : 'Join MindMate'}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isLogin ? 'Sign in to continue your wellness journey' : 'Start your mental wellness journey'}
            </p>
          </div>
        </div>

        {/* Auth Form */}
        <Card className="p-6 shadow-warm">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="email" 
                  placeholder="your@email.com"
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="password" 
                  placeholder="Your password"
                  className="pl-10"
                />
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="password" 
                    placeholder="Confirm your password"
                    className="pl-10"
                  />
                </div>
              </div>
            )}

            <Button 
              className="w-full bg-gradient-calm hover:shadow-gentle"
              onClick={() => navigate('/home')}
            >
              {isLogin ? 'Sign In' : 'Create Account'} 🌱
            </Button>
          </div>
        </Card>

        {/* Toggle Auth Mode */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </p>
          <Button
            variant="ghost"
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary hover:text-primary/80"
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </Button>
        </div>

        {/* Guest Option */}
        <Card className="p-4 bg-accent/10 border-accent/30">
          <div className="text-center">
            <p className="text-sm text-accent-foreground mb-3">
              Not ready to create an account?
            </p>
            <Button
              variant="outline"
              className="w-full border-accent/30 hover:bg-accent/10"
              onClick={() => navigate('/home')}
            >
              Continue as Guest 👋
            </Button>
          </div>
        </Card>

        {/* Privacy Note */}
        <p className="text-xs text-center text-muted-foreground">
          Your privacy and safety are our top priority. All data is encrypted and secure. 🔒
        </p>
      </div>
    </div>
  );
};

export default Auth;