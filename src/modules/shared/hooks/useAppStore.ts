import { z } from 'zod';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { loginApiSuccessResponseSchema } from '#auth/schemas/login';
import { appStateStorage, appStorageId } from '#shared/services/mmkv';

export type AppStoreState = z.infer<typeof appStoreStateSchema>;
type AppStore = z.infer<typeof appStoreSchema>;

const appStoreStateSchema = z.object({
  user: loginApiSuccessResponseSchema.nullable(),
  theme: z.enum(['system', 'light', 'dark']),
});
const appStoreActionSchema = z.object({
  reset: z.function({
  input: [], // parameters (must be an array or a ZodTuple)
  output: z.void()  // return type
}),
  resetUser: z.function({
  input: [], // parameters (must be an array or a ZodTuple)
  output: z.void()  // return type
}),
  setUser: z.function({
  input: [loginApiSuccessResponseSchema], // parameters (must be an array or a ZodTuple)
  output: z.void()  // return type
}),
  setTheme:z.function({
  input: [appStoreStateSchema.shape.theme], // parameters (must be an array or a ZodTuple)
  output: z.void()  // return type
}),
});
const appStoreSchema = appStoreStateSchema.merge(appStoreActionSchema);

/**
 * app store state default values
 */
export const appStoreStateDefaultValues: AppStoreState = {
  user: null,
  theme: 'system',
};

/**
 * Hooks to manipulate global app store that integrated with MMKV
 *
 * @example
 *
 * ```tsx
 * const user = useAppStore(state => state.user)
 * const setUser = useAppStore(state => state.setUser)
 * ```
 */
export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      user: appStoreStateDefaultValues.user,
      theme: appStoreStateDefaultValues.theme,

      reset: () => {
        set(appStoreStateDefaultValues);
      },
      resetUser: () => {
        set({ user: appStoreStateDefaultValues.user });
      },
      setUser: (user) => {
        set({ user });
      },
      setTheme: (theme) => {
        set({ theme });
      },
    }),
    {
      name: appStorageId, // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => appStateStorage), // custom mmkv storage
    }
  )
);
