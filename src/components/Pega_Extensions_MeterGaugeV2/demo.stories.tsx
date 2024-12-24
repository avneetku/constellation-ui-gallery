
/* eslint-disable react/jsx-no-useless-fragment */
// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';

import PegaExtensionsMeterGaugeV2 from './index';


import configProps from './mock';

const meta: Meta<typeof PegaExtensionsMeterGaugeV2> = {
  title: 'PegaExtensionsMeterGaugeV2',
  component: PegaExtensionsMeterGaugeV2,
  excludeStories: /.*Data$/
};

export default meta;
type Story = StoryObj<typeof PegaExtensionsMeterGaugeV2>;

if (!window.PCore) {
  window.PCore = {};
}

const worklistData = {
  data: {
    data: [
      {
        pxProcessName: 'Loan',
        pxRefObjectInsName: ' A-8002',
        pyAssignmentStatus: 'New',
        pxTaskLabel: 'Details'
      },
      {
        pxProcessName: 'Loan',
        pxRefObjectInsName: ' A-7001',
        pyAssignmentStatus: 'Open',
        pxTaskLabel: 'Info'
      },
      {
        pxProcessName: 'Loan',
        pxRefObjectInsName: ' A-9000',
        pyAssignmentStatus: 'Open',
        pxTaskLabel: 'Amount'
      }
    ]
  }
};

export const BasePegaExtensionsMeterGaugeV2: Story = args => {
  window.PCore.getDataApiUtils = () => {
    return {
      getData: () => {
        return new Promise(resolve => {
          resolve(worklistData);
        });
      },
      getDataAsync: () => {
        return new Promise(resolve => {
          resolve(worklistData);
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
        <PegaExtensionsMeterGaugeV2 {...props} {...args} />
      </>
    );
};

BasePegaExtensionsMeterGaugeV2.args = {
  label: configProps.label,
  unit: configProps.unit,
  interval: configProps.interval,
  guageValue: configProps.guageValue
};
