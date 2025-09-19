import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './playlist.css';
import { Input, Button, List, Typography, Space, Card } from 'antd';

import playlistStore from '../../controlState/playlistStore.tsx';

const { Title } = Typography;

// Tipagem para uma playlist
interface PlaylistItem {
  name: string;
}

// Tipagem para o erro (caso seja um objeto de erro padrão)
interface PlaylistError {
  message: string;
}

const Playlist: React.FC = () => {
  const [playlistName, setPlaylistName] = useState<string>('');

  const navigate = useNavigate();

  const {
    playlistList,
    loading,
    error,
    fetchPlaylists,
    addPlaylist,
  } = playlistStore();

  useEffect(() => {
    fetchPlaylists();
  }, []);

  useEffect(() => {
  console.log('Playlists atualizadas:', playlistList);
}, [playlistList]);

  const handleAddPlaylist = async () => {
    if (playlistName.trim() === '') return;

    const newPlaylist = {
      playlistName: playlistName.trim(),
      playlistNumber: Date.now(), // or another unique number logic
      active: true,
      message: '', // or any default message
    };

    await addPlaylist(newPlaylist);
    setPlaylistName('');
    fetchPlaylists();
  };

  return (
    <div className="container">
      <Card style={{ padding: '24px' }}>
        <Title level={3} style={{ textAlign: 'center', marginBottom: '40px' }}>
          🎶 Playlists
        </Title>
        <Space align="start" size="large">
          <Space direction="vertical">
            <Input
              placeholder="Nome da Playlist"
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
              style={{ width: 250 }}
            />
            <Button type="primary" onClick={handleAddPlaylist}>
              Adicionar Playlist
            </Button>
          </Space>
          <List
            header={<strong>Playlists Criadas</strong>}
            bordered
            dataSource={playlistList}
            renderItem={(item, index) => (
              <List.Item
                key={index}
                actions={[
                  <Button
                    type="default"
                    onClick={
                      () => navigate(`/mediaPlaylist/${item.playlistNumber}`)
                    }
                  >
                    Gerenciar Mídias
                  </Button>,
                ]}
              >
                {item.playlistName}
              </List.Item>

            )}
            style={{ width: 300, maxHeight: 300, overflowY: 'auto' }}
          />
        </Space>
        {loading && <p>Carregando playlists...</p>}
        {error && <p style={{ color: 'red' }}>Erro: {error.message}</p>}
      </Card>
    </div>
  );
};

export default Playlist;