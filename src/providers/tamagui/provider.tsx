import { useColorScheme } from 'react-native';
import { useAppStore } from 'src/shared/hooks/store/useAppStore';
import { TamaguiProvider, TamaguiProviderProps } from 'tamagui';


import config from 'tamagui.config';

/**
 * Tamagui provider where we apply the `tamagui.config`.
 */
export function AppTamaguiProvider({ children, ...rest }: Omit<TamaguiProviderProps, 'config'>) {
  const scheme = useColorScheme();
  const theme = useAppStore((state) => state.theme);

  return (
    <TamaguiProvider
      disableInjectCSS
      config={config}
      defaultTheme={theme === 'system' ? (scheme as string) : theme}
      {...rest}>
      {children}
    </TamaguiProvider>
  );
}
