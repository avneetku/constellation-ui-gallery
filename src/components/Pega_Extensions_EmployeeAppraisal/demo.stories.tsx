/* eslint-disable react/jsx-no-useless-fragment */
// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';

import PegaExtensionsEmployeeAppraisal from './index';


import configProps from './mock';

const meta: Meta<typeof PegaExtensionsEmployeeAppraisal> = {
  title: 'PegaExtensionsEmployeeAppraisal',
  component: PegaExtensionsEmployeeAppraisal,
  excludeStories: /.*Data$/
};

export default meta;
type Story = StoryObj<typeof PegaExtensionsEmployeeAppraisal>;

if (!window.PCore) {
  window.PCore = {};
}

const employeesData = {
  data: {
    data: [
      {
        EmployeeID: 'CTPL0123',
        EmployeeName: 'Alice',
        EmailAddress: 'alice@bitsinglass.com',
        department: 'Pega',
        jobTitle: 'Technical Lead',
        practice: 'Pega',
        action: 'View Details'
      },
      {
        EmployeeID: 'CTPL0456',
        EmployeeName: 'Bob',
        EmailAddress: 'bob@bitsinglass.com',
        department: 'Development',
        jobTitle: 'Software Engineer',
        practice: 'Pega',
        action: 'View Details'
      }
    ]
  }
};

const appraisalData = {
  data: {
    data: [
      {
        yearRange: '2024–2025',
        finalRating: 4,
        score: 84,
        kras: [
          { name: 'Flexibility', weightage: '15%', selfRating: 4, managerRating: 4.5, finalRating: 4.3 },
          { name: 'Job Knowledge', weightage: '15%', selfRating: 5, managerRating: 4.5, finalRating: 4.7 },
          { name: 'Initiative', weightage: '20%', selfRating: 4, managerRating: 4, finalRating: 4 },
          { name: 'Learning', weightage: '10%', selfRating: 3.5, managerRating: 4, finalRating: 3.8 },
          { name: 'Leadership', weightage: '10%', selfRating: 4, managerRating: 4.5, finalRating: 4.2 },
          { name: 'Communication Skills', weightage: '10%', selfRating: 3.5, managerRating: 4, finalRating: 3.8 },
          { name: 'Policy Adherence', weightage: '20%', selfRating: 5, managerRating: 4.5, finalRating: 4.7 }
        ],
        employeeComments: 'Delivered critical projects on time and contributed to process automation.',
        managerComments: 'Excellent delivery and ownership. Needs to improve in mentoring juniors.',
        hrComments: 'Final score calculated using weighted average. Ready for next-level responsibilities.'
      },
      {
        yearRange: '2023–2024',
        finalRating: 3,
        score: 75,
        kras: [
          { name: 'Flexibility', weightage: '15%', selfRating: 3.5, managerRating: 4, finalRating: 3.8 },
          { name: 'Job Knowledge', weightage: '15%', selfRating: 4, managerRating: 4, finalRating: 4 },
          { name: 'Initiative', weightage: '20%', selfRating: 3, managerRating: 3.5, finalRating: 3.3 },
          { name: 'Learning', weightage: '10%', selfRating: 4, managerRating: 4.2, finalRating: 4.1 },
          { name: 'Leadership', weightage: '10%', selfRating: 3.5, managerRating: 3.5, finalRating: 3.5 },
          { name: 'Communication Skills', weightage: '10%', selfRating: 3, managerRating: 3.5, finalRating: 3.3 },
          { name: 'Policy Adherence', weightage: '20%', selfRating: 4.5, managerRating: 4, finalRating: 4.2 }
        ],
        employeeComments: 'Handled client requests efficiently.',
        managerComments: 'Good progress but can improve communication.',
        hrComments: 'Consistent performer with good potential.'
      }
    ]
  }
};

export const BasePegaExtensionsEmployeeAppraisal: Story = args => {
  window.PCore.getDataApiUtils = () => {
    return {
      getData: (dataPageName: string) => {
        return new Promise(resolve => {
          if (dataPageName === 'D_Employee2List') {
            resolve(employeesData);
          } else if (dataPageName === 'D_AppraisalByEmployeeID') {
            resolve(appraisalData);
          } else {
            resolve({ data: { data: [] } });
          }
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
        <PegaExtensionsEmployeeAppraisal {...props} {...args} />
      </>
    );
};

BasePegaExtensionsEmployeeAppraisal.args = {
  dataPage: configProps.dataPage,
  title: configProps.title,
  loadingMessage: configProps.loadingMessage,
  displayAs: configProps.displayAs,
  columns: configProps.columns
};
