import React, { useContext } from 'react';
import Context from '../context/Context';
import '../styles/Table.css';

function Table() {
  const { filteredPlanets, keys } = useContext(Context);

  function generateTableHeader() {
    return (
      <thead>
        <tr>
          { keys.map((key) => <th key={ key }>{key}</th>) }
        </tr>
      </thead>
    );
  }

  function generateTableRows() {
    return (
      <tbody>
        { filteredPlanets.map((e) => (
          <tr key={ e.name }>
            { keys.map((key) => <td key={ key }>{e[key]}</td>)}
          </tr>
        )) }
      </tbody>
    );
  }

  return (
    <table>
      { generateTableHeader() }
      { generateTableRows() }
    </table>
  );
}

export default Table;
