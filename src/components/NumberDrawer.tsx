import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSorteador } from '@/contexts/SorteadorContext';
import { useToast } from '@/hooks/use-toast';

interface NumberDrawerProps {
  onStartDraw: (min: number, max: number) => void;
  isDrawing: boolean;
}

const NumberDrawer: React.FC<NumberDrawerProps> = ({ onStartDraw, isDrawing }) => {
  const [minNumber, setMinNumber] = useState(1);
  const [maxNumber, setMaxNumber] = useState(100);
  const { predefinedResult } = useSorteador();
  const { toast } = useToast();

  const handleDraw = () => {
    if (minNumber < 1 || maxNumber > 10000 || minNumber >= maxNumber) {
      toast({
        title: "Erro nos números",
        description: "O número mínimo deve ser 1, máximo 10000, e mínimo deve ser menor que máximo.",
        variant: "destructive"
      });
      return;
    }

    onStartDraw(minNumber, maxNumber);
  };

  return (
    <Card className="w-full max-w-lg glass-morphism border-white/30">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-foreground">
          Sortear <span className="text-primary">1</span> número
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-center space-x-4 text-lg">
          <span className="text-foreground font-medium">entre</span>
          <div className="space-y-1">
            <Label htmlFor="min" className="text-sm text-muted-foreground">
              Mínimo
            </Label>
            <Input
              id="min"
              type="number"
              min="1"
              max="10000"
              value={minNumber}
              onChange={(e) => setMinNumber(parseInt(e.target.value) || 1)}
              className="w-20 text-center bg-input border-input-border"
              disabled={isDrawing}
            />
          </div>
          <span className="text-foreground font-medium">e</span>
          <div className="space-y-1">
            <Label htmlFor="max" className="text-sm text-muted-foreground">
              Máximo
            </Label>
            <Input
              id="max"
              type="number"
              min="2"
              max="10000"
              value={maxNumber}
              onChange={(e) => setMaxNumber(parseInt(e.target.value) || 100)}
              className="w-20 text-center bg-input border-input-border"
              disabled={isDrawing}
            />
          </div>
        </div>

        <Button
          onClick={handleDraw}
          disabled={isDrawing}
          className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary-dark text-primary-foreground animate-pulse-glow"
        >
          {isDrawing ? 'SORTEANDO...' : 'SORTEAR AGORA!'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default NumberDrawer;