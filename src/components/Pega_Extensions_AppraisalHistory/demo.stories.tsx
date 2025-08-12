/* eslint-disable react/jsx-no-useless-fragment */
// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';

import PegaExtensionsAppraisalHistory from './index';


import configProps from './mock';

const meta: Meta<typeof PegaExtensionsAppraisalHistory> = {
  title: 'PegaExtensionsAppraisalHistory',
  component: PegaExtensionsAppraisalHistory,
  excludeStories: /.*Data$/
};

export default meta;
type Story = StoryObj<typeof PegaExtensionsAppraisalHistory>;

if (!window.PCore) {
  window.PCore = {};
}

const employeesData = {
  data: {
    data: [
      {
        "JobTitle": "Operations Manager",
        "EmailAddress": "fatima.noor@example.com",
        "Department": "Operations",
        "JoiningDate": "2021-03-08",
        "ContactNumber": "9001001018",
        "EmployeeID": "EMP1",
        "EmployeeName": "Fatima Noor"
      },
      {
        "JobTitle": "Business Analyst",
        "EmailAddress": "isabella.rossi@example.com",
        "Department": "Product",
        "JoiningDate": "2019-10-16",
        "ContactNumber": "9001001016",
        "EmployeeID": "EMP2",
        "EmployeeName": "Isabella Rossi"
      }
    ]
  }
};

const appraisalData = {
  data: {
    data: [
      {
          "Emp_ID": "EMP1",
          "ManagerComments": "Test",
          "Year": 2024,
          "EmployeeComments": "Test",
          "HRFinalComments": "Test",
          "KRA": [
              {
                  "Learning": "5",
                  "Leadership": "5",
                  "JobKnowledge": "5",
                  "ID": "3",
                  "CommunicationSkills": "5",
                  "Flexibility": "5",
                  "Initiative": "5",
                  "PolicyAdherence": "5"
              },
              {
                  "Learning": "4",
                  "Leadership": "4",
                  "JobKnowledge": "2",
                  "ID": "2",
                  "CommunicationSkills": "4",
                  "Flexibility": "2",
                  "Initiative": "4",
                  "PolicyAdherence": "4"
              }
          ]
      },
      {
          "Emp_ID": "EMP2",
          "ManagerComments": "Test",
          "Year": 2025,
          "EmployeeComments": "Test",
          "HRFinalComments": "Test",
          "KRA": [
              {
                  "Learning": "5",
                  "Leadership": "5",
                  "JobKnowledge": "5",
                  "ID": "3",
                  "CommunicationSkills": "5",
                  "Flexibility": "5",
                  "Initiative": "5",
                  "PolicyAdherence": "5"
              },
              {
                  "Learning": "4",
                  "Leadership": "4",
                  "JobKnowledge": "2",
                  "ID": "2",
                  "CommunicationSkills": "4",
                  "Flexibility": "2",
                  "Initiative": "4",
                  "PolicyAdherence": "4"
              }
          ]
      }
    ]
  }
};

export const BasePegaExtensionsAppraisalHistory: Story = args => {
  window.PCore.getDataApiUtils = () => {
    return {
      getData: (dataPageName: string) => {
        return new Promise(resolve => {
          setTimeout(() => {
            if (dataPageName === 'D_Employee2List') {
              resolve(employeesData);
            } else if (dataPageName === 'D_EmployeeKRAList') {
              resolve(appraisalData);
            } else {
              resolve({ data: { data: [] } });
            }
          }, 2000)
        });
      },
      getDataAsync: () => {
        return new Promise(resolve => {
          resolve(employeesData);
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
        <PegaExtensionsAppraisalHistory {...props} {...args} />
      </>
    );
};

BasePegaExtensionsAppraisalHistory.args = {
  dataPage: configProps.dataPage,
  title: configProps.title,
  loadingMessage: configProps.loadingMessage,
  detailsDataPage: configProps.detailsDataPage
};
