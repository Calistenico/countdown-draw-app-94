import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SorteadorContextType {
  predefinedResult: number | null;
  setPredefinedResult: (result: number | null) => void;
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
}

const SorteadorContext = createContext<SorteadorContextType | undefined>(undefined);

interface SorteadorProviderProps {
  children: ReactNode;
}

export const SorteadorProvider: React.FC<SorteadorProviderProps> = ({ children }) => {
  const [predefinedResult, setPredefinedResult] = useState<number | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <SorteadorContext.Provider
      value={{
        predefinedResult,
        setPredefinedResult,
        isAdmin,
        setIsAdmin,
      }}
    >
      {children}
    </SorteadorContext.Provider>
  );
};

export const useSorteador = () => {
  const context = useContext(SorteadorContext);
  if (context === undefined) {
    throw new Error('useSorteador must be used within a SorteadorProvider');
  }
  return context;
};