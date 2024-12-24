import React from 'react';

// Type for props
interface MeterGaugeProps {
  value: number;
  unit: string;
  interval: number;
}

const MeterGauge: React.FC<MeterGaugeProps> = ({ value, unit, interval }) => {
  // Clamp the value between 0 and 200
  const clampedValue = Math.max(0, Math.min(value, 200));

  const gaugeValue = `${clampedValue} ${unit}`;

  // Calculate the angle for the needle based on the clamped numeric value
  const angle = (clampedValue / 200) * 180 - 180;

  // Calculate thresholds based on the interval
  const thresholds = [interval, interval * 2, 200];

  // Colors for each range
  const colors = ['green', 'yellow', 'red'];

  const getNeedleColor = (currentValue: number, thresholdValues: number[]): string => {
    if (currentValue <= thresholdValues[0]) return colors[0]; // Green
    if (currentValue <= thresholdValues[1]) return colors[1]; // Yellow
    return colors[2]; // Red
  };

  // Get needle color dynamically
  const needleColor = getNeedleColor(clampedValue, thresholds);

  // Helper to calculate arc path
  const getArcPath = (start: number, end: number, radius: number): string => {
    const startAngle = (start / 200) * 180 - 180; // Convert value to angle
    const endAngle = (end / 200) * 180 - 180;

    const startX = 50 + radius * Math.cos((startAngle * Math.PI) / 180);
    const startY = 50 + radius * Math.sin((startAngle * Math.PI) / 180);
    const endX = 50 + radius * Math.cos((endAngle * Math.PI) / 180);
    const endY = 50 + radius * Math.sin((endAngle * Math.PI) / 180);

    return `M ${startX} ${startY} A ${radius} ${radius} 0 0 1 ${endX} ${endY}`;
  };

  // Function to get the position of numbers on the arc
  const getCoordinates = (val: number, radius: number) => {
    const adjustedAngle = (val / 200) * 180 - 180;
    const x = 50 + radius * Math.cos((adjustedAngle * Math.PI) / 180);
    const y = 50 + radius * Math.sin((adjustedAngle * Math.PI) / 180);
    return { x, y };
  };

  // Define inline styles using React's CSSProperties type
  const styles: { [key: string]: React.CSSProperties } = {
    gaugeContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '20px',
      position: 'relative',
      fontFamily: 'Arial, sans-serif',
      width: '51.2%',
      height: 'auto',
    },
    gauge: {
      width: '100%',
      height: 'auto',
    },
    gaugeReadout: {
      marginTop: '100px',
      fontSize: '23px',
      color: '#333',
      fontWeight: 'bold',
      position: 'absolute',
      padding: '9px 12px',
      border: '2px solid #000',
      borderRadius: '30px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.14)',
    },
  };

  return (
    <div style={styles.gaugeContainer}>
      <svg style={styles.gauge} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        {/* Gauge Arcs */}
        {thresholds.map((end, index) => {
          const start = index === 0 ? 0 : thresholds[index - 1];
          return (
            <path
              key={end} // Use 'end' as the key instead of array index
              d={getArcPath(start, end, 48)} // Outer radius for the arc
              fill="none"
              stroke={colors[index]} // Correct use of colors array
              strokeWidth="4"
               role="presentation"
            />
          );
        })}

        {/* Background circle */}
        <circle cx="50" cy="50" r="45" fill="#fff" stroke="#f3f3f3" strokeWidth="8" />
        <path d="M 5 50 A 45 45 0 0 1 95 50" fill="none" stroke="#f3f3f3" strokeWidth="8" />

        {/* Major numbers from 0 to 200 */}
        {[0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200].map((num) => {
          const { x, y } = getCoordinates(num, 32);
          return (
            <text
              key={num}
              x={x}
              y={y + 2}
              fontSize="3.7px"
              textAnchor="middle"
              fill="#000"
              fontWeight="600"
              dominantBaseline="middle"
            >
              {num}
            </text>
          );
        })}

        {/* Small tick marks */}
        {Array.from({ length: 21 }).map((_, i) => {
          const minorValue = i * 10;
          const { x: x1, y: y1 } = getCoordinates(minorValue, 38);
          const { x: x2, y: y2 } = getCoordinates(minorValue, 44);
          return (
            <line
              key={minorValue}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#b7b4b4"
              strokeWidth={i % 2 === 0 ? '1.5' : '0.4'}
            />
          );
        })}

        {/* Needle */}
        <defs>
          <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="3" refY="2.8" orient="auto">
            <polygon points="0 0, 6 2.5, 0 5" fill={needleColor} />
          </marker>
        </defs>

        <line
          x1="50"
          y1="50"
          x2={50 + 38 * Math.cos((angle * Math.PI) / 180)}
          y2={50 + 38 * Math.sin((angle * Math.PI) / 180)}
          stroke={needleColor} // Dynamic color based on gauge value
          strokeWidth="0.8"
          markerEnd="url(#arrowhead)"
          style={{
            transition: 'x2 0.5s ease, y2 0.5s ease', // Add smooth transition to x2 and y2
          }}
          data-testid="needle"
        />

        {/* Center of the gauge */}
        <circle cx="50" cy="50" r="3" fill={needleColor} strokeWidth="1" stroke="#af612a" />
      </svg>
      <div style={styles.gaugeReadout}>{gaugeValue}</div>
    </div>
  );
};

export default MeterGauge;
