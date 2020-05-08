import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import colors from '../../utils/colors';

export default function TotalPublishedProducts({ products, dataKey }) {
  if (!products) {
    return <div> Loading ... </div>;
  }

  const data =
    products &&
    products.map((item, index) => ({ ...item, fill: colors[index] }));

  return (
    <ResponsiveContainer height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray='5 5' />
        <XAxis dataKey='_id' />
        <YAxis />
        <Tooltip />
        <Bar dataKey={dataKey} fill='fill' />
      </BarChart>
    </ResponsiveContainer>
  );
}
