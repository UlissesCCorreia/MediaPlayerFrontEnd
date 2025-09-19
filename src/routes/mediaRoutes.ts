// src/api/mediaRoutes.ts
import axios, { AxiosResponse } from 'axios';

// Tipagem para um item de mídia
export interface MediaItem {
  isActive: undefined;
  mediaUpload: string;
  description: string;
  name: string;
  id?: number;
  Name: string;
  Description: string;
  MediaUpload: string;
  Active: boolean;
}

const BASE_URL = 'https://localhost:7008/api/Media';

// Buscar todas as mídias
export const getAllMedia = (): Promise<AxiosResponse<MediaItem[]>> =>
  axios.get(BASE_URL);

// Buscar uma mídia por ID
export const getMediaById = (id: number): Promise<AxiosResponse<MediaItem>> =>
  axios.get(`${BASE_URL}/${id}`);

// Criar uma nova mídia
export const createMedia = (media: Omit<MediaItem, 'id'>): Promise<AxiosResponse<MediaItem>> =>
  axios.post(`${BASE_URL}?Name=${media.Name}&Description=${media.Description}&MediaUpload=${media.MediaUpload}&Active=${media.Active}`);

// Atualizar uma mídia existente
export const updateMedia = (
  id: number,
  media: Partial<MediaItem>
): Promise<AxiosResponse<MediaItem>> => {
  return axios.put(
    `${BASE_URL}?MediaNumber=${id}&Name=${media.Name}&Description=${media.Description}&MediaUpload=${media.MediaUpload}&Active=${media.Active}`
  );
};