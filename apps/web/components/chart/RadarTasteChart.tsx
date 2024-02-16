'use client';
import React, { useEffect, useRef, useState } from 'react';
import type { ChartData, ChartArea } from 'chart.js';
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
const createGradient = (ctx: CanvasRenderingContext2D, area: ChartArea) => {
  const gradient = ctx.createLinearGradient(0, 100.0, 300.0, 100.0);
  gradient.addColorStop(0, 'rgba(249, 221, 224, 0.8)');
  gradient.addColorStop(1, 'rgba(225, 216, 244, 0.8)');

  return gradient;
};

const RadarTasteChart = ({
  data,
}: {
  data: {
    labels: string[];
    datasets: {
      data: number[];
      borderColor: string;
      borderWidth: number;
    }[];
  };
}) => {
  const chartRef = useRef<any>(null);
  const [chartData, setChartData] = useState<ChartData<'radar'>>({
    datasets: [
      {
        data: [5, 9, 3, 5, 5],
        borderColor: '#A589DF',
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const chart = chartRef.current;

    if (!chart) {
      return;
    }

    const chartData = {
      ...data,
      datasets: data.datasets.map(dataset => ({
        ...dataset,
        backgroundColor: createGradient(chart.ctx, chart.chartArea),
      })),
    };

    setChartData(chartData);
  }, []);

  return (
    <Radar
      ref={chartRef}
      data={chartData}
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
