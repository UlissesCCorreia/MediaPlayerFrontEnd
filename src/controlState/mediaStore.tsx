import { create } from 'zustand';
import * as mediaRoutes from '../routes/mediaRoutes.ts';
import { MediaItem } from '../routes/mediaRoutes.ts';

// Tipos para os dados
interface MediaStoreState {
  mediaList: MediaItem[];
  loading: boolean;
  error: Error | null;

  fetchMedia: () => Promise<void>;
  fetchMediaById: (id: string) => Promise<MediaItem | null>;
  addMedia: (media: Omit<MediaItem, "id">) => Promise<void>;
  updateMedia: (id: string, media: Partial<MediaItem>) => Promise<void>;
}

const useMediaStore = create<MediaStoreState>((set, get) => ({
  mediaList: [],
  loading: false,
  error: null,

  fetchMedia: async () => {
    set({ loading: true });
    try {
      const response = await mediaRoutes.getAllMedia();
      set({
        mediaList: response.data,
        error: null,
      });
    } catch (error) {
      set({ error: error instanceof Error ? error : new Error(String(error)) });
    } finally {
      set({ loading: false });
    }
  },

  addMedia: async (media: Omit<MediaItem, "id">) => {
    set({ loading: true });
    try {
      const response = await mediaRoutes.createMedia(media);
      set((state) => ({
        mediaList: [...state.mediaList, response.data],
        error: null,
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error : new Error(String(error)) });
    } finally {
      set({ loading: false });
    }
  },

  fetchMediaById: async (id: string) => {
    set({ loading: true });
    try {
      const response = await mediaRoutes.getMediaById(parseInt(id));
      set({ error: null });
      return response.data;
    } catch (error) {
      set({ error: error instanceof Error ? error : new Error(String(error)) });
      return null;
    } finally {
      set({ loading: false });
    }
  },

  updateMedia: async (id, media) => {
    try {
      console.log(`Updating media ID: ${id} with data:`, media);
      await mediaRoutes.updateMedia(parseInt(id), media);
      await get().fetchMedia();
    } catch (err) {
      set({ error: err instanceof Error ? err : new Error(String(err)) });
    }
  },
}));

export default useMediaStore;