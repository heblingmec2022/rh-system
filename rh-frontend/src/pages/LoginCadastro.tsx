import { useState, type FormEvent } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { motion } from "framer-motion";

export default function LoginCadastro() {
  const { login } = useAuth();
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
      window.location.href = '/dashboard';
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-800 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-2xl overflow-hidden">
          <CardContent className="py-10 px-8">
            <h1 className="text-4xl font-extrabold text-white text-center mb-8 tracking-tight">Painel RH</h1>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid grid-cols-2 mb-6 bg-white/10 rounded-xl text-white">
                <TabsTrigger value="login">Entrar</TabsTrigger>
                <TabsTrigger value="cadastro">Cadastrar</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  {erro && <p className="text-red-400 text-sm text-center">{erro}</p>}
                  <Input name="email" placeholder="E-mail" onChange={handleChange} required className="bg-white/20 text-white placeholder:text-white/70 border-white/30" />
                  <Input name="senha" type="password" placeholder="Senha" onChange={handleChange} required className="bg-white/20 text-white placeholder:text-white/70 border-white/30" />
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 transition-colors" type="submit">Entrar</Button>
                </form>
              </TabsContent>

              <TabsContent value="cadastro">
                <form onSubmit={handleCadastro} className="space-y-4">
                  {erro && <p className="text-red-400 text-sm text-center">{erro}</p>}
                  <Input name="nome" placeholder="Nome completo" onChange={handleChange} required className="bg-white/20 text-white placeholder:text-white/70 border-white/30" />
                  <Input name="email" placeholder="E-mail" onChange={handleChange} required className="bg-white/20 text-white placeholder:text-white/70 border-white/30" />
                  <Input name="senha" type="password" placeholder="Senha" onChange={handleChange} required className="bg-white/20 text-white placeholder:text-white/70 border-white/30" />
                  <Button className="w-full bg-green-600 hover:bg-green-700 transition-colors" type="submit">Cadastrar</Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
