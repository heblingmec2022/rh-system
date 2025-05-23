import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function LoginCadastro() {
  const [loginData, setLoginData] = useState({ email: '', senha: '' });
  const [cadastroData, setCadastroData] = useState({ nome: '', email: '', senha: '' });

  const handleLogin = () => {
    console.log('Login com:', loginData);
    // TODO: Integrar com API de login
  };

  const handleCadastro = () => {
    console.log('Cadastro com:', cadastroData);
    // TODO: Integrar com API de cadastro
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-4">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl">
        <CardContent className="p-6">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid grid-cols-2 bg-blue-50 rounded-xl mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="cadastro">Cadastro</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={e => { e.preventDefault(); handleLogin(); }} className="space-y-4">
                <Input type="email" placeholder="E-mail" value={loginData.email} onChange={e => setLoginData({ ...loginData, email: e.target.value })} required />
                <Input type="password" placeholder="Senha" value={loginData.senha} onChange={e => setLoginData({ ...loginData, senha: e.target.value })} required />
                <Button className="w-full" type="submit">Entrar</Button>
              </form>
            </TabsContent>

            <TabsContent value="cadastro">
              <form onSubmit={e => { e.preventDefault(); handleCadastro(); }} className="space-y-4">
                <Input type="text" placeholder="Nome completo" value={cadastroData.nome} onChange={e => setCadastroData({ ...cadastroData, nome: e.target.value })} required />
                <Input type="email" placeholder="E-mail" value={cadastroData.email} onChange={e => setCadastroData({ ...cadastroData, email: e.target.value })} required />
                <Input type="password" placeholder="Senha" value={cadastroData.senha} onChange={e => setCadastroData({ ...cadastroData, senha: e.target.value })} required />
                <Button className="w-full" type="submit">Cadastrar</Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
