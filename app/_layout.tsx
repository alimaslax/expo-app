import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';


import { SplashScreenWrapper } from '#bootstrap/splash-screen/wrapper';
import { useI18nContext } from '#i18n/i18n-react';
import { AppI18nProvider } from 'src/providers/i18n/provider';
import { AppQueryProvider } from 'src/providers/query/provider';
import { AppNavigationProvider } from 'src/providers/navigation/provider';
import { AppToastProvider } from 'src/providers/toast/provider';
import { AppTamaguiProvider } from 'src/providers/tamagui/provider';

// Instruct SplashScreen not to hide yet, we want to do this manually
SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
});

function App() {
  const { LL } = useI18nContext();

  return (
    <Stack initialRouteName="(tabs)">
      <Stack.Screen
        name="login"
        options={{
          title: LL.forms.login(),
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <SplashScreenWrapper>
      <AppI18nProvider>
        <AppQueryProvider>
          <AppTamaguiProvider>
            <AppNavigationProvider>
              <AppToastProvider>
                <App />
              </AppToastProvider>
            </AppNavigationProvider>
          </AppTamaguiProvider>
        </AppQueryProvider>
      </AppI18nProvider>
    </SplashScreenWrapper>
  );
}
