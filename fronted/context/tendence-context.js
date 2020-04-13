import { useState, createContext } from 'react';

const TendenceContext = createContext();

function TendenceProvider({ children }) {
  const [keywords, setKeywords] = useState([]);

  return (
    <TendenceContext.Provider value={{ keywords, setKeywords }}>
      {children}
    </TendenceContext.Provider>
  );
}

export { TendenceContext, TendenceProvider };
