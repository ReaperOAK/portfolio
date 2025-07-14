import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { themes } from '../themes';
import { useVisitor } from './VisitorContext';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const { visitorType } = useVisitor();
  // Check for theme override in localStorage
  const getInitialTheme = () => {
    const override = localStorage.getItem('themeOverride');
    if (override) return override;
    return visitorType || 'recruiter';
  };
  const [theme, setTheme] = useState(getInitialTheme);

  // Sync theme with visitorType unless overridden
  useEffect(() => {
    const override = localStorage.getItem('themeOverride');
    if (!override && visitorType) {
      setTheme(visitorType);
    }
  }, [visitorType]);

  // Persist theme override if user toggles theme
  const setThemeWithOverride = (newTheme, isOverride = false) => {
    setTheme(newTheme);
    if (isOverride) {
      localStorage.setItem('themeOverride', newTheme);
    } else {
      localStorage.removeItem('themeOverride');
    }
  };

  // Optionally, inject CSS variables for dynamic theming
  useEffect(() => {
    const vars = themes[theme];
    if (vars) {
      Object.entries(vars).forEach(([key, value]) => {
        if (key !== 'gradient') {
          document.documentElement.style.setProperty(`--${key}`, value);
        }
      });
    }
  }, [theme]);

  const value = useMemo(() => ({
    theme,
    setTheme: setThemeWithOverride,
    themeVars: themes[theme],
  }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
