import React from 'react';
import { useTema } from '../context/TemaContext';

const TemaSecici = () => {
  const { tema, changeTema } = useTema();

  return (
    <div className="tema-secici">
      <label>Tema :</label>
      <select value={tema} onChange={(e) => changeTema(e.target.value)}>
        <option value="normal">Normal</option>
        <option value="dark">Koyu</option>
        <option value="blue">Mavi</option>
        <option value="pink">Pembe</option>
      </select>
    </div>
  );
};

export default TemaSecici;