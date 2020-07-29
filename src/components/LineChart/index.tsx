import React from 'react';

import { Container } from './styles';

interface LineChartProps {
  type: 'retiradas' | 'pendentes' | 'canceladas' | 'entregues';
}

const LineChart: React.FC<LineChartProps> = ({ type }: LineChartProps) => {
  const chartData = {
    retiradas: {
      points:
        '-100,150 00,50 40,-18 80,25 120,-5 160,0 200,60 240,40 280,-18 320,0 360,0 400,30 450,150',
      strokeColor: '#0074d9',
      fillColor: 'rgba(0, 116, 217, .075)',
    },
    pendentes: {
      points:
        '-100,150 00,50 40,-18 80,10 120,-18 160,30 200,60 240,40 280,60 320,-18 360,80 400,30 450,150',
      strokeColor: '#FA6401',
      fillColor: 'rgba(250, 100, 1, .075)',
    },
    canceladas: {
      points:
        '-100,150 00,50 40,80 80,25 120,40 160,-10 200,10 240,0 280,15 320,50 360,30 400,30 450,150',
      strokeColor: '#E12021',
      fillColor: 'rgba(255, 32, 33, .075)',
    },
    entregues: {
      points:
        '-100,150 00,50 40,20 80,85 120,-10 160,15 200,50 240,10 280,-18 320,20 360,15 400,60 450,150',
      strokeColor: '#1A9856',
      fillColor: 'rgba(26, 152, 86, .075)',
    },
  };

  return (
    <Container viewBox="0 0 400 100">
      <polyline
        fill={chartData[type].fillColor}
        stroke={chartData[type].strokeColor}
        strokeWidth="4"
        points={chartData[type].points}
      />
    </Container>
  );
};

export default LineChart;
