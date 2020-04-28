import { useState, createContext } from 'react';

const TrendContext = createContext();

function TrendProvider({ children }) {
  const [keywords, setKeywords] = useState([]);
  const [filter, setFilter] = useState({});
  const [countries, setCountries] = useState(["Cargando..."]);

  return (
    <TrendContext.Provider
      value={{
        keywords,
        setKeywords,
        filter,
        setFilter,
        countries,
        setCountries,
      }}
    >
      {children}
    </TrendContext.Provider>
  );
}

export { TrendContext, TrendProvider };
