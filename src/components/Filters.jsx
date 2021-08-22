import React, { useContext, useState } from 'react';
import Context from '../context/Context';
import '../styles/Filters.css';

function Filters() {
  const { filters,
    handleFilterByName,
    handleChange,
    selectedFilters,
    filterByNumericValues,
    setFilterByNumericValues,
    setFilteredPlanets,
    data,
  } = useContext(Context);
  const [columnOptions, setColumn] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ]);
  const [comparisonOptions] = useState([
    'maior que', 'menor que', 'igual a',
  ]);
  const [activeFilter, setActiveFilter] = useState(false);
  const [usedColumns, setUsedColumns] = useState([]);

  function handleClick() {
    selectedFilters();
    let columns = columnOptions;
    const removeColumn = filterByNumericValues.column;
    columns = columns.filter((col) => col !== removeColumn);
    setColumn(columns);
    if (!(removeColumn in usedColumns)) setUsedColumns([...usedColumns, removeColumn]);
    setActiveFilter(true);
    setFilterByNumericValues({ ...filterByNumericValues, column: columns[0] });
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      handleClick();
    }
  }

  function resetFilter({ target }) {
    setFilteredPlanets(data);
    if (!(target.name in columnOptions)) setColumn([...columnOptions, target.name]);
    setUsedColumns(usedColumns.filter((col) => col !== target.name));
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
          onKeyPress={ handleKeyPress }
          value={ filterByNumericValues.value }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleClick }
        >
          Filtrar
        </button>
        <div>
          { activeFilter
          && usedColumns.map((col) => (
            <div key={ col } data-testid="filter">
              {col}
              <button
                type="button"
                onClick={ resetFilter }
                name={ col }
              >
                X
              </button>
            </div>)) }
        </div>
      </label>
    </header>
  );
}

export default Filters;
