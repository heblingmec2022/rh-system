// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginCadastro from './pages/LoginCadastro';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './routes/PrivateRoute';
import Funcionarios from './pages/Funcionarios'; // importa a nova página

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginCadastro />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/funcionarios"
          element={
            <PrivateRoute>
              <Funcionarios />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}









