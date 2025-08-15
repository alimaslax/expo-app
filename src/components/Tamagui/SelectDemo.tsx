import Feather from '@expo/vector-icons/Feather';
import { useMemo, useState } from 'react';
import { Adapt, Label, Select, SelectProps, Sheet, XStack, YStack, getFontSize } from 'tamagui';
import { LinearGradient } from 'tamagui/linear-gradient';

const items = [
  { name: 'Apple' },
  { name: 'Pear' },
  { name: 'Blackberry' },
  { name: 'Peach' },
  { name: 'Apricot' },
  { name: 'Melon' },
  { name: 'Honeydew' },
  { name: 'Starfruit' },
];

/**
 * Note that Select only works on Native using the Adapt component to adapt it to a Sheet. See below for docs.
 */
export function SelectDemo() {
  return (
    <YStack space>
      <XStack ai="center" space>
        <Label f={1} fb={0}>
          Custom
        </Label>

        <SelectDemoItem />
      </XStack>
      <XStack ai="center" space>
        <Label f={1} fb={0}>
          Native
        </Label>

        <SelectDemoItem native />
      </XStack>
    </YStack>
  );
}

export function SelectDemoItem(props: SelectProps) {
  const [val, setVal] = useState('apple');

  return (
    <Select id="food" value={val} onValueChange={setVal} disablePreventBodyScroll {...props}>
      <Select.Trigger width={220} iconAfter={<Feather name="chevrons-down" />}>
        <Select.Value placeholder="Something" />
      </Select.Trigger>

      {/* This is the only way to render a Select on Native for now, as mobile apps tend to show Select
      very differently from web and Tamagui wants to present the right abstractions for each
      platform. */}
      <Adapt when="sm" platform="touch">
        <Sheet
          native={!!props.native}
          modal
          dismissOnSnapToBottom
          animationConfig={{
            type: 'spring',
            damping: 20,
            mass: 1.2,
            stiffness: 250,
          }}>
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>

          <Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
        </Sheet>
      </Adapt>

      <Select.Content zIndex={200000}>
        <Select.ScrollUpButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3">
          <YStack zIndex={10}>
            <Feather name="chevrons-up" size={20} />
          </YStack>

          <LinearGradient
            start={[0, 0]}
            end={[0, 1]}
            fullscreen
            colors={['$background', 'transparent']}
            borderRadius="$4"
          />
        </Select.ScrollUpButton>
        <Select.Viewport
          // to do animations:
          animation="quick"
          animateOnly={['transform', 'opacity']}
          enterStyle={{ o: 0, y: -10 }}
          exitStyle={{ o: 0, y: 10 }}
          minWidth={200}>
          <Select.Group>
            <Select.Label>Fruits</Select.Label>

            {/* for longer lists memoizing these is useful */}
            {useMemo(
              () =>
                items.map((item, i) => {
                  return (
                    <Select.Item index={i} key={item.name} value={item.name.toLowerCase()}>
                      <Select.ItemText>{item.name}</Select.ItemText>

                      <Select.ItemIndicator marginLeft="auto">
                        <Feather name="check" size={16} />
                      </Select.ItemIndicator>
                    </Select.Item>
                  );
                }),
              []
            )}
          </Select.Group>

          {/* Native gets an extra icon */}
          {props.native && (
            <YStack
              position="absolute"
              right={0}
              top={0}
              bottom={0}
              alignItems="center"
              justifyContent="center"
              width="$4"
              pointerEvents="none">
              <Feather name="chevron-down" size={getFontSize((props.size ?? '$true') as any)} />
            </YStack>
          )}
        </Select.Viewport>
        <Select.ScrollDownButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3">
          <YStack zIndex={10}>
            <Feather name="chevron-down" size={20} />
          </YStack>

          <LinearGradient
            start={[0, 0]}
            end={[0, 1]}
            fullscreen
            colors={['transparent', '$background']}
            borderRadius="$4"
          />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select>
  );
}
