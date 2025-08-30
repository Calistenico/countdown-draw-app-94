import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

const Header = () => {
  const location = useLocation();

  return (
    <header className="w-full py-4 px-6 bg-card/50 backdrop-blur-md border-b border-border/20">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="text-3xl font-black text-primary">
            SORTEADOR
          </div>
          <div className="text-sm text-primary-light font-semibold">
            .COM.BR
          </div>
        </Link>

        <nav className="flex items-center space-x-6">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === '/' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Sorteio de Números
          </Link>
          
          <Link
            to="/admin"
            className="flex items-center space-x-2"
          >
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Admin
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;