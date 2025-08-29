import { Button } from '@/components/ui/button';
import { LifeBuoy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CrisisButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate('/support')}
      className="fixed bottom-24 right-4 w-14 h-14 rounded-full bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-floating border-0 z-50 animate-gentle-pulse"
      aria-label="Crisis Support - Get help now"
    >
      <LifeBuoy className="h-6 w-6" />
    </Button>
  );
};