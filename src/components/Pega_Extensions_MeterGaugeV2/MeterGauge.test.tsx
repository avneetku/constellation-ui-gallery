import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MeterGauge from './MeterGauge';

describe('MeterGauge Component', () => {
  it('renders the gauge value correctly', () => {
    render(<MeterGauge value={100} unit="km/h" interval={50} />);
    const gaugeReadout = screen.getByText('100 km/h');
    expect(gaugeReadout).toBeInTheDocument();
  });

  it('clamps the value to the range 0-200', () => {
    render(<MeterGauge value={250} unit="km/h" interval={50} />);
    const gaugeReadout = screen.getByText('200 km/h'); // Clamped to 200
    expect(gaugeReadout).toBeInTheDocument();
  });

  it('renders the needle with the correct color based on value thresholds', () => {
    render(<MeterGauge value={30} unit="km/h" interval={50} />);
    const needle = screen.getByTestId('needle');
    expect(needle).toHaveAttribute('stroke', 'green'); // Green for values <= interval
  });

  it('renders all major ticks and labels', () => {
    render(<MeterGauge value={100} unit="km/h" interval={50} />);
    const majorTicks = [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200];
    majorTicks.forEach((tick) => {
      expect(screen.getByText(tick.toString())).toBeInTheDocument();
    });
  });

  it('renders the gauge with correct arcs and colors', () => {
    render(<MeterGauge value={100} unit="km/h" interval={50} />);
    const arcs = screen.getAllByRole('presentation');
    expect(arcs).toHaveLength(3); // Three arcs for green, yellow, red


  });


});
