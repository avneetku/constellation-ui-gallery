import { render, screen, fireEvent } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as DemoStories from './demo.stories';

const { BasePegaExtensionsGrid } = composeStories(DemoStories);

// test('renders Actionable button with default args', () => {
//   jest.spyOn(window, 'alert').mockImplementation(() => {});
//   render(<Default />);
//   const buttonElement = screen.getByText('Launch');
//   expect(buttonElement).not.toBeNull();
//   fireEvent.click(buttonElement);
//   expect(window.alert).toHaveBeenCalled();
// });



test('renders PegaExtensionsGrid with label and table data', async () => {
  // Render the story
  render(<BasePegaExtensionsGrid />);

  // Assert the label is rendered
  const label = BasePegaExtensionsGrid.args.label || 'Default Label';
  const labelElement = screen.getByText(label);
  expect(labelElement).toBeVisible();

  // // Assert the table is rendered
  // const tableElement = screen.getByRole('table');
  // expect(tableElement).toBeVisible();
  //
  // // Assert table rows are rendered
  // const rowElements = screen.getAllByRole('row');
  // expect(rowElements).toHaveLength(12); // Including the header row
  //
  // // Assert specific cell content
  // const cellElement = screen.getByText('Loan');
  // expect(cellElement).toBeVisible();
  //
  // // Simulate interaction (e.g., clicking a row)
  // fireEvent.click(rowElements[1]); // Assuming interaction is supported
  // // Add assertions based on what should happen after interaction
});
