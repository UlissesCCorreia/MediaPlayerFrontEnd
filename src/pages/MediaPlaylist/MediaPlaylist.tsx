import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, List, Button, Typography, message, Switch, Row, Col } from 'antd';

import useMediaStore from '../../controlState/mediaStore.tsx';
import useMediaPlaylistStore from '../../controlState/mediaPlaylistStore.tsx';

const { Title } = Typography;

const MediaPlayList: React.FC = () => {
  const { playlistId } = useParams<{ playlistId: string }>();
  const navigate = useNavigate();

  const { mediaList, fetchMedia } = useMediaStore();
  const { addMediaToPlaylist, fetchMediaPlaylistsByPlaylistId } = useMediaPlaylistStore();

  const [isDisplayable, setIsDisplayable] = useState<boolean>(true);
  const [linkedMedia, setLinkedMedia] = useState<any[]>([]);

  useEffect(() => {
    fetchMedia();
    loadLinkedMedia();
  }, []);

const loadLinkedMedia = async () => {
    try {
        if (playlistId) {
            console.log('Carregando mídias para a playlist ID:', playlistId);
            const response = await fetchMediaPlaylistsByPlaylistId(Number(playlistId));
            console.log('Resposta da API []:', response?.medias);
            setLinkedMedia(response?.medias || []);
            console.log('linkedMedia:', linkedMedia);
        }
    } catch (error) {
        console.error('Erro ao carregar mídias vinculadas:', error);
    }
};

  const handleAddMedia = async (mediaId: number) => {
    try {
      const newEntry = {
        mediaId,
        playlistId: Number(playlistId),
        isMediaDisplayable: isDisplayable,
        isActive: true,
      };
      await addMediaToPlaylist(newEntry);
      message.success('Mídia adicionada à playlist com sucesso!');
      loadLinkedMedia();
    } catch (error) {
      console.error('Erro ao adicionar mídia à playlist:', error);
      message.error('Erro ao adicionar mídia.');
    }
  };

  return (
    <Card style={{ maxWidth: 1100, margin: 'auto', padding: 24 }}>
      <Title level={3} style={{ textAlign: 'center' }}>
        🎧 Adicionar Mídias à Playlist #{playlistId}
      </Title>

      <div style={{ marginBottom: 16 }}>
        <span style={{ marginRight: 8 }}>Exibir mídia na playlist?</span>
        <Switch checked={isDisplayable} onChange={setIsDisplayable} />
      </div>

      <Row gutter={24}>
        <Col xs={24} md={12}>
          <List
            header={<strong>Disponíveis para adicionar</strong>}
            bordered
            dataSource={mediaList}
            renderItem={(item) => (
              <List.Item>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <div>
                    <strong>{item.name}</strong>
                  </div>
                  <Button
                    type="primary"
                    onClick={() => {
                      if (typeof item.id === 'number') {
                        handleAddMedia(item.id);
                      } else {
                        message.error('ID da mídia inválido.');
                      }
                    }}
                  >
                    Adicionar
                  </Button>
                </div>
              </List.Item>
            )}
          />
        </Col>

        <Col xs={24} md={12}>
          <List
            header={<strong>Mídias na Playlist</strong>}
            bordered
            dataSource={linkedMedia}
            renderItem={(item) => (
              <List.Item>
                <strong>{item?.name || 'Sem nome'}</strong>
              </List.Item>
            )}
          />
        </Col>
      </Row>

      <Button style={{ marginTop: 24 }} onClick={() => navigate('/playlist')}>
        Voltar para Playlists
      </Button>
    </Card>
  );
};

export default MediaPlayList;