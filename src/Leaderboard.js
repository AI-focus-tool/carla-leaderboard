// Leaderboard page component
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import './Pages.css';

function Leaderboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTrack, setActiveTrack] = useState('map');
  const [sorting, setSorting] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/api/leaderboard')
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching leaderboard data:', error);
        setError('Failed to load leaderboard data');
        setLoading(false);
      });
  }, []);

  const columns = React.useMemo(
    () => [
      {
        accessorKey: 'rank',
        header: 'Rank',
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'entry',
        header: 'Entry / Model',
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'score',
        header: 'Score',
        cell: info => info.getValue().toFixed(2),
      },
      {
        accessorKey: 'driving_score',
        header: 'Driving Score',
        cell: info => info.getValue().toFixed(2),
      },
      {
        accessorKey: 'route_completion',
        header: 'Route Completion (%)',
        cell: info => info.getValue().toFixed(1),
      },
      {
        accessorKey: 'infraction_penalty',
        header: 'Infraction Penalty',
        cell: info => info.getValue().toFixed(2),
      },
      {
        accessorKey: 'submissions',
        header: 'Submissions',
        cell: info => info.getValue(),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (loading) return <div className="loading">Loading leaderboard data...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="page-content">
      <div className="header-section">
        <h2>Leaderboard Rankings</h2>
        <p>Rankings of autonomous driving agents in Bench2Drive simulation</p>
      </div>

      <div className="tabs">
        <button 
          className={`tab ${activeTrack === 'map' ? 'active' : ''}`}
          onClick={() => setActiveTrack('map')}
        >
          Map Track
        </button>
        <button 
          className={`tab ${activeTrack === 'sensor' ? 'active' : ''}`}
          onClick={() => setActiveTrack('sensor')}
        >
          Sensor Track
        </button>
      </div>

      <div className="table-container">
        <table className="leaderboard-table">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? 'cursor-pointer select-none'
                            : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted()] ?? null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="info-section">
        <p className="info-text">
          Click on column headers to sort. Higher scores indicate better performance.
          Route completion shows the percentage of the route successfully completed.
        </p>
      </div>
    </div>
  );
}

export default Leaderboard;
