import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RotateCcw, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ResultDisplayProps {
  result: number;
  onNewDraw: () => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, onNewDraw }) => {
  const { toast } = useToast();

  const shareResult = () => {
    const url = window.location.href;
    const text = `🎲 Resultado do sorteio: ${result}! Faça o seu sorteio em: ${url}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Resultado do Sorteio',
        text: text,
        url: url,
      });
    } else {
      navigator.clipboard.writeText(text);
      toast({
        title: "Resultado copiado!",
        description: "O resultado foi copiado para a área de transferência.",
      });
    }
  };

  return (
    <div className="text-center space-y-6">
      <Card className="glass-morphism border-white/30 p-8">
        <CardContent className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">
            🎉 Resultado do Sorteio
          </h2>
          <div className="result-text animate-bounce-in">
            {result}
          </div>
          <p className="text-muted-foreground">
            Parabéns! Este foi o número sorteado.
          </p>
        </CardContent>
      </Card>

      <div className="flex gap-4 justify-center">
        <Button 
          onClick={onNewDraw}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Novo Sorteio</span>
        </Button>
        
        <Button 
          onClick={shareResult}
          className="flex items-center space-x-2 bg-success hover:bg-success/90"
        >
          <Share2 className="h-4 w-4" />
          <span>Compartilhar</span>
        </Button>
      </div>
    </div>
  );
};

export default ResultDisplay;