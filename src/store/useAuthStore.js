import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { fetchMe } from '~/services/auth';

const useAuthStore = create(
    devtools(
        immer((set, get) => ({
            user: undefined,
            isLoading: false,
            isLoaded: false,
            isLoggedIn: () => !!get().user,
            setUser: (data) => {
                const { user, accessToken, refreshToken } = data;

                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);

                return set((state) => {
                    state.user = user;
                });
            },
            getMe: async () => {
                set((state) => {
                    state.isLoading = true;
                });
                try {
                    const response = await fetchMe();
                    set((state) => {
                        state.user = response.data.data;
                    });
                } catch (e) {
                } finally {
                    set((state) => {
                        state.isLoading = false;
                        state.isLoaded = true;
                    });
                }
            },
        }))
    )
);

export default useAuthStore;
