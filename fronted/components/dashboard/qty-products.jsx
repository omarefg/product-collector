import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  ResponsiveContainer,
} from 'recharts';

import colors from '../../utils/colors';

export default function QtyPublishedProducts({ products, keywords }) {
  if (!products) {
    return <div> Loading ... </div>;
  }

  const lines = keywords.map((item, index) => ({
    keyword: item,
    fill: colors[index],
  }));

  return (
    <ResponsiveContainer height={300}>
      <LineChart data={products}>
        <CartesianGrid strokeDasharray='5 5' />
        <XAxis dataKey='date' />
        <YAxis />
        <Tooltip />
        {lines.map(({ keyword, fill }) => {
          return (
            <Line
              key={keyword.replace(' ', '-')}
              dataKey={`"${keyword}"`}
              fill={fill}
              stroke={fill}
            />
          );
        })}
      </LineChart>
    </ResponsiveContainer>
  );
}
