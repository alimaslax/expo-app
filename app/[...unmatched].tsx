import { Link, Stack } from 'expo-router';
import { H1, YStack } from 'tamagui';

import { useI18nContext } from '#i18n/i18n-react';
import { useAppStore } from 'src/shared/hooks/store/useAppStore';
import { BaseButton } from 'src/shared/components/button/base-button';

export default function Unmatched() {
  const { LL } = useI18nContext();
  const user = useAppStore((state) => state.user);

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />

      <YStack f={1} ai="center" jc="center" p={5}>
        <H1 className="text-2xl font-bold">{LL.auth.notFound404()}</H1>

        <Link href={user ? '/home' : '/login'} replace asChild>
          <BaseButton mt="$2">{LL.auth.backTo({ isLoggedIn: user ? 'true' : 'false' })}</BaseButton>
        </Link>
      </YStack>
    </>
  );
}
