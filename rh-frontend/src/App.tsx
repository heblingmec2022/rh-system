import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginCadastro from './pages/LoginCadastro';
import Dashboard from './pages/Dashboard'; // Crie essa página se ainda não tiver
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginCadastro />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}







