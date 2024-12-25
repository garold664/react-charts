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
const categoryColors = {
  A: 'rgba(255, 99, 132, 1)',
  B: 'rgba(54, 162, 235, 1)',
  C: 'rgba(75, 192, 192, 1)',
  D: 'rgba(255, 206, 86, 1)',
  E: 'rgba(153, 102, 255, 1)',
  F: 'rgba(255, 159, 64, 1)',
  G: 'rgba(199, 199, 199, 1)',
};

export default function LineChart({ data }) {
  // console.log(data);

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
            const category = data.datasets[0].categories[index];
            const value = context.raw;
            return `Category: ${category}, Value: ${value}`;
          },
        },
      },
      customLabels: {
        id: 'categoryLabels',
        afterDatasetsDraw(chart, args, options) {
          const {
            ctx,
            chartArea: { top, bottom, left, right },
            scales,
          } = chart;
          const dataset = chart.data.datasets[0];
          const meta = chart.getDatasetMeta(0);

          ctx.save();
          meta.data.forEach((dataPoint, index) => {
            const { x, y } = dataPoint.tooltipPosition();
            const category = dataset.categories[index];
            // console.log(dataset.categories);

            ctx.font = '25px Arial';
            ctx.fillStyle = categoryColors[category] || 'black';
            ctx.textAlign = 'center';
            ctx.fillText(category, x, y - 10); // Positioning above the point
          });
          ctx.restore();
        },
      },
    },
  };

  return (
    <div>
      <h2>Chart</h2>
      {options && (
        <Line
          data={data}
          options={options}
          plugins={[options.plugins.customLabels]}
        />
      )}
    </div>
  );
}
