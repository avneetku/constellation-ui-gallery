
/* eslint-disable react/jsx-no-useless-fragment */
// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';

import PegaExtensionsDataGrid from './index';


import configProps from './mock';

const meta: Meta<typeof PegaExtensionsDataGrid> = {
  title: 'PegaExtensionsDataGrid',
  component: PegaExtensionsDataGrid,
  excludeStories: /.*Data$/
};

export default meta;
type Story = StoryObj<typeof PegaExtensionsDataGrid>;

if (!window.PCore) {
  window.PCore = {};
}

const worklistData = {
  data: {
    data: [
      { pxProcessName: 'Loan', pxRefObjectInsName: 'A-8002', pyAssignmentStatus: 'New', pxTaskLabel: 'Details' },
      { pxProcessName: 'Loan', pxRefObjectInsName: 'A-7001', pyAssignmentStatus: 'Open', pxTaskLabel: 'Info' },
      { pxProcessName: 'Loan', pxRefObjectInsName: 'A-8002-2', pyAssignmentStatus: 'New', pxTaskLabel: 'Details' },
      { pxProcessName: 'Loan', pxRefObjectInsName: 'A-7001-2', pyAssignmentStatus: 'Open', pxTaskLabel: 'Info' },
      { pxProcessName: 'Loan', pxRefObjectInsName: 'A-8002-3', pyAssignmentStatus: 'New', pxTaskLabel: 'Details' },
      { pxProcessName: 'Loan', pxRefObjectInsName: 'A-7001-3', pyAssignmentStatus: 'Open', pxTaskLabel: 'Info' },
      { pxProcessName: 'Loan', pxRefObjectInsName: 'A-8002-4', pyAssignmentStatus: 'New', pxTaskLabel: 'Details' },
      { pxProcessName: 'Loan', pxRefObjectInsName: 'A-7001-4', pyAssignmentStatus: 'Open', pxTaskLabel: 'Info' },
      { pxProcessName: 'Loan', pxRefObjectInsName: 'A-8002-5', pyAssignmentStatus: 'New', pxTaskLabel: 'Details' },
      { pxProcessName: 'Loan', pxRefObjectInsName: 'A-7001-5', pyAssignmentStatus: 'Open', pxTaskLabel: 'Info' },
      { pxProcessName: 'Loan', pxRefObjectInsName: 'A-9000', pyAssignmentStatus: 'Open', pxTaskLabel: 'Amount' }
    ]
  }
};

export const BasePegaExtensionsDataGrid: Story = args => {
  window.PCore.getDataApiUtils = () => {
    return {
      getData: () => {
        return new Promise(resolve => {
          resolve(worklistData);
        });
      },
      getListCount: () => {
        return new Promise(resolve => {
          resolve({ fetchDateTime: "2020-06-29T11:06:23.896Z", hasMoreResults: false, resultCount: 100 });
        });
      },
      getDataViewMetadata: () => {
        return new Promise(resolve => {
          resolve({});
        });
      },
      postData: () => {
        return new Promise(resolve => {
          resolve(true);
        });
      },
      getDataAsync: () => {
        return new Promise(resolve => {
          resolve(worklistData);
        });
      }
    };
  };

  window.PCore.getRestClient = () => {
    return {
      invokeRestApi: () => {
        return new Promise(resolve => {
          resolve({ s : true});
        });
      }
    };
  };

  const props = {
    ...configProps,
    getPConnect: () => {
      return {
        getValue: value => {
          return value;
        },
        getContextName: () => {
          return 'app/primary_1';
        },
        getLocalizedValue: value => {
          return value;
        },
        getActionsApi: () => {
          return {
            updateFieldValue: () => {
              /* nothing */
            },
            triggerFieldChange: () => {
              /* nothing */
            }
          };
        },
        ignoreSuggestion: () => {
          /* nothing */
        },
        acceptSuggestion: () => {
          /* nothing */
        },
        setInheritedProps: () => {
          /* nothing */
        },
        resolveConfigProps: () => {
          /* nothing */
        }
      };
    }
  };

  return (
      <>
        <PegaExtensionsDataGrid {...props} {...args} />
      </>
    );
};

BasePegaExtensionsDataGrid.args = {
  label: configProps.label,
  uniqueKey: configProps.uniqueKey,
  tableColumns: configProps.tableColumns,
  dataViewName: configProps.dataViewName,
  loadingMessage: configProps.loadingMessage,
  sorting: configProps.sorting,
  columnSearch: configProps.columnSearch,
  stripedRows: configProps.stripedRows,
  pagination: configProps.pagination,
  pageSize: configProps.pageSize,
  savablePage: configProps.savablePage,
  fieldsToUpdate: configProps.fieldsToUpdate
};
