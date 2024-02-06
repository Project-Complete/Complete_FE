'use client';
import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

export const data = {
  labels: ['바디감(목넘김)', '쓴맛', '청량감', '산미', '단맛'],
  datasets: [
    {
      data: [5, 9, 3, 5, 5],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
  ],
};

const RadarTasteChart = () => {
  return (
    <Radar
      data={data}
      options={{
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          r: {
            suggestedMin: 0,
            suggestedMax: 10,
          },
        },
      }}
    />
  );
};
export default RadarTasteChart;
