import { useState, createContext } from 'react';

const TrendContext = createContext();

function TrendProvider({ children }) {
  const [keywords, setKeywords] = useState([]);
  const [filter, setFilter] = useState({});

  return (
    <TrendContext.Provider value={{ keywords, setKeywords, filter, setFilter }}>
      {children}
    </TrendContext.Provider>
  );
}

export { TrendContext, TrendProvider };
