import React, { createContext, useState, useEffect } from 'react';

const TemaContext = createContext();

export const TemaProvider = ({ children }) => {
  const [tema, setTema] = useState('normal'); // Varsayılan tema

  // LocalStorage'dan tema bilgisini yükle
  useEffect(() => {
    const savedTema = localStorage.getItem('tema');
    if (savedTema) {
      setTema(savedTema);
    }
  }, []);

  // Tema değiştirme fonksiyonu
  const changeTema = (newTema) => {
    setTema(newTema);
    localStorage.setItem('tema', newTema); // LocalStorage'a kaydet
  };

  return (
    <TemaContext.Provider value={{ tema, changeTema }}>
      {children}
    </TemaContext.Provider>
  );
};

export const useTema = () => React.useContext(TemaContext);