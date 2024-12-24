import React, { useState, useRef, useEffect } from 'react';
import Input from './Input';
import { Icon, registerIcon } from '@pega/cosmos-react-core';
import * as barsIcon from '@pega/cosmos-react-core/lib/components/Icon/icons/plus.icon';
import * as timesIcon from '@pega/cosmos-react-core/lib/components/Icon/icons/times.icon';
import { Button } from '@pega/cosmos-react-core';
import type {ListComponentProps, Data} from './interfaces';

registerIcon(barsIcon, timesIcon);


const ListComponent: React.FC<ListComponentProps> = ({ sorting, data, columns, stripedRows, columnSearch, uniqueKey, setEditableRow, setEditPopupVisible, fieldsToUpdate }) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);

  const [filters, setFilters] = useState<Record<string, string>>({});
  const [sortBy, setSortBy] = useState<string | null>(uniqueKey);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedRows, setselectedRows] = useState<number[]>([]);
  const [detailsPopupVisible, setDetailsPopupVisible] = useState(false);
  const [rowData, setRow] = useState<Data | null>(null);
  const [columnPopupVisible, setColumnPopupVisible] = useState(false);

  const [visibleColumns, setVisibleColumns] = useState<string[]>(columns.map((col) => col));

  useEffect(() => {
    setVisibleColumns(columns.map((col) => col));
  }, [columns]);

  // eslint-disable-next-line no-console
  console.log(sorting);

  // eslint-disable-next-line no-console
  console.log('data', data);

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }
  };

  const getSortedData = () => {
    if (!sortBy) return data;
    return [...data].sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return sortDirection === 'asc' ? -1 : 1;
      if (a[sortBy] > b[sortBy]) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const filteredData = getSortedData().filter((row) =>
    Object.keys(filters).every((key) => {
      const filterValue = filters[key]?.toLowerCase();
      const rowValue = (row[key]?.toString().toLowerCase()) || '';
      return rowValue.includes(filterValue);
    })
  );

  const updateColumn = (column: string) => {
    setVisibleColumns((prevColumns) =>
      prevColumns.includes(column)
        ? prevColumns.filter((col) => col !== column)
        : [...prevColumns, column]
    );
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  const handleCloseModal = () => {
    setDetailsPopupVisible(false);
    setRow(null);
  };

  const handleViewClick = (d: Data) => {
    setRow(d);
    setDetailsPopupVisible(true);
  };

  const handleEditClick = (row: Data) => {
    const selectedFields = fieldsToUpdate.split(',').map((field) => field.trim())
    .filter((field) => field);
    const filteredRow = selectedFields.reduce((acc, key) => {
      if (key in row) {
        acc[key] = row[key];
      }
      return acc;
    }, {} as Data);
    setEditableRow(selectedFields.length ? filteredRow : row);
    setEditPopupVisible(true);
  };


  return (
    <div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2', height: '50px' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>
              <button
                type="button"
                ref={buttonRef}
                onClick={() => setColumnPopupVisible(true)}
                style={{ height: '22px' }}
              >
                <Icon name="bars" />
              </button>
            </th>
            {columns
              .filter((col) => visibleColumns.includes(col))
              .map((col) => (
                <th
                  key={col}
                  onClick={() => handleSort(col)}
                  style={{ cursor: 'pointer' }}
                >
                  {col}
                  {sortBy === col &&
                    (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
              ))}
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Actions</th>
          </tr>
          {
            columnSearch &&
              <tr style={{ backgroundColor: '#ffffff', height: '50px' }}>
                <th>
                  <span style={{ display: 'none' }}>col</span>
                </th>
                {columns
                  .filter((col) => visibleColumns.includes(col))
                  .map((col) => (
                    <th key={col}>
                      <Input
                        placeholder={`Search ${col}`}
                        value={filters[col] || ''}
                        onChange={(value) => handleFilterChange(col, value)}
                      />
                    </th>
                  ))}
                <th>
                  <span style={{ display: 'none' }}>col</span>
                </th>
              </tr>
            }

        </thead>
        <tbody>
          {filteredData.map((row, index) => (
            <tr
              key={ row[uniqueKey] }
              style={{
                backgroundColor: (index % 2 === 0 && stripedRows ) ? '#f0f0f0' : '#ffffff',
                height: '50px',
              }}
            >
              <td style={{ textAlign: 'center' }}>
                <input
                  aria-label={`Select Row with uniqueKey ${row[uniqueKey]}`}
                  type="checkbox"
                  checked={selectedRows.includes(row[uniqueKey])}
                  onChange={() =>
                    setselectedRows((prev) =>
                      prev.includes(row[uniqueKey])
                        ? prev.filter((id) => id !== row[uniqueKey])
                        : [...prev, row[uniqueKey]]
                    )
                  }
                />

              </td>
              {columns
                .filter((col) => visibleColumns.includes(col))
                .map((col) => (
                  <td key={col}>
                    {row[col]}
                  </td>
                ))}
              <td>
                <Button onClick={() => handleViewClick(row)}>
                  View
                </Button>
                <Button onClick={() => handleEditClick(row)}>Edit</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        type="button"
        onClick={() => setDetailsPopupVisible(true)}
        style={{ marginTop: '20px', padding: '10px', cursor: 'pointer' }}
        disabled={selectedRows.length === 0}
      >
        Show Selected
      </button>

      {columnPopupVisible && (
        <div ref={popupRef} style={{
          position: 'fixed',
          top: '20px',
          left: '90px',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '10px',
            width: '220px',
            textAlign: 'left',
            boxShadow: '0px 0px 10px 4px rgba(0,0,0,0.1)'
          }}>
            <div>
              <b>Select Columns</b>
              <button
              style={{ display : 'none' }}
                type='button'
                ref={buttonRef}
                onClick={() => setColumnPopupVisible(false)}
                className="close-btn"
              >X
              </button>
              <Icon onClick={() => setColumnPopupVisible(false)} name='times' style={{'width':'0.4rem','height':'0.4rem', position: 'absolute', right: '10px' }} />
            </div>

            <div
            style={{
              minHeight: '90px',
              marginTop: '22px',
              overflowY: 'scroll'
            }}>

            <table>
                <tbody>
                  {columns.map((col) => (
                    <tr key={col} style={{ textTransform: 'capitalize'}}>
                      <th>
                        <input
                          aria-label={`Select Column  ${col}`}
                          type="checkbox"
                          checked={visibleColumns.includes(col)}
                          onChange={() => updateColumn(col)}
                        />
                      </th>
                      <th> <span>{ col }</span> </th>
                  </tr>
                  ))}
                </tbody>
                </table>
            </div>
          </div>
        </div>
      )}

      {detailsPopupVisible && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              width: '500px',
            }}
          >
            {rowData ? (
              <div>
                <h3>Details View</h3>
                <ul style={{ listStyle : 'none' }}>
                  {Object.entries(rowData).map(([key, value]) => (
                    <li key={key}>
                      <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{' '}
                      {typeof value === 'number'
                        ? `$${value.toLocaleString()}`
                        : value}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div>
                <h3 style={{ marginBottom: '10px'}}>Selected Rows</h3>
                {selectedRows.length > 0 ? (
                  <ul>
                    {filteredData
                      .filter((row) => selectedRows.includes(row[uniqueKey]))
                      .map((row) => (

                        <li key={row[uniqueKey]} style={{ marginBottom: '20px'}}>
                        {
                          Object.entries(row).map(([key, value]) => (
                            <div>
                              <strong>{ key.charAt(0).toUpperCase() + key.slice(1) }:</strong>{' '}
                              { typeof value === 'number'
                                ? `$${value.toLocaleString()}`
                                : value }
                            </div>
                          ))
                        }
                        </li>

                      ))}
                  </ul>
                ) : (
                  <p>No Row selected</p>
                )}
              </div>
            )}
            <button
              type="button"
              onClick={handleCloseModal}
              style={{ marginTop: '10px' }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>


  );
};

export default ListComponent;
