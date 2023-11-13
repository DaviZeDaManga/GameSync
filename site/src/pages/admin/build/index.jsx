import './index.scss';
import AdmBarraLateral from '../../../components/AdminBarraL';
import { ListarTodosJogos } from '../../../connection/productAPI.js';
import { useEffect, useState } from 'react';
import BarChart from '../../../components/constant/BarChart.js';
import LineChart from '../../../components/constant/LineChart.js';
import PieChart from '../../../components/constant/PieChart.js';
export default function Dashboard() {
  const [chartData, setChartData] = useState(null);

  async function PegandoInformacoes() {
    const informacoes = await ListarTodosJogos();
    criarDadosGrafico(informacoes);
  }

  useEffect(() => {
    PegandoInformacoes();
  }, []);

  const criarDadosGrafico = (dados) => {
    const novoChartData = {
      labels: dados.map((item) => item.nome),
      datasets: [
        {
          label: 'Algumas coisas',
          data: dados.map((item) => item.valor),
          backgroundColor: [
          "rgb(222, 251, 0)", 
          "rgb(0, 247, 251)",
          "rgb(251, 0, 188)",
          "rgb(251, 130, 0)",
          "rgb(251, 0, 0)",
          "rgb(151, 0, 251)",
          "rgb(0, 25, 251)",
          "rgb(84, 251, 0)"
        ],
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    };

    setChartData(novoChartData);
  };

  return (
    <div id='DASHBOARD'>
      <AdmBarraLateral selecionado='dashboard' />
        <main className='Dashboard'>
            <div className='Grafico-pau'>
                {chartData && <BarChart informacoes={chartData} className="pau-chart" />}
            </div>

            <div className='Grafico-linha'>
                {chartData && <LineChart informacoes={chartData} className="linha-chart" />}
            </div>

            <div className='Grafico-pizza'>
                {chartData && <PieChart informacoes={chartData} className="pizza-chart" />}
            </div>
        </main>
    </div>
  );
}

