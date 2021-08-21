import React, { useContext, useState } from 'react';
import Context from '../context/Context';
import '../styles/Filters.css';

function Filters() {
  const { filters,
    handleFilterByName,
    handleChange,
    selectedFilters,
    filterByNumericValues,
  } = useContext(Context);
  const [columnOptions, setColumn] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ]);
  const [comparisonOptions] = useState([
    'maior que', 'menor que', 'igual a',
  ]);

  function handleClick() {
    selectedFilters();
    const removeColumn = filterByNumericValues.column;
    console.log(columnOptions);
    const newColumns = columnOptions.filter((col) => col !== removeColumn);
    console.log(newColumns);
    setColumn(newColumns);
  }

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
      <label htmlFor="select-filter">
        Filtro por característica
        <select
          name="column"
          className="select-filter"
          data-testid="column-filter"
          onChange={ handleChange }
          value={ filterByNumericValues.column }
        >
          { columnOptions.map((op) => <option key={ op }>{op}</option>)}
        </select>
        <select
          name="comparison"
          className="select-filter"
          data-testid="comparison-filter"
          onChange={ handleChange }
          value={ filterByNumericValues.comparison }
        >
          { comparisonOptions.map((op) => <option key={ op }>{op}</option>)}
        </select>
        <input
          type="number"
          name="value"
          className="select-filter"
          data-testid="value-filter"
          onChange={ handleChange }
          value={ filterByNumericValues.value }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleClick }
        >
          Filtrar
        </button>
      </label>
    </header>
  );
}

export default Filters;
