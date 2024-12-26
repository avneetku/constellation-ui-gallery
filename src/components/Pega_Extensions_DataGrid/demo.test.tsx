import { render, screen, act, fireEvent, within } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as DemoStories from './demo.stories';

const { BasePegaExtensionsDataGrid } = composeStories(DemoStories);

test('renders PegaExtensionsGrid with label', async () => {
  /* eslint-disable testing-library/no-unnecessary-act */
  await act(async () => {
    render(<BasePegaExtensionsDataGrid />);
  });

  const label = BasePegaExtensionsDataGrid.args.label || 'Default Label';
  const labelElement = screen.getByText(label);
  expect(labelElement).toBeVisible();
});

test('renders grid data when fetched', async () => {
  /* eslint-disable testing-library/no-unnecessary-act */
  await act(async () => {
    render(<BasePegaExtensionsDataGrid />);
  });

  const dataViewName = BasePegaExtensionsDataGrid.args.dataViewName || 'Default Data View';
  expect(dataViewName).toBeTruthy();

  const table = screen.getByRole('table');
  expect(table).toBeInTheDocument();

  const rows = screen.getAllByRole('row');
  expect(rows.length).toBeGreaterThan(0);
});

test('clicks view button in last table column and opens popup', async () => {
  /* eslint-disable testing-library/no-unnecessary-act */
  await act(async () => {
    render(<BasePegaExtensionsDataGrid />);
  });

  const table = screen.getByRole('table');
  expect(table).toBeInTheDocument();

  const rows = screen.getAllByRole('row');
  expect(rows.length).toBeGreaterThan(0);

  const lastRow = rows[rows.length - 1];
  const viewButton = within(lastRow).getByText('View');
  expect(viewButton).toBeInTheDocument();

  fireEvent.click(viewButton);

  const popup = screen.getByRole('dialog');
  expect(popup).toBeInTheDocument();
});
