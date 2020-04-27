import {
  BarChart,
  Bar,
  LabelList,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

import colors from '../../../utils/colors';

export default function AveragePublishedProducts({ productsCount }) {
  if (!productsCount) {
    return <div> Loading ... </div>;
  }

  const data =
    productsCount &&
    productsCount.map((item, index) => ({ ...item, fill: colors[index] }));

  return (
    <BarChart
      width={300}
      height={300}
      data={data}
      labelLine={false}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray='1 1' />
      <XAxis dataKey='_id' />
      <YAxis />
      <Tooltip />
      <Bar dataKey='cantidad' fill='fill' />
    </BarChart>
  );
}
