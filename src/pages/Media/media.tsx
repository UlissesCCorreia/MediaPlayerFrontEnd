import React,{ useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Tag } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';

import useMediaStore from '../../controlState/mediaStore.tsx'; // ajuste o caminho conforme necessário

import './media.css';

// Tipagem para os dados de mídia
import type { MediaItem } from '../../routes/mediaRoutes'; // ajuste o caminho conforme necessário

const Media = () => {

  const navigate = useNavigate();

  const {
    mediaList,
    loading,
    error,
    fetchMedia,
    updateMedia,
  } = useMediaStore();

  useEffect(() => {
    fetchMedia();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Descrição',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Arquivo',
      dataIndex: 'mediaUpload',
      key: 'mediaUpload',
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (_: unknown, record: MediaItem) => (
        <>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            icon={<EditOutlined />}
            onClick={() => navigate(`/mediaForm/${record.id}`)}
          >
            Atualizar
          </Button>
          <Button
            danger
            onClick={async () => {
              try {
                if (record.id !== undefined && record.id !== null) {
                  await updateMedia(String(record.id), {
                    Name: record.name,
                    Description: record.description,
                    MediaUpload: record.mediaUpload,
                    Active: false, // 👈 Marca como inativo
                  });
                  fetchMedia(); // Atualiza a lista após "exclusão"
                } else {
                  console.error('ID da mídia é indefinido.');
                }
              } catch (error) {
                console.error('Erro ao excluir mídia:', error);
              }
            }}
          >
            Excluir
          </Button>
        </div>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>🎥 Mídias</h2>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => navigate('/mediaForm')}
      >
        Nova Mídia
      </Button>
      {error && <Tag color="error">{error.message}</Tag>}
      {loading && <Tag color="blue">Carregando Mídias...</Tag>}
      <Table
        columns={columns}
        dataSource={mediaList}
        rowKey="id"
        pagination={false}
        bordered
        style={{ background: '#fff' }}
      />
    </div>
  );
};

export default Media;