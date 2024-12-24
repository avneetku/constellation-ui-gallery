import { useEffect, useState, useCallback } from 'react';
import { withConfiguration } from '@pega/cosmos-react-core';
import type { PConnFieldProps } from './PConnProps';
import Header from './Header';
import EditRowPopup from './EditRowPopup';
import Pagination from './Pagination';
import ListComponent from './ListComponent';
import type {Data} from './interfaces';

import StyledPegaExtensionsGridWrapper from './styles';

interface PegaExtensionsGridProps extends PConnFieldProps {
  // If any, enter additional props that only exist on TextInput here
    dataViewName: string,
    sorting: boolean,
    stripedRows: boolean,
    loadingMessage: string,
    columnSearch: boolean,
    uniqueKey: string,
    tableColumns: string,
    fieldsToUpdate: string,
    savablePage: string
    pagination: boolean;
    pageSize: number;
}


function PegaExtensionsGrid(props: PegaExtensionsGridProps) {

  const { label, dataViewName, sorting, columnSearch, loadingMessage, getPConnect, stripedRows, uniqueKey, fieldsToUpdate, savablePage, tableColumns, pagination, pageSize } = props;
  const [gridData, setGridData] = useState([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [showDetailedError, setShowDetailedError] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const PConnect = getPConnect();
  const context = PConnect.getContextName();
  const [editPopupVisible, setEditPopupVisible] = useState(false);
  const [editableRow, setEditableRow] = useState<Data | null>(null);

  PCore.getDataApiUtils().getDataViewMetadata(dataViewName, context)
  .then((response : any) => {
    // eslint-disable-next-line no-console
    console.log(response);
  })
  .catch(e => {
    // eslint-disable-next-line no-console
    console.log(e);
  });

  const validateProps = useCallback(() => {
    const errors: string[] = [];

    // Check required properties
    if (!dataViewName) errors.push('Data View Name is required.');
    if (!uniqueKey) errors.push('Unique Key is required.');
    if (!savablePage) errors.push('Savable Page is required.');

    return errors;
  }, [dataViewName, uniqueKey, savablePage]);

  const getListCount = useCallback(() => {
    PCore.getDataApiUtils()
    .getListCount(dataViewName, {}, context)
    .then((response : any) => {
      const data = response.data;
      setTotalPages(Math.ceil(data.resultCount / pageSize));
    })
    .catch(() => {
      setTotalPages(0);
    });
  }, [dataViewName, context, pageSize]);


  const getData = useCallback(() => {
    const payload = pagination ? { paging: { pageNumber, pageSize } } : {};

    setIsLoading(true);
    PCore.getDataApiUtils()
      .getData(dataViewName, payload, context)
      // @ts-ignore
      .then((response: any) => {
        setIsLoading(false);
        if (response.data.data !== null) {
          const data = response.data.data;
          let columnNames: string[] = [];
          if (tableColumns?.trim()) {
            columnNames = tableColumns.split(',').map((col) => col.trim()).filter((col) => col);
          } else if (data.length > 0) {
            columnNames = Object.keys(data[0]);
          } else {
            columnNames = [];
          }

          // We need this to select Row
          if (!columnNames.includes(uniqueKey)) {
            columnNames.push(uniqueKey);
          }

          setColumns(columnNames);
          setGridData(
            data.map((d: any) => {
              const obj: any = {};
              columnNames.forEach((column) => {
                obj[column] = d[column] || '-';
              });
              return obj;
            })
          );
        }
        else {
          setGridData([]);
          setIsLoading(false);
        }
      })
      .catch((e: any) => {
        setGridData([]);
        setIsLoading(false);
        setError(e?.response?.data?.localizedValue || 'An unexpected error occurred.');
      });
    }, [dataViewName, context, tableColumns, pagination, pageNumber, pageSize, uniqueKey]);


  useEffect(() => {
    const errors = validateProps();
    if (errors.length > 0) {
      setValidationErrors(errors);
      setIsLoading(false);
    }
    if(dataViewName && pagination) {
      getListCount();
    }
    if(dataViewName) {
      getData();
    }
  }, [dataViewName, getData, pagination, getListCount, validateProps]);


  const toggleDetailedError = () => {
    setShowDetailedError((prev) => !prev);
  };

  const handlePageChange = (newPage: number) => {
    setPageNumber(newPage);
  };

  const handleUpdateRow = () => {
    setEditableRow({});
    setEditPopupVisible(false);
    getData();
  };

  return (
    <StyledPegaExtensionsGridWrapper>
      <Header label={label} />
      { validationErrors.length > 0 && (
        <div className="data-container error">
          <h3>Component Configuration Error</h3>
          <p className="mt10">
            The Component is not configured properly. Please check the required
            fields and format.
          </p>
          <button type="button" onClick={toggleDetailedError} className="mt10">
            {showDetailedError ? 'Hide Details' : 'Show Details'}
          </button>
          {showDetailedError && (
            <div>
              <ul>
                {validationErrors.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {isLoading &&
        (
          <div className="data-container error">
            <p>{loadingMessage}</p>
          </div>
        )
      }
      {!isLoading && error && (
        <div className="data-container error">
          <h3>Error</h3>
          <p>{error}</p>
        </div>
      )}
      {!isLoading && !error && gridData.length > 0 && (
        <ListComponent
          uniqueKey={uniqueKey}
          sorting={sorting}
          columnSearch={columnSearch}
          columns={columns}
          data={gridData}
          stripedRows={stripedRows}
          setEditableRow={setEditableRow}
          fieldsToUpdate={fieldsToUpdate}
          setEditPopupVisible={setEditPopupVisible}
        />
      )}

      {pagination && totalPages > 1 && !isLoading && !error && gridData.length > 0 && (
        <Pagination handlePageChange={handlePageChange} pageNumber={pageNumber} totalPages={totalPages} />
      )}

      {!isLoading && !error && gridData.length === 0 && dataViewName && (
        <div className="data-container">No Records Found</div>
      )}

      {editPopupVisible && (
        <EditRowPopup
          uniqueKey={uniqueKey}
          rowData={editableRow}
          onUpdate={handleUpdateRow}
          savablePage={savablePage}
          onClose={() => setEditPopupVisible(false)}
        />
      ) }

    </StyledPegaExtensionsGridWrapper>
  );

}

export default withConfiguration(PegaExtensionsGrid);
