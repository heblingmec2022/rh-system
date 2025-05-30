import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-950 text-white">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-gray-800 shadow-md">
        <h1 className="text-xl font-bold">Painel RH</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
        >
          Sair
        </button>
      </header>

      {/* Main content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 p-4 hidden md:block">
          <nav className="space-y-4">
            <a href="#" className="block hover:text-gray-300">Funcionários</a>
            <a href="#" className="block hover:text-gray-300">Cargos</a>
            <a href="#" className="block hover:text-gray-300">Setores</a>
            <a href="#" className="block hover:text-gray-300">Relatórios</a>
          </nav>
        </aside>

        {/* Content area */}
        <main className="flex-1 p-6">
          <h2 className="text-2xl font-semibold mb-4">Bem-vindo ao Painel RH</h2>
          <p className="text-gray-300">
            Aqui você pode gerenciar os funcionários, cargos, setores e muito mais.
          </p>
        </main>
      </div>
    </div>
  );
}
