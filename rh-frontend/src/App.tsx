import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CadastrarFuncionario from './pages/CadastrarFuncionario';
import PrivateRoute from './routes/PrivateRoute';
import LoginCadastro from './pages/LoginCadastro';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/cadastrar"
          element={
            <PrivateRoute>
              <CadastrarFuncionario />
            </PrivateRoute>
          }
        />
        <Route
          path="/inicio"
          element={
            <PrivateRoute>
              <LoginCadastro />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;




