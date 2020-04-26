import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

import colors from '../../../utils/colors';

export default function AveragePublishedProducts({ productsCount }) {
  if (!productsCount) {
    return <div> Loading ... </div>;
  }

  console.log(productsCount);
  const data =
    productsCount &&
    productsCount.map((item, index) => ({ ...item, fill: colors[index] }));

  console.log(data);

  return (
    <BarChart
      width={400}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='_id' />
      <YAxis />
      <Tooltip />
      <Bar dataKey='count' fill='fill' />
    </BarChart>
  );
}
