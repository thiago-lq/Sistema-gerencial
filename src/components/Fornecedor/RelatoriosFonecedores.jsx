import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function RelatorioFornecedores({ fornecedores }) {
  const totalFornecedores = fornecedores.length;

  const fornecedoresCNPJ = fornecedores.filter(f => f.cnpjCpf && f.cnpjCpf.length > 14);
  const fornecedoresCPF = fornecedores.filter(f => f.cnpjCpf && f.cnpjCpf.length <= 14);

  const fornecedoresOrdenados = [...fornecedores].sort((a, b) =>
    a.nome.localeCompare(b.nome)
  );

  // Dados para o gráfico
  const data = {
    labels: ["CNPJ", "CPF"],
    datasets: [
      {
        label: "Quantidade de Fornecedores",
        data: [fornecedoresCNPJ.length, fornecedoresCPF.length],
        backgroundColor: [
          "rgba(59, 130, 246, 0.7)", // azul
          "rgba(16, 185, 129, 0.7)", // verde
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Quantidade de Fornecedores por Tipo de Documento",
      },
    },
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white rounded-xl shadow-xl mt-5">
      <h2 className="text-2xl font-bold mb-6">Relatório de Fornecedores</h2>

      <p>Total de fornecedores cadastrados: <strong>{totalFornecedores}</strong></p>
      <p>Fornecedores com CNPJ: <strong>{fornecedoresCNPJ.length}</strong></p>
      <p>Fornecedores com CPF: <strong>{fornecedoresCPF.length}</strong></p>

      <div className="mt-10">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
