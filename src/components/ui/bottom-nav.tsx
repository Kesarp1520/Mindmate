import { Home, Heart, MessageCircle, Palette, LifeBuoy } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  path: string;
  emoji: string;
}

const navItems: NavItem[] = [
  { icon: Home, label: 'Home', path: '/home', emoji: '🏠' },
  { icon: Heart, label: 'Mood', path: '/mood', emoji: '😊' },
  { icon: MessageCircle, label: 'Chat', path: '/chat', emoji: '🤖' },
  { icon: Palette, label: 'Create', path: '/creative', emoji: '✨' },
  { icon: LifeBuoy, label: 'Support', path: '/support', emoji: '🆘' }
];

export const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border/60 shadow-warm z-50">
      <div className="flex justify-around items-center py-2 px-4 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-300",
                "hover:bg-primary/10 hover:scale-105 active:scale-95",
                isActive ? "bg-primary/20 text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className="relative mb-1">
                <Icon className="h-5 w-5" />
                {isActive && (
                  <div className="absolute -top-1 -right-1 text-xs">
                    {item.emoji}
                  </div>
                )}
              </div>
              <span className="text-xs font-medium">{item.label}</span>
              {isActive && (
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};