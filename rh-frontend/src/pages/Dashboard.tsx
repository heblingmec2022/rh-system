// src/pages/Dashboard.tsx
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-800 to-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-8">Bem-vindo ao Painel RH!</h1>

      <div className="flex gap-4">
        <Button
          onClick={() => navigate('/funcionarios')}
          className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
        >
          Ir para Funcionários
        </Button>

        <Button
          onClick={() => navigate('/')}
          className="rounded-xl bg-red-600 hover:bg-red-700 text-white"
        >
          Sair
        </Button>
      </div>
    </div>
  );
}

