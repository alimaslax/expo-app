import { appStateStorage, appStorageId } from 'src/services/mmkv';
import { IAppStore, Theme } from 'src/shared/types/IAppStore';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';


export const useAppStore = create<IAppStore>()(
  persist(
    (set) => ({
      user: '',
      theme: 'system',
      reset: () => {
        set({
          user: '',
          theme: 'system',
        });
      },
      resetUser: () => {
        set({ user: ''});
      },
      setUser: (user: string) => {
        set({ user });
      },
      setTheme: (theme: Theme) => {
        set({ theme });
      },
    }),
    {
      name: appStorageId, // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => appStateStorage), // custom mmkv storage
    }
  )
);
