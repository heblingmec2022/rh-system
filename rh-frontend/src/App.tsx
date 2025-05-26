import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginCadastro from './pages/LoginCadastro';
import Dashboard from './pages/Dashboard';
import CadastrarFuncionario from './pages/CadastrarFuncionario';
import PrivateRoute from './routes/PrivateRoute';


function App() {
  return (
    <Router>
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
          path="/cadastrar"
          element={
            <PrivateRoute>
              <CadastrarFuncionario />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;





