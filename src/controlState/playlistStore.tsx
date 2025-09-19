import { create } from 'zustand';
import * as playlistRoutes from '../routes/playlistRoutes.ts';

// Tipagem da playlist
export interface Playlist {
  playlistNumber: number;
  playlistName: string;
  active: boolean;
  message: string;
}

// Tipagem do estado e ações
interface PlaylistStoreState {
  playlistList: Playlist[];
  loading: boolean;
  error: Error | null;

  fetchPlaylists: () => Promise<void>;
  addPlaylist: (playlist: Omit<Playlist, "id">) => Promise<void>;
}

const usePlaylistStore = create<PlaylistStoreState>((set) => ({
  playlistList: [],
  loading: false,
  error: null,

  fetchPlaylists: async () => {
    set({ loading: true });
    try {
      console.log('Buscando playlists...');
      const response = await playlistRoutes.getAllPlaylists();
      console.log('Playlists recebidas:', response.data);
      const playlists = response.data
        .map((item: any) => ({
          playlistNumber: item.playlistNumber,
          playlistName: item.playlistName,
          active: item.active,
          message: item.message,
        }));
      set({
        playlistList: playlists,
        error: null,
      });
      console.log('Playlists carregadas:', playlists);
    } catch (error) {
      set({ error: error as Error });
    } finally {
      set({ loading: false });
    }
  },

  addPlaylist: async (playlist: Omit<Playlist, "id">) => {
    set({ loading: true });
    try {
      const requestBody = { playlistName: playlist.playlistName };
      console.log('Enviando playlist:', requestBody);
      const response = await playlistRoutes.createPlaylist(requestBody);  
      set((state) => ({
        playlistList: [
          ...state.playlistList,
          {
            playlistNumber: response.data.id as number,
            playlistName: response.data.name as string,
            active: 'active' in response.data ? Boolean(response.data.active) : false,
            message: 'message' in response.data ? String(response.data.message) : '',
          },
        ],
        error: null,
      }));
    } catch (error) {
      set({ error: error as Error });
    } finally {
      set({ loading: false });
    }
  },
}));

export default usePlaylistStore;