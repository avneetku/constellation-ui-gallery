import { useEffect, useState } from 'react';
import { withConfiguration, Card } from '@pega/cosmos-react-core';
import type { PConnFieldProps } from './PConnProps';
import Table from './Table';

import GlobalStyle from './styles';

// interface for props
interface PegaExtensionsEmployeeAppraisalProps extends PConnFieldProps {
    datasource: Array<any>;
}

function PegaExtensionsEmployeeAppraisal(props: PegaExtensionsEmployeeAppraisalProps) {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { datasource = [], getPConnect } = props;
  const [worklist, setWorklist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const PConnect = getPConnect();
  const dataViewName = 'D_pyMyWorkList';
  const context = PConnect.getContextName();

  const columns = [
    { renderer: 'caseType', label: PConnect.getLocalizedValue('Case type', '', '') },
    { renderer: 'insKey', label: PConnect.getLocalizedValue('Key', '', '') },
    { renderer: 'status', label: PConnect.getLocalizedValue('Status', '', '') },
    { renderer: 'stage', label: PConnect.getLocalizedValue('Stage', '', '') }
  ];

  useEffect(() => {
    PCore.getDataApiUtils()
      .getData(dataViewName, {}, context)
      // @ts-ignore
      .then((response: any) => {
        setIsLoading(false);
        if (response.data.data !== null) {
          // table requires an index or will get setExtraStackFrame error
          setWorklist(
            response.data.data.map((entry: any, index: number) => {
              // mapping the data into the column names
              // MUST have an id/index or will get a setExtraStackFrame error
              // put a key in the table
              return {
                caseType: entry.pxProcessName,
                insKey: entry.pxRefObjectInsName,
                status: entry.pyAssignmentStatus,
                stage: entry.pxTaskLabel,
                id: index
              };
            })
          );
        }
        else {
          setWorklist([]);
          setIsLoading(false);
        }

      })
      .catch((error: any) => {
        setWorklist([]);
        setIsLoading(false);
        // eslint-disable-next-line no-console
        console.log(error);
      });
  }, [context]);

  return (
    <>
      <GlobalStyle />
      <Card>
        <Table
          title={PConnect.getLocalizedValue('Employees', '', '')}
          columns={columns}
          data={worklist}
          loading={isLoading}
          loadingMessage={PConnect.getLocalizedValue('Loading Employees', '', '')}
        />
      </Card>
    </>
  );

}

export default withConfiguration(PegaExtensionsEmployeeAppraisal);
