import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

import { result } from '../../mocks';

export default function AveragePublishedProducts() {
  const {
    data: { productsAverage },
  } = result;

  return (
    <BarChart
      width={400}
      height={300}
      data={productsAverage}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='producto' />
      <YAxis />
      <Tooltip />
      <Bar dataKey='cantidad' fill='fill' />
    </BarChart>
  );
}
