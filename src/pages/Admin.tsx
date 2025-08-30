import React, { useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useSorteador } from '@/contexts/SorteadorContext';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Save, Trash2, Shield } from 'lucide-react';

const Admin = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [tempResult, setTempResult] = useState('');
  const [enablePredefined, setEnablePredefined] = useState(false);
  const { predefinedResult, setPredefinedResult, isAdmin, setIsAdmin } = useSorteador();
  const { toast } = useToast();

  const ADMIN_PASSWORD = 'admin123'; // In a real app, this would be more secure

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setEnablePredefined(predefinedResult !== null);
      setTempResult(predefinedResult?.toString() || '');
      toast({
        title: "Login realizado!",
        description: "Bem-vindo ao painel administrativo.",
      });
    } else {
      toast({
        title: "Senha incorreta",
        description: "Verifique a senha e tente novamente.",
        variant: "destructive"
      });
    }
  };

  const handleSaveResult = () => {
    if (!enablePredefined) {
      setPredefinedResult(null);
      toast({
        title: "Resultado removido",
        description: "O sorteio voltará a ser totalmente aleatório.",
      });
      return;
    }

    const num = parseInt(tempResult);
    if (isNaN(num) || num < 1 || num > 10000) {
      toast({
        title: "Número inválido",
        description: "O número deve estar entre 1 e 10.000.",
        variant: "destructive"
      });
      return;
    }

    setPredefinedResult(num);
    toast({
      title: "Resultado definido!",
      description: `O próximo sorteio mostrará o número ${num}.`,
    });
  };

  const handleClearResult = () => {
    setTempResult('');
    setEnablePredefined(false);
    setPredefinedResult(null);
    toast({
      title: "Resultado limpo",
      description: "O sorteio voltará a ser totalmente aleatório.",
    });
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setPassword('');
    toast({
      title: "Logout realizado",
      description: "Você saiu do painel administrativo.",
    });
  };

  return (
    <div className="min-h-screen particles-bg">
      <Header />
      
      <main className="container mx-auto px-6 py-12">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
          
          {!isAdmin ? (
            <Card className="w-full max-w-md glass-morphism border-white/30">
              <CardHeader className="text-center">
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-2xl">Painel Administrativo</CardTitle>
                <CardDescription>
                  Digite a senha para acessar o controle de resultados
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Senha de Administrador</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Digite a senha..."
                      className="pr-10"
                      onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                <Button onClick={handleLogin} className="w-full">
                  Entrar
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  <p>Senha padrão: admin123</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="w-full max-w-2xl glass-morphism border-white/30">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Shield className="h-6 w-6 text-primary" />
                      Controle de Resultados
                    </CardTitle>
                    <CardDescription>
                      Configure resultados predefinidos para os sorteios
                    </CardDescription>
                  </div>
                  <Button variant="outline" onClick={handleLogout}>
                    Sair
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Status atual */}
                <div className="p-4 rounded-lg bg-muted/50">
                  <h3 className="font-semibold mb-2">Status Atual</h3>
                  <p className="text-sm">
                    {predefinedResult ? (
                      <span className="text-primary font-medium">
                        Resultado predefinido: {predefinedResult}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">
                        Sorteio totalmente aleatório
                      </span>
                    )}
                  </p>
                </div>

                {/* Controles */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Ativar Resultado Predefinido</Label>
                      <p className="text-sm text-muted-foreground">
                        Quando ativado, o sorteio sempre mostrará o número especificado
                      </p>
                    </div>
                    <Switch
                      checked={enablePredefined}
                      onCheckedChange={setEnablePredefined}
                    />
                  </div>

                  {enablePredefined && (
                    <div className="space-y-2">
                      <Label htmlFor="result">Número do Resultado (1-10000)</Label>
                      <Input
                        id="result"
                        type="number"
                        min="1"
                        max="10000"
                        value={tempResult}
                        onChange={(e) => setTempResult(e.target.value)}
                        placeholder="Digite o número que será sorteado..."
                      />
                    </div>
                  )}
                </div>

                {/* Botões de ação */}
                <div className="flex gap-4">
                  <Button onClick={handleSaveResult} className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Salvar Configuração
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={handleClearResult}
                    className="flex items-center gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Limpar
                  </Button>
                </div>

                {/* Instruções */}
                <div className="text-sm text-muted-foreground space-y-2 border-t pt-4">
                  <h4 className="font-medium">Como usar:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Ative o resultado predefinido e digite um número</li>
                    <li>O resultado só será usado se estiver no intervalo do sorteio</li>
                    <li>Caso contrário, será usado um número aleatório</li>
                    <li>Desative para voltar ao sorteio totalmente aleatório</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Admin;