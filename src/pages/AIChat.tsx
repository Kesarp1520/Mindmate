import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BottomNav } from '@/components/ui/bottom-nav';
import { ArrowLeft, Send, Bot, User, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isCrisis?: boolean;
}

const AIChat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! 👋 I'm here to listen and support you. How are you feeling today? Remember, this is a safe space where you can share whatever is on your mind.",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const crisisKeywords = ['suicide', 'kill myself', 'end it all', 'hurt myself', 'self harm', 'want to die'];
  const crisisHelpline = '988'; // Suicide & Crisis Lifeline

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const detectCrisis = (text: string): boolean => {
    return crisisKeywords.some(keyword => 
      text.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (detectCrisis(userMessage)) {
      return `I'm really concerned about you right now. 💙 You are not alone, and your life has value. Please reach out for immediate help:\n\n🆘 Call 988 (Suicide & Crisis Lifeline)\n🆘 Text "HELLO" to 741741\n\nIs there someone you trust who you can talk to right now? I'm here with you.`;
    }

    if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety')) {
      return "I understand anxiety can feel overwhelming. Let's try some grounding together: Name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste. 🌸 Remember, anxiety is temporary - you've gotten through difficult moments before.";
    }

    if (lowerMessage.includes('sad') || lowerMessage.includes('depressed')) {
      return "I hear that you're going through a tough time. 💙 It's okay to feel sad - these feelings are valid and part of being human. Have you been able to do any small self-care activities today, like drinking water or stepping outside? Sometimes tiny steps help.";
    }

    if (lowerMessage.includes('stress') || lowerMessage.includes('overwhelmed')) {
      return "Stress can feel like carrying a heavy backpack. Let's lighten the load together. 🎒 Can you identify just one thing that's causing stress? Sometimes breaking it down into smaller pieces makes it more manageable. Take a deep breath with me.";
    }

    if (lowerMessage.includes('lonely') || lowerMessage.includes('alone')) {
      return "Loneliness is such a difficult feeling, but you're not truly alone. 🤗 Even in this moment, I'm here with you. Have you considered reaching out to a friend, family member, or joining an online community with shared interests? Small connections can spark bigger ones.";
    }

    if (lowerMessage.includes('angry') || lowerMessage.includes('mad')) {
      return "Anger often shows up when we feel hurt or unheard. 🔥 Your feelings are valid. Have you tried expressing this through physical movement, journaling, or creative outlets? Sometimes anger needs a healthy way to move through us.";
    }

    if (lowerMessage.includes('thank') || lowerMessage.includes('better')) {
      return "I'm so glad you're feeling a bit better! 🌟 That takes strength. Remember this feeling - you have the ability to work through difficult emotions. What helped you feel better today? It's worth remembering for next time.";
    }

    // Default supportive responses
    const defaultResponses = [
      "Thank you for sharing that with me. 💙 Your feelings are completely valid. What do you think might help you feel a little bit better right now?",
      "I'm here to listen without judgment. 🌸 It sounds like you're going through something challenging. What's one small thing that usually brings you comfort?",
      "You're being really brave by reaching out and sharing. 🌱 Sometimes just talking about what we're feeling can help. How long have you been feeling this way?",
      "I hear you, and I want you to know that your feelings matter. 💜 Have you been able to take care of your basic needs today - eating, sleeping, staying hydrated?",
      "It's okay to not be okay sometimes. 🫂 You don't have to carry everything alone. Is there anyone in your life you feel comfortable talking to about this?"
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = getAIResponse(inputValue);
      const isCrisisResponse = detectCrisis(inputValue);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
        isCrisis: isCrisisResponse
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-peaceful pb-20">
      <div className="max-w-md mx-auto flex flex-col h-screen">
        {/* Header */}
        <div className="flex items-center gap-3 p-4 bg-card/80 backdrop-blur-sm border-b border-border/60">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/home')}
            className="p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-calm rounded-full flex items-center justify-center">
              <Bot className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-semibold text-foreground">AI Support</h1>
              <p className="text-xs text-muted-foreground">Always here to listen</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === 'user' 
                    ? 'bg-primary' 
                    : message.isCrisis 
                      ? 'bg-destructive' 
                      : 'bg-accent'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="h-4 w-4 text-primary-foreground" />
                  ) : message.isCrisis ? (
                    <AlertTriangle className="h-4 w-4 text-destructive-foreground" />
                  ) : (
                    <Bot className="h-4 w-4 text-accent-foreground" />
                  )}
                </div>
                <Card className={`p-3 ${
                  message.sender === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : message.isCrisis 
                      ? 'bg-destructive/10 border-destructive/30' 
                      : 'bg-card shadow-gentle'
                }`}>
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </Card>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex gap-2 max-w-[80%]">
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                  <Bot className="h-4 w-4 text-accent-foreground" />
                </div>
                <Card className="p-3 bg-card shadow-gentle">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-gentle-pulse" />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-gentle-pulse" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-gentle-pulse" style={{ animationDelay: '0.4s' }} />
                  </div>
                </Card>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-card/80 backdrop-blur-sm border-t border-border/60">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share what's on your mind..."
              className="flex-1"
              disabled={isTyping}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="px-3 bg-gradient-calm hover:shadow-gentle"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Remember: This is not a replacement for professional help 💙
          </p>
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default AIChat;