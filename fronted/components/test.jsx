import { useContext } from 'react';
import { TrendContext } from '../context/trend-context';
import { isLastDayOfMonth } from 'date-fns';

export default function Test() {
  const { keywords, filter } = useContext(TrendContext);
  return (
    <div>
      <div>
        keywords:
        <ul>
          {keywords.map((item, index) => (
            <li key={index}>
              {index} - {item}
            </li>
          ))}
        </ul>
      </div>
      <div>
        filter:
        <br/>
        {JSON.stringify(filter)}
      </div>
    </div>
  );
}
