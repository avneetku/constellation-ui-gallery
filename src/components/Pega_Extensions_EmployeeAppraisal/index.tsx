import { useEffect, useState, useMemo } from 'react';
import { withConfiguration, Card } from '@pega/cosmos-react-core';
import type { PConnFieldProps } from './PConnProps';
import Table from './Table';
import Search from './Search';
import Pagination from './Pagination';
import Appraisals from './Appraisals';

import GlobalStyle from './styles';

// interface for props
interface PegaExtensionsEmployeeAppraisalProps extends PConnFieldProps {
    dataPage: string;
    title: string;
    loadingMessage: string;
    columns: string;
}

interface Employee {
  EmployeeID: string;
  EmployeeName: string;
  [key: string]: any;
}

function PegaExtensionsEmployeeAppraisal(props: PegaExtensionsEmployeeAppraisalProps) {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { getPConnect, dataPage, title, loadingMessage, columns } = props;
  // const [employees, setEmployees] = useState([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const PConnect = getPConnect();
  const dataViewName = 'D_Employee2List';
  const context = PConnect.getContextName();

  const [selectedEmployee, setSelectedEmployee] = useState<{ id: string; } | null>(null);
  const [appraisalData, setAppraisalData] = useState<any[]>([]);

  const rawColumns = useMemo(() => {
    return columns ? columns.split(',').map(col => col.trim()) : [];
  }, [columns]);

  const parsedColumns = rawColumns.map(col => ({
    renderer: col,
    label: PConnect.getLocalizedValue(col, '', '')
  }));

  useEffect(() => {
    PCore.getDataApiUtils()
      .getData(dataViewName, {}, context)
      .then((response: any) => {
        setIsLoading(false);
        if (response.data.data !== null) {
          console.log(response);
          setEmployees(
            response.data.data.map((entry: any, index: number) => {
              const row: any = { id: index };
              rawColumns.forEach(col => {
                row[col] = entry?.[col] ?? '';
              });
              return row;
            })
          );
        } else {
          setEmployees([]);
        }
      })
      .catch((error: any) => {
        setEmployees([]);
        setIsLoading(false);
        console.log(error);
      });
  }, [context, rawColumns]);


  const handleSearch = (value: string) => {
    // eslint-disable-next-line no-console
    console.log(value);
    setSearchText(value)
  }

  const handleViewDetails = (EmployeeID: string) => {
    // eslint-disable-next-line no-console
    console.log('View details clicked for:', EmployeeID);

    const selected = employees.find((emp : any) => emp.EmployeeID === EmployeeID);
    console.log(selected);

    setSelectedEmployee({ id: EmployeeID });

    setIsLoading(true);

    PCore.getDataApiUtils()
    .getData('D_AppraisalByEmployeeID', {}, context)
    .then((response: any) => {
      setIsLoading(false);
      // eslint-disable-next-line no-console
      console.log(response);
      if (response.data.data !== null) {
        setAppraisalData(response.data.data);
      } else {
        setAppraisalData([]);
      }
    })
    .catch((error: any) => {
      setAppraisalData([]);
      setIsLoading(false);
    });
  };

  return (
    <>
      <div className='dashboard'>
        <GlobalStyle />
        <Card className="card">
          <Search placeholder='Search by Employee ID or Name...' onChange={(value) => handleSearch(value)} />
          <h1>{PConnect.getLocalizedValue(title, '', '')}</h1>
          <br/>
          <Table
            columns={parsedColumns}
            data={employees}
            loading={isLoading}
            loadingMessage={PConnect.getLocalizedValue(loadingMessage, '', '')}
            onClick={handleViewDetails}
          />
          <Appraisals appraisals={appraisalData} employeeId={selectedEmployee?.id ?? null} EmployeeName={""} />
        </Card>
      </div>
    </>
  );
}

export default withConfiguration(PegaExtensionsEmployeeAppraisal);
