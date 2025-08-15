import { Link } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { H2, Paragraph, ScrollView, styled } from 'tamagui';

import { useI18nContext } from '#i18n/i18n-react';
import { WrapTranslation } from 'src/shared/components/i18n/wrap-translation';
import { LoginForm } from 'src/components/Login/LoginForm';

const SAV = styled(SafeAreaView, {
  name: 'SAV',
  f: 1,
  px: '$5',
  jc: 'center',
});

export default function LoginScreen() {
  const { LL } = useI18nContext();

  return (
    <ScrollView>
      <SAV>
        <H2 ta="center">{LL.auth.welcome()}</H2>

        <LoginForm />

        <Paragraph ta="center" mt="$2">
          <WrapTranslation message={LL.auth.registerHere()}>
            {(infix) => <Link href="/register"> {infix}</Link>}
          </WrapTranslation>
        </Paragraph>
      </SAV>
    </ScrollView>
  );
}
