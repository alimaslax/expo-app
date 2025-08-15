import { VideoView, useVideoPlayer } from 'expo-video';
import { useEventListener } from 'expo';
import { useMemo, useState, useEffect } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';

type Props = {
  onLoaded: () => void;
  onFinish: () => void;
};

/**
 * load video playback asset as splash screen
 */
export function SplashVideo({ onLoaded, onFinish }: Props) {
  const { width } = useWindowDimensions();
  const [hasLoaded, setHasLoaded] = useState(false);

  const isTablet = useMemo(() => width >= 768, [width]);
  const source = useMemo(
    () =>
      isTablet ? require('../../assets/splash-tablet.mp4') : require('../../assets/splash.mp4'),
    [isTablet]
  );

  const player = useVideoPlayer(source, (player) => {
    player.loop = false;
    player.play();
  });

  useEventListener(player, 'statusChange', ({ status }) => {
    if (status === 'readyToPlay' && !hasLoaded) {
      setHasLoaded(true);
      onLoaded();
    }
  });

  useEventListener(player, 'playToEnd', () => {
    onFinish();
  });

  return (
    <VideoView
      style={StyleSheet.absoluteFill}
      player={player}
      contentFit="cover"
    />
  );
}
