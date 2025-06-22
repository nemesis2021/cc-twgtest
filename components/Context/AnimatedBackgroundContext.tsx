import { ReactNode, createContext, useContext, useMemo, useState } from 'react';
import { alpha } from '@mui/system';
import theme from '../../styles/theme/theme';

type DataContextType = {
  color: string;
  setColor: (color: string) => void;
  reset: () => void;
};

const initialData = {
  color: alpha(theme.palette.common.white, 0),
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export function AnimatedBackgroundProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [color, setColor] = useState<string>(initialData.color);

  const reset = () => {
    setColor(initialData.color);
  };

  const value = useMemo(() => ({ color, setColor, reset }), [color, setColor]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useAnimatedBackground(): DataContextType {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error(
      'useAnimatedBackground must be used within a AnimatedBackgroundProvider',
    );
  }
  return context;
}
