import {
  ArcElement,
  BarElement,
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
import { Bar, Line, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function ChartModule({
  chartType = 'line',
  data,
  categoryColors,
}) {
  // console.log(data);

  let title = 'Линейный график';
  if (chartType === 'bar') {
    title = 'Столбчатая диаграмма';
  } else if (chartType === 'pie') {
    title = 'Круговая диаграмма';
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
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
          const { ctx } = chart;
          const dataset = chart.data.datasets[0];
          const meta = chart.getDatasetMeta(0);

          ctx.save();
          meta.data.forEach((dataPoint, index) => {
            const { x, y } = dataPoint.tooltipPosition();
            const category = dataset.categories[index];

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
        <>
          {chartType === 'line' && (
            <Line
              data={data}
              options={options}
              plugins={[options.plugins.customLabels]}
            />
          )}
          {chartType === 'bar' && (
            <Bar
              data={data}
              options={options}
              plugins={[options.plugins.customLabels]}
            />
          )}
          {chartType === 'pie' && (
            <Pie
              data={data}
              options={options}
              plugins={[options.plugins.customLabels]}
            />
          )}
        </>
      )}
    </div>
  );
}
