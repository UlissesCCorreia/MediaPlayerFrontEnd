import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Switch, Card, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import useMediaStore from '../../controlState/mediaStore.tsx'; // ajuste o caminho

const MediaForm = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { addMedia, updateMedia, fetchMediaById } = useMediaStore();

  const [form] = Form.useForm();

  // 🧩 Cada campo instanciado separadamente
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [mediaUpload, setMediaUpload] = useState('');
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const mediaData = await fetchMediaById(id);
        if (mediaData) {
          console.log("Populating form with data:", mediaData);
          setName(mediaData.name || '');
          setDescription(mediaData.description || '');
          setMediaUpload(mediaData.mediaUpload || '');
          setIsActive(mediaData.isActive !== undefined ? mediaData.isActive : true);

          // Atualiza os campos do formulário visualmente
          form.setFieldsValue({
            name: mediaData.name || '',
            description: mediaData.description || '',
            mediaUpload: mediaData.mediaUpload || '',
            isActive: mediaData.isActive !== undefined ? mediaData.isActive : true,
          });
        }
      };
      fetchData();
    }
  }, [id, form, fetchMediaById]);

  const handleSubmit = async () => {
    const values = { name, description, mediaUpload, isActive };

    try {
      if (id) {
        await updateMedia(
            id, {
            Name: values.name,
            Description: values.description,
            MediaUpload: values.mediaUpload,
            Active: values.isActive,
          });
        message.success('Mídia atualizada com sucesso!');
      } else {
        await addMedia({
          Name: name,
          Description: description,
          MediaUpload: mediaUpload,
          Active: isActive,
          isActive: undefined,
          mediaUpload: '',
          description: '',
          name: ''
        });
        message.success('Mídia criada com sucesso!');
      }
      navigate('/media');
    } catch (error) {
      message.error('Erro ao salvar a mídia.');
      console.error(error);
    }
  };

  return (
    <Card title="📤 Nova Mídia" style={{ maxWidth: 600, margin: 'auto' }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ name, description, mediaUpload, isActive }}
      >
        <Form.Item
          label="Nome"
          name="name"
          rules={[{ required: true, message: 'Digite o nome da mídia' }]}
        >
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Descrição"
          name="description"
          rules={[{ required: true, message: 'Digite a descrição da mídia' }]}
        >
          <Input.TextArea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Arquivo (URL, nome ou caminho)"
          name="mediaUpload"
          rules={[{ required: true, message: 'Informe o caminho do arquivo' }]}
        >
          <Input value={mediaUpload} onChange={(e) => setMediaUpload(e.target.value)} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Salvar Mídia
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default MediaForm;