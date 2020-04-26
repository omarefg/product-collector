import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
} from 'recharts';

import { result } from '../../../mocks';

export default function QtyPublishedProducts() {
  const {
    data: { productsCount },
  } = result;

  return (
    <LineChart
        width={720}
        height={300}
        data={productsCount}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line dataKey="iphone" stroke="#46d6bb" />
        <Line dataKey="samsung" stroke="#339de2" />
        <Line dataKey="huawei" stroke="#fbd500" />
        <Line dataKey="motorola" stroke="#df3523" />
        <Line dataKey="xiaomi" stroke="#f78155" />
      </LineChart>
  );
}
