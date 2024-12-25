import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import React from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LineChart({ data }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Линейный график',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const index = context.dataIndex;
            const category = data.categories[index];
            const value = context.raw;
            return `Category: ${category}, Value: ${value}`;
          },
        },
      },
    },
  };
  return (
    <div>
      <h2>Chart</h2>

      <Line data={data} options={options} />
    </div>
  );
}
