import { useState, type FormEvent } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { motion } from "framer-motion";
import { FiUser } from "react-icons/fi"; // Exemplo de ícone

export default function LoginCadastro() {
  const { login } = useAuth();
  const [form, setForm] = useState({ nome: '', email: '', senha: '', perfil: 'ADMIN' });
  const [erroLogin, setErroLogin] = useState('');
  const [erroCadastro, setErroCadastro] = useState('');
  const [sucessoCadastro, setSucessoCadastro] = useState('');
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingCadastro, setLoadingCadastro] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setErroLogin('');
    setLoadingLogin(true);
    try {
      const res = await api.post('/auth/login', { email: form.email, senha: form.senha });
      login(res.data.token);
      window.location.href = '/dashboard';
    } catch (err) {
      setErroLogin('Usuário ou senha inválidos');
    } finally {
      setLoadingLogin(false);
    }
  };

  const handleCadastro = async (e: FormEvent) => {
    e.preventDefault();
    setErroCadastro('');
    setSucessoCadastro('');
    setLoadingCadastro(true);
    try {
      await api.post('/auth/registrar', form);
      setSucessoCadastro('Cadastro realizado com sucesso!');
    } catch (err) {
      setErroCadastro('Erro ao cadastrar usuário');
    } finally {
      setLoadingCadastro(false);
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
            <div className="flex flex-col items-center mb-6">
              <FiUser size={48} className="text-white/80 mb-2" />
              <h1 className="text-4xl font-extrabold text-white text-center tracking-tight">Painel RH</h1>
            </div>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid grid-cols-2 mb-6 bg-white/10 rounded-xl text-white">
                <TabsTrigger value="login">Entrar</TabsTrigger>
                <TabsTrigger value="cadastro">Cadastrar</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  {erroLogin && <p className="text-red-400 text-sm text-center">{erroLogin}</p>}
                  <Input name="email" placeholder="E-mail" onChange={handleChange} required aria-label="E-mail" className="bg-white/20 text-white placeholder:text-white/70 border-white/30" />
                  <Input name="senha" type="password" placeholder="Senha" onChange={handleChange} required aria-label="Senha" className="bg-white/20 text-white placeholder:text-white/70 border-white/30" />
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 transition-colors" type="submit" disabled={loadingLogin}>
                    {loadingLogin ? "Entrando..." : "Entrar"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="cadastro">
                <form onSubmit={handleCadastro} className="space-y-4">
                  {erroCadastro && <p className="text-red-400 text-sm text-center">{erroCadastro}</p>}
                  {sucessoCadastro && <p className="text-green-400 text-sm text-center">{sucessoCadastro}</p>}
                  <Input name="nome" placeholder="Nome completo" onChange={handleChange} required aria-label="Nome completo" className="bg-white/20 text-white placeholder:text-white/70 border-white/30" />
                  <Input name="email" placeholder="E-mail" onChange={handleChange} required aria-label="E-mail" className="bg-white/20 text-white placeholder:text-white/70 border-white/30" />
                  <Input name="senha" type="password" placeholder="Senha" onChange={handleChange} required aria-label="Senha" className="bg-white/20 text-white placeholder:text-white/70 border-white/30" />
                  <Button className="w-full bg-green-600 hover:bg-green-700 transition-colors" type="submit" disabled={loadingCadastro}>
                    {loadingCadastro ? "Cadastrando..." : "Cadastrar"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

