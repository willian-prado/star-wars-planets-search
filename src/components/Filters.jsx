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
    filteredPlanets,
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
  const [sortOptions] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ]);
  const [selectedSort, setSelectedSort] = useState({
    column: 'population',
    sort: 'ASC',
  });

  function handleClickFilter() {
    selectedFilters();
    let columns = columnOptions;
    const removeColumn = filterByNumericValues.column;
    columns = columns.filter((col) => col !== removeColumn);
    setColumn(columns);
    if (!(removeColumn in usedColumns)) setUsedColumns([...usedColumns, removeColumn]);
    setActiveFilter(true);
    setFilterByNumericValues({ ...filterByNumericValues, column: columns[0] });
  }

  function handleClickOrder() {
    const { column, sort } = selectedSort;
    const planets = [...filteredPlanets];
    if (sort === 'ASC') {
      planets.sort((a, b) => a[column] - b[column]);
    }
    if (sort === 'DESC') {
      planets.sort((a, b) => b[column] - a[column]);
    }
    setFilteredPlanets(planets);
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      handleClickFilter();
    }
  }

  function resetFilter({ target }) {
    setFilteredPlanets(data);
    if (!(target.name in columnOptions)) setColumn([...columnOptions, target.name]);
    setUsedColumns(usedColumns.filter((col) => col !== target.name));
  }

  return (
    <header>
      <h2> Star Wars Planets Search </h2>
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
      <div className="container">
        <div className="filter-container">
          <h3>Filtro por característica</h3>
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
            onClick={ handleClickFilter }
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

        </div>
        <div className="sort-container">
          <h3>Ordenar por coluna</h3>
          <select
            className="select-order"
            data-testid="column-sort"
            value={ selectedSort.column }
            onChange={ ({ target: { value } }) => (
              setSelectedSort({ ...selectedSort, column: value })
            ) }
          >
            { sortOptions.map((op) => <option key={ op }>{op}</option>)}
          </select>
          <div className="radio-container">
            <p>Ascendente</p>
            <input
              type="radio"
              name="choice"
              value="ASC"
              data-testid="column-sort-input-asc"
              onClick={ ({ target: { value } }) => (
                setSelectedSort({ ...selectedSort, sort: value })
              ) }
            />
            <input
              type="radio"
              name="choice"
              value="DESC"
              data-testid="column-sort-input-desc"
              onClick={ ({ target: { value } }) => (
                setSelectedSort({ ...selectedSort, sort: value })
              ) }
            />
            <p>Descendente</p>
          </div>
          <button
            type="button"
            data-testid="column-sort-button"
            onClick={ handleClickOrder }
          >
            Ordenar
          </button>
        </div>
      </div>
    </header>
  );
}

export default Filters;
