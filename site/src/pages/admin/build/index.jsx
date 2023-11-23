import './index.scss';
import AdmBarraLateral from '../../../components/AdminBarraL';
import { ListarTodosJogos } from '../../../connection/productAPI.js';
import { useEffect, useState } from 'react';
import BarChart from '../../../components/constant/BarChart.js';
import LineChart from '../../../components/constant/LineChart.js';
import PieChart from '../../../components/constant/PieChart.js';
export default function Dashboard() {

  const [barChartData, setBarChartData] = useState(null);
  const [lineChartData, setLineChartData] = useState(null);
  const [pieChartData, setPieChartData] = useState(null);

  async function PegandoInformacoes() {
    const informacoes = await ListarTodosJogos();
    criarDadosGrafico(informacoes);
  }

  useEffect(() => {
    PegandoInformacoes();
  }, []);

  const criarDadosGrafico = (dados) => {

    // Mapeiando as categorias únicas presentes nos dados
  const categoriasUnicas = [...new Set(dados.map((item) => item.categoria_nome))];

  // Inicializando um array para armazenar as quantidades fictícias associadas a cada categoria
  const quantidadesFicticias = categoriasUnicas.map(() => Math.floor(Math.random() * 100));

    const barChartData = {
      labels: categoriasUnicas,
      datasets: [
        {
          label: 'Valor Escalado',
          data: quantidadesFicticias,
          backgroundColor: [
            "rgb(222, 251, 0)",
            "rgb(0, 247, 251)",
            "rgb(255, 247, 195)",
            "rgb(255, 247, 0)",
            "rgb(255, 195, 0)",
            "rgb(255, 0, 0)",
            "rgb(255, 0, 247)",
            "rgb(0, 0, 247)",
            "rgb(0, 247, 0)",
            "rgb(247, 247, 247)",
            "rgb(195, 195, 195)",
            "rgb(128, 0, 0)",
            "rgb(0, 128, 0)",
            "rgb(0, 0, 128)",
            "rgb(128, 128, 0)",
            "rgb(128, 0, 128)",
            "rgb(0, 128, 128)",
            "rgb(128, 128, 128)",
            "rgb(128, 128, 0)",
            "rgb(222, 251, 0)",
"rgb(0, 247, 251)",
"rgb(255, 247, 195)",
"rgb(255, 247, 0)",
"rgb(255, 195, 0)",
"rgb(255, 0, 0)",
"rgb(255, 0, 247)",
"rgb(0, 0, 247)",
"rgb(0, 247, 0)",
"rgb(247, 247, 247)",
"rgb(195, 195, 195)",
"rgb(128, 0, 0)",
"rgb(0, 128, 0)",
"rgb(0, 0, 128)",
"rgb(128, 128, 0)"
          ],
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    };
    setBarChartData(barChartData);

// Multiplica os valores em cada categoria por 10
  const valoresMultiplicados = categoriasUnicas.map((categoria) => {
  const valoresCategoria = dados.filter((item) => item.categoria_nome === categoria).map((item) => item.valor);
  const valoresMultiplicadosCategoria = valoresCategoria.map((valor) => valor * 10);
  return valoresMultiplicadosCategoria;
});

// Convertendo a matriz de valores multiplicados para um array simples
const valores = valoresMultiplicados.flat();

const lineChartData = {
  labels: categoriasUnicas,
  datasets: [
    {
      label: 'Valor Escalado',
      data: categoriasUnicas.map((categoria) => {
        const valoresCategoria = dados
          .filter((item) => item.categoria_nome === categoria)
          .map((item) => item.valor * 10);

        // Calculando a soma dos valores multiplicados para a categoria
        return valoresCategoria.reduce((total, valor) => total + valor, 0);
      }),
      backgroundColor: [
        "rgb(222, 251, 0)",
        "rgb(0, 247, 251)",
        // (adicionar mais cores conforme necessário)
      ],
      borderColor: "black",
      borderWidth: 2,
    },
  ],
};

    setLineChartData(lineChartData);
  
    const valoresNomes = dados.map((item) => {
      const valoresNomeProdutos = dados
        .filter((produto) => produto.nome === item.nome)
        .map((produto) => produto.valor);
      const valoresLucroTotal = valoresNomeProdutos.map((valor) => Math.random(valor) * 5); //Math.floor(Math.random()
      return valoresLucroTotal;
    });

    const values = valoresNomes.flat();

    const pieChartData = {
      labels: dados.map((item) => item.nome),
      datasets: [
        {
          data: values,
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(75, 192, 192)",
            // ... (adicionar mais cores conforme necessário)
          ],
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    };
    setPieChartData(pieChartData);
  };
  

  return (
    <div id='DASHBOARD'>
      <AdmBarraLateral selecionado='dashboard' />
        <main className='Dashboard'>

          <header className='Barra'>
              <nav className='title'>
                  <h1>DashBoard Financias Estatísticas</h1>
              </nav>

              <nav className='dois'>
                <select id="mes">
                  <option >Novembro</option>
                </select>

                  <select id="ano">
                  <option>2023</option>
                </select>
              </nav>
          </header>

          <section className="Graficos">
            <div className='Grafico-pau'>
                  {barChartData && <BarChart informacoes={barChartData} className="pau-chart" />}
              </div>

              <div className='Grafico-pizza'>
                  {lineChartData && <PieChart informacoes={lineChartData} className="pizza-chart" />}
              </div>
          </section>

            <div className='Grafico-linha'>
                {pieChartData && <LineChart informacoes={pieChartData} className="linha-chart" />}
            </div>
        </main>
    </div>
  );
}

