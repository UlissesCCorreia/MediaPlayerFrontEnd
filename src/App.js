import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';

// Pages
import Media from './pages/Media/media.tsx';
import Playlist from './pages/Playlist/playlist.tsx';

// Components
import HeaderBar from './components/Header/header.tsx';
import FooterBar from './components/Footer/footer.tsx';
import MediaForm from './pages/MediaForm/mediaForm.tsx';
import MediaPlayList from './pages/MediaPlaylist/MediaPlaylist.tsx'; 

import './App.css';
import { Content } from 'antd/es/layout/layout';

function App() {
  return (
    <div className="App">
      <Router>
        <Layout  style={{ minHeight: '100vh' }}>
          <HeaderBar />
          <Content style={{ padding: '24px'}}>
            <Routes>
              <Route path="/media" element={<Media />} />
              <Route path="/playlist" element={<Playlist />} />
              <Route path="/mediaForm/:id?" element={<MediaForm />} />
              <Route path="/mediaPlaylist/:playlistId" element={<MediaPlayList />} />
            </Routes>
          </Content>
          <FooterBar />
        </Layout>
      </Router>
    </div>
  );
}

export default App;
