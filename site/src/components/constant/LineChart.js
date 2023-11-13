import React from "react";
import {Line} from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto';

export default function LineChart({ informacoes }) {
  if (!informacoes) {
    return null; // ou qualquer coisa que indique que os dados ainda estão sendo carregados
  }

  return <Line data={informacoes} />;
}
