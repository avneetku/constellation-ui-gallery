import React from 'react';

type Column<T> = {
  renderer: keyof T | string; // changed from `key`
  label: string;
  render?: (row: T) => React.ReactNode;
};

type TableProps<T> = {
  title?: string;
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  loadingMessage?: string;
};

function Table<T extends Record<string, any>>({
  title,
  columns,
  data,
  loading = false,
  loadingMessage = 'Loading...',
}: TableProps<T>) {
  return (
    <div className="dashboard">
      {title && <h1>{title}</h1>}

      {loading ? (
        <p className="notice">{loadingMessage}</p>
      ) : (
        <table>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={String(col.renderer)}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>No data available</td>
              </tr>
            ) : (
              data.map((row) => (
                <tr key={row.pxRefObjectInsName}>
                  {columns.map((col) => (
                    <td key={String(col.renderer)}>
                      {col.render ? col.render(row) : row[col.renderer as keyof T]}
                    </td>
                  ))}
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
