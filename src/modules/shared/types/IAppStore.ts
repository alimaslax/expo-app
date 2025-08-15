
export type Theme = 'system' | 'light' | 'dark';

export interface IAppStore {
  user?: string;
  theme: Theme;
  reset: () => void;
  resetUser: () => void;
  setUser: (user: string) => void;
  setTheme: (theme: Theme) => void;
}
