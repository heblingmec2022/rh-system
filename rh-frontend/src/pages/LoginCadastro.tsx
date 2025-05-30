import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function LoginCadastro() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [erro, setErro] = useState('');
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    perfil: 'ADMIN',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', {
        email: form.email,
        senha: form.senha,
      });
      login(res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setErro('Usuário ou senha inválidos');
    }
  };

  const handleCadastro = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/auth/registrar', form);
      alert('Cadastro realizado com sucesso!');
    } catch (err) {
      setErro('Erro ao cadastrar usuário');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-950 p-4">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl bg-white/10 backdrop-blur-md">
        <CardContent className="py-6">
          <h1 className="text-center text-3xl font-bold text-white mb-2">Painel RH</h1>
          <h2 className="text-center text-white text-sm mb-6">Secretaria da Casa Civil</h2>
          <h3 className="text-center text-white text-xs mb-4">Departamento de Tecnologia da Informação e Comunicação</h3>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4 rounded-xl overflow-hidden bg-black/30">
              <TabsTrigger value="login">Entrar</TabsTrigger>
              <TabsTrigger value="cadastro">Cadastrar</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                {erro && <p className="text-red-500 text-sm text-center">{erro}</p>}
                <Input name="email" placeholder="E-mail" onChange={handleChange} required className="rounded-xl" />
                <Input name="senha" type="password" placeholder="Senha" onChange={handleChange} required className="rounded-xl" />
                <Button className="w-full rounded-xl" type="submit">Entrar</Button>
              </form>
            </TabsContent>

            <TabsContent value="cadastro">
              <form onSubmit={handleCadastro} className="space-y-4">
                {erro && <p className="text-red-500 text-sm text-center">{erro}</p>}
                <Input name="nome" placeholder="Nome completo" onChange={handleChange} required className="rounded-xl" />
                <Input name="email" placeholder="E-mail" onChange={handleChange} required className="rounded-xl" />
                <Input name="senha" type="password" placeholder="Senha" onChange={handleChange} required className="rounded-xl" />
                <Button className="w-full rounded-xl" type="submit">Cadastrar</Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}


