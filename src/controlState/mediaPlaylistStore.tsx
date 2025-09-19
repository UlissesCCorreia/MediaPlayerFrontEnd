import { create } from 'zustand';
import * as mediaPlaylistRoutes from '../routes/mediaPlaylistRoutes.ts';
import type { MediaPlaylistItem } from '../routes/mediaPlaylistRoutes.ts';

interface MediaPlaylistStoreState {
  mediaPlaylistList: MediaPlaylistItem[];
  loading: boolean;
  error: Error | null;

  fetchMediaPlaylists: () => Promise<void>;
  fetchMediaPlaylistsByPlaylistId: (playlistId: number) => Promise<MediaPlaylistItem[]>;
  addMediaToPlaylist: (data: Omit<MediaPlaylistItem, 'id'>) => Promise<void>;
}

const useMediaPlaylistStore = create<MediaPlaylistStoreState>((set) => ({
  mediaPlaylistList: [],
  loading: false,
  error: null,

  fetchMediaPlaylists: async () => {
    set({ loading: true });
    try {
      const response = await mediaPlaylistRoutes.getAllMediaPlaylists();
      set({
        mediaPlaylistList: response.data,
        error: null,
      });
    } catch (error) {
      set({ error: error as Error });
    } finally {
      set({ loading: false });
    }
  },

  fetchMediaPlaylistsByPlaylistId: async (playlistId: number) => {
    try {
      const response = await mediaPlaylistRoutes.getMediaPlaylistsByPlaylistId(playlistId);
      console.log('Resposta da API de mídias da playlist:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar mídias da playlist:', error);
      return [];
    }
  },


addMediaToPlaylist: async (data: Omit<MediaPlaylistItem, 'id'>) => {
  set({ loading: true });
  try {
    const response = await mediaPlaylistRoutes.createMediaPlaylist(data);
    set((state) => ({
      mediaPlaylistList: [...state.mediaPlaylistList, response.data], // <-- Corrigido: adiciona o item diretamente
      error: null,
    }));
  } catch (error) {
    set({ error: error as Error });
    console.error('Erro ao adicionar mídia à playlist:', error);
  } finally {
    set({ loading: false });
  }
},
}));



export default useMediaPlaylistStore;