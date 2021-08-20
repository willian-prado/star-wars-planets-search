import React, { useContext } from 'react';
import Context from '../context/Context';
import '../styles/Filters.css';

function Filters() {
  const { filters,
    handleFilterByName } = useContext(Context);

  return (
    <header>
      <h2> Star Wars Planets </h2>
      <label htmlFor="name-search">
        Busca por nome
        <input
          id="name-search"
          type="text"
          data-testid="name-filter"
          onChange={ handleFilterByName }
          value={ filters.filterByName.name }
        />
      </label>
    </header>
  );
}

export default Filters;
