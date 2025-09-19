import axios, { AxiosResponse } from 'axios';

// Tipagem para MediaPlaylist
export interface MediaPlaylistItem {
  id?: number;
  mediaId: number;
  playlistId: number;
  isMediaDisplayable: boolean;
  isActive: boolean;
  media?: {
    id: number;
    name: string;
    description: string;
    mediaUpload: string;
  };
}

const BASE_URL = 'https://localhost:7008/api/MediaPlaylist';

// Criar um novo vínculo entre mídia e playlist
export const createMediaPlaylist = (
  mediaPlaylist: Omit<MediaPlaylistItem, 'id'>
): Promise<AxiosResponse<MediaPlaylistItem>> =>
  axios.post(
    `${BASE_URL}?PlaylistNumber=${mediaPlaylist.playlistId}&MediaNumber=${mediaPlaylist.mediaId}&Displayable=${mediaPlaylist.isMediaDisplayable}&Active=${mediaPlaylist.isActive}`
  );

// Buscar todos os vínculos (opcional)
export const getAllMediaPlaylists = (): Promise<AxiosResponse<MediaPlaylistItem[]>> =>
  axios.get(BASE_URL);

// Buscar vínculos por playlist específica
export const getMediaPlaylistsByPlaylistId = (
  playlistId: number
): Promise<AxiosResponse<MediaPlaylistItem[]>> =>
  axios.get(`${BASE_URL}/?PlaylistNumber=${playlistId}&MediaNumber=0&Displayable=true`);