import { Toast, useToastState } from '@tamagui/toast';
import { ToastCustomData } from 'src/shared/types/IComponent';
import { ThemeName } from 'tamagui';


const themeMapper: Record<ToastCustomData['preset'], ThemeName> = {
  default: 'Card',
  primary: 'purple_Card',
  secondary: 'pink_Card',
  success: 'green_Card',
  error: 'red_Card',
  warning: 'yellow_Card',
  info: 'blue_Card',
};

export function TheToast() {
  const currentToast = useToastState();

  if (!currentToast || currentToast.isHandledNatively) {
    return null;
  }

  return (
    <Toast
      theme={themeMapper[(currentToast.customData as ToastCustomData)?.preset ?? 'default']}
      key={currentToast.id}
      duration={currentToast.duration}
      viewportName={currentToast.viewportName}
      enterStyle={{ opacity: 0, scale: 0.25, y: 25 }}
      exitStyle={{ opacity: 0, scale: 0.5, y: 25 }}
      opacity={1}
      scale={1}
      y={-15}
      animation="bouncy">
      <Toast.Title>{currentToast.title}</Toast.Title>
      {!!currentToast.message && <Toast.Description>{currentToast.message}</Toast.Description>}
    </Toast>
  );
}
