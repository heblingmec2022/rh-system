import { useEffect, useState } from "react";
import api from "../api/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface Funcionario {
  ID_Funcional: number;
  CPF: string;
  NomeDoServidor: string;
  ÓrgãoDeExercício: string;
}

export default function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [form, setForm] = useState({
    CPF: "",
    NomeDoServidor: "",
    ÓrgãoDeExercício: "",
  });

  // Buscar funcionários ao carregar a página
  useEffect(() => {
    buscarFuncionarios();
  }, []);

  const buscarFuncionarios = async () => {
    try {
      const res = await api.get("/funcionarios");
      setFuncionarios(res.data);
    } catch (error) {
      console.error("Erro ao buscar funcionários", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/funcionarios", form);
      setForm({ CPF: "", NomeDoServidor: "", ÓrgãoDeExercício: "" });
      buscarFuncionarios();
    } catch (error) {
      console.error("Erro ao cadastrar funcionário", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white p-6">
      <Card className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md shadow-xl rounded-2xl">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-6">Gestão de Funcionários</h1>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Input
              name="CPF"
              placeholder="CPF"
              value={form.CPF}
              onChange={handleChange}
              required
              className="rounded-xl"
            />
            <Input
              name="NomeDoServidor"
              placeholder="Nome do Servidor"
              value={form.NomeDoServidor}
              onChange={handleChange}
              required
              className="rounded-xl"
            />
            <Input
              name="ÓrgãoDeExercício"
              placeholder="Órgão de Exercício"
              value={form.ÓrgãoDeExercício}
              onChange={handleChange}
              required
              className="rounded-xl"
            />
            <Button type="submit" className="col-span-1 md:col-span-3 rounded-xl">
              Adicionar
            </Button>
          </form>

          {/* Lista de Funcionários */}
          <div className="space-y-2">
            {funcionarios.map((f) => (
              <div
                key={f.ID_Funcional}
                className="flex justify-between items-center bg-black/30 p-3 rounded-xl"
              >
                <span>{f.NomeDoServidor} — {f.ÓrgãoDeExercício}</span>
                <span className="text-sm opacity-70">{f.CPF}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}