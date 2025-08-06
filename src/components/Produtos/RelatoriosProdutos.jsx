import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend
} from "recharts";

export default function RelatorioProdutos({ produtos }) {
  // Total de produtos
  const totalProdutos = produtos.length;
  // Criar faixas de preço (exemplo simples)
  // barato < 50, médio 50-150, caro > 150
  const faixaPreco = {
    barato: 0,
    medio: 0,
    caro: 0,
  };

  produtos.forEach(p => {
    const preco = parseFloat(p.preco);
    if (isNaN(preco)) return;
    if (preco < 50) faixaPreco.barato++;
    else if (preco <= 150) faixaPreco.medio++;
    else faixaPreco.caro++;
  });

  // Dados para gráfico
  const dadosGrafico = [
    { faixa: "Barato (<50)", quantidade: faixaPreco.barato },
    { faixa: "Médio (50-150)", quantidade: faixaPreco.medio },
    { faixa: "Caro (>150)", quantidade: faixaPreco.caro },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white rounded-xl shadow-xl mt-5">
      <h2 className="text-2xl font-bold mb-6">Relatório de Produtos</h2>

      <p>Total de produtos cadastrados: <strong>{totalProdutos}</strong></p>

      <div className="mt-6 mb-8">
        <h3 className="text-xl font-semibold mb-2">Quantidade de Produtos por Faixa de Preço</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={dadosGrafico} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="faixa" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="quantidade" fill="#1f2937" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
