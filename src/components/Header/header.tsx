import React from 'react';
import { Menu } from 'antd';
import { HomeOutlined, PlayCircleOutlined, SettingOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const Header  = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      selectedKeys={[location.pathname]}
    >
      <Menu.Item eventKey="/media" icon={<PlayCircleOutlined />} onClick={() => navigate('/media')}>
        Media
      </Menu.Item>
      <Menu.Item eventKey="/playlist" icon={<SettingOutlined />} onClick={() => navigate('/playlist')}>
        Playlist
      </Menu.Item>
    </Menu>
  );
};

export default Header;