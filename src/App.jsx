import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IndexPosts from './pages/posts/IndexPosts';
import CreatePosts from './pages/posts/CreatePosts';
import EditPosts from './pages/posts/EditPosts';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPosts />} />
        <Route path="/create" element={<CreatePosts />} />
        <Route path="/edit/:id" element={<EditPosts />} />
        <Route path="/delete/:id" element={<CreatePosts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
