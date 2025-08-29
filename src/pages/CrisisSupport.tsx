import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BottomNav } from '@/components/ui/bottom-nav';
import { ArrowLeft, Phone, MessageSquare, ExternalLink, Heart, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CrisisSupport = () => {
  const navigate = useNavigate();

  const crisisResources = [
    {
      name: '988 Suicide & Crisis Lifeline',
      description: '24/7 free and confidential support',
      phone: '988',
      website: 'https://988lifeline.org',
      icon: '🆘',
      urgent: true
    },
    {
      name: 'Crisis Text Line',
      description: 'Text with trained crisis counselors',
      phone: 'Text HOME to 741741',
      website: 'https://crisistextline.org',
      icon: '💬',
      urgent: true
    },
    {
      name: 'Teen Line',
      description: 'Peer-to-peer crisis support for teens',
      phone: '800-852-8336',
      website: 'https://teenline.org',
      icon: '👥',
      urgent: false
    },
    {
      name: 'National Sexual Assault Hotline',
      description: 'RAINN 24/7 confidential support',
      phone: '800-656-4673',
      website: 'https://rainn.org',
      icon: '🤝',
      urgent: false
    }
  ];

  const copingStrategies = [
    {
      title: 'Grounding Technique',
      description: '5-4-3-2-1: Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste',
      emoji: '🌱'
    },
    {
      title: 'Box Breathing',
      description: 'Breathe in for 4, hold for 4, out for 4, hold for 4. Repeat until calm',
      emoji: '🫁'
    },
    {
      title: 'Cold Water',
      description: 'Splash cold water on your face or hold ice cubes to reset your nervous system',
      emoji: '❄️'
    },
    {
      title: 'Safe Person',
      description: 'Call or text someone you trust. You don\'t have to go through this alone',
      emoji: '🤗'
    }
  ];

  const handleCall = (phone: string) => {
    if (phone.includes('Text')) {
      // For text services, we can't directly open SMS with the message
      // but we can provide clear instructions
      alert(`To use Crisis Text Line:\n1. Open your text messages\n2. Text HOME to 741741\n3. A crisis counselor will respond`);
    } else {
      window.location.href = `tel:${phone.replace(/\D/g, '')}`;
    }
  };

  const handleWebsite = (url: string) => {
    window.open(url, '_blank');
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
              <Shield className="h-6 w-6 text-destructive" />
              Crisis Support
            </h1>
            <p className="text-sm text-muted-foreground">You are not alone. Help is available.</p>
          </div>
        </div>

        {/* Emergency Notice */}
        <Card className="p-4 bg-destructive/10 border-destructive/30 shadow-warm">
          <div className="text-center space-y-3">
            <div className="text-2xl">🆘</div>
            <div>
              <h2 className="font-bold text-destructive-foreground">In Immediate Danger?</h2>
              <p className="text-sm text-destructive-foreground/80 mb-3">
                If you are in immediate physical danger, please call emergency services
              </p>
              <Button
                className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                onClick={() => window.location.href = 'tel:911'}
              >
                <Phone className="h-4 w-4 mr-2" />
                Call 911 Emergency
              </Button>
            </div>
          </div>
        </Card>

        {/* Crisis Hotlines */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            Crisis Support Lines
          </h2>
          
          {crisisResources.map((resource, index) => (
            <Card 
              key={index} 
              className={`p-4 shadow-gentle border transition-all duration-300 hover:shadow-warm ${
                resource.urgent ? 'border-destructive/30 bg-destructive/5' : 'border-primary/20'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">{resource.icon}</span>
                      <h3 className="font-semibold text-foreground">{resource.name}</h3>
                      {resource.urgent && (
                        <span className="text-xs bg-destructive text-destructive-foreground px-2 py-1 rounded-full">
                          24/7
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                    <p className="text-sm font-medium text-foreground">{resource.phone}</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    className="flex-1 bg-gradient-calm hover:shadow-gentle"
                    onClick={() => handleCall(resource.phone)}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    {resource.phone.includes('Text') ? 'Text' : 'Call'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleWebsite(resource.website)}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Immediate Coping Strategies */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <span className="text-xl">🛡️</span>
            Immediate Coping Strategies
          </h2>
          
          <div className="grid gap-3">
            {copingStrategies.map((strategy, index) => (
              <Card key={index} className="p-4 shadow-gentle border-accent/20 hover:bg-accent/5 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{strategy.emoji}</div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">{strategy.title}</h3>
                    <p className="text-sm text-muted-foreground">{strategy.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Safety Plan */}
        <Card className="p-4 bg-success/10 border-success/30 shadow-gentle">
          <div className="space-y-3">
            <h3 className="font-semibold text-success-foreground flex items-center gap-2">
              <span className="text-xl">📋</span>
              Create a Safety Plan
            </h3>
            <div className="text-sm text-success-foreground/80 space-y-2">
              <p>• Identify your warning signs</p>
              <p>• List coping strategies that help you</p>
              <p>• Write down trusted people to contact</p>
              <p>• Remove or secure items that could cause harm</p>
              <p>• Professional contacts and crisis numbers</p>
            </div>
            <Button
              variant="outline"
              className="w-full border-success/30 hover:bg-success/10"
              onClick={() => handleWebsite('https://suicidesafetyplan.com')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Learn More About Safety Plans
            </Button>
          </div>
        </Card>

        {/* Encouragement */}
        <Card className="p-4 bg-primary/10 border-primary/30 shadow-gentle">
          <div className="text-center space-y-2">
            <div className="text-2xl">💙</div>
            <h3 className="font-semibold text-primary-foreground">You Matter</h3>
            <p className="text-sm text-primary-foreground/80">
              Your life has value. Your feelings are valid. There are people who want to help you through this difficult time. 
              You are stronger than you know, and this pain you're feeling right now is temporary.
            </p>
          </div>
        </Card>

        {/* Return to Safety */}
        <div className="space-y-3">
          <Button
            className="w-full bg-gradient-calm hover:shadow-gentle"
            onClick={() => navigate('/chat')}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Talk to AI Support
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate('/home')}
          >
            Return to Safe Space
          </Button>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default CrisisSupport;