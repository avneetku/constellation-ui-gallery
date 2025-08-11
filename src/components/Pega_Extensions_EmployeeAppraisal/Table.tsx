import React from 'react';

type Column<T> = {
  renderer: keyof T | string; // changed from `key`
  label: string;
  render?: (row: T) => React.ReactNode;
};

type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  loadingMessage?: string;
  onClick: (value: string) => void;
};

function Table<T extends Record<string, any>>({
  columns,
  data,
  loading = false,
  loadingMessage = 'Loading...',
  onClick
}: TableProps<T>) {
  return (
    <div>
      { loading ? (
        <p className="notice">{loadingMessage}</p>
      ) : (
        <table>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={String(col.renderer)}>{col.label}</th>
              ))}
              <th>
                View All Appraisals
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>No data available</td>
              </tr>
            ) : (
              data.map((row) => (
                <tr key={row.EmployeeID}>
                  {columns.map((col) => (
                    <td key={String(col.renderer)}>
                      {col.render ? col.render(row) : row[col.renderer as keyof T]}
                    </td>
                  ))}
                  <td>
                    <button onClick={() => onClick(row.EmployeeID)}>View Details</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Table;
