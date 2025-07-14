import { createContext, useContext, useState, useEffect } from 'react';

const VisitorContext = createContext();

export function VisitorProvider({ children }) {
  const [visitorType, setVisitorType] = useState(() => {
    return localStorage.getItem('visitorType') || null;
  });

  useEffect(() => {
    if (visitorType) {
      localStorage.setItem('visitorType', visitorType);
    }
  }, [visitorType]);

  // Clear theme override if visitorType changes
  useEffect(() => {
    if (visitorType) {
      localStorage.removeItem('themeOverride');
    }
  }, [visitorType]);

  return (
    <VisitorContext.Provider value={{ visitorType, setVisitorType }}>
      {children}
    </VisitorContext.Provider>
  );
}

export function useVisitor() {
  return useContext(VisitorContext);
}
