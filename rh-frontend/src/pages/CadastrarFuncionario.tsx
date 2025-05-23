import { useEffect, useState, type FormEvent } from 'react';
import api from '../api/axios';

interface Cargo {
  id: number;
  nome: string;
}

interface Setor {
  id: number;
  nome: string;
}
console.log('📢 CadastrarFuncionario foi carregado!');

const CadastrarFuncionario = () => {
  const [form, setForm] = useState({
    nome: '',
    cpf: '',
    email: '',
    salario: '',
    cargoId: '',
    setorId: ''
  });

  const [cargos, setCargos] = useState<Cargo[]>([]);
  const [setores, setSetores] = useState<Setor[]>([]);

  useEffect(() => {
  api.get('/cargos')
    .then((res) => {
      console.log('✅ Cargos recebidos:', res.data);
      setCargos(res.data);
    })
    .catch((err) => console.error('❌ Erro ao buscar cargos', err));

  api.get('/setores')
    .then((res) => {
      console.log('✅ Setores recebidos:', res.data);
      setSetores(res.data);
    })
    .catch((err) => console.error('❌ Erro ao buscar setores', err));
  }, []);




  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/api/funcionarios', {
        ...form,
        salario: parseFloat(form.salario),
        cargoId: Number(form.cargoId),
        setorId: Number(form.setorId)
      });
      alert('Funcionário cadastrado com sucesso!');
      setForm({ nome: '', cpf: '', email: '', salario: '', cargoId: '', setorId: '' });
    } catch (err) {
      console.error(err);
      alert('Erro ao cadastrar funcionário');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Cadastrar Funcionário</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input type="text" name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} className="border p-2 rounded" required />
        <input type="text" name="cpf" placeholder="CPF" value={form.cpf} onChange={handleChange} className="border p-2 rounded" required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="border p-2 rounded" required />
        <input type="number" name="salario" placeholder="Salário" value={form.salario} onChange={handleChange} className="border p-2 rounded" required />

        <select name="cargoId" value={form.cargoId} onChange={handleChange} className="border p-2 rounded" required>
          <option value="">Selecione um Cargo</option>
          {cargos.map((cargo) => (
            <option key={cargo.id} value={cargo.id}>
              {cargo.nome}
            </option>
          ))}
        </select>

        <select name="setorId" value={form.setorId} onChange={handleChange} className="border p-2 rounded" required>
          <option value="">Selecione um Setor</option>
          {setores.map((setor) => (
            <option key={setor.id} value={setor.id}>
              {setor.nome}
            </option>
          ))}
        </select>

        <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastrarFuncionario;

