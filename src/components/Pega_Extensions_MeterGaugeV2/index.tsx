import { useEffect, useState, useCallback } from 'react';
import { withConfiguration } from '@pega/cosmos-react-core';
import type { PConnFieldProps } from './PConnProps';
import MeterGauge from './MeterGauge';
import StyledPegaExtensionsMeterGaugeV2Wrapper from './styles';

interface PegaExtensionsMeterGaugeV2Props extends PConnFieldProps {
  guageValue?: number; // Fallback or initial value
  unit?: string; // Unit of measure
  interval?: number; // Interval value
}

// Props passed in combination of props from property panel (config.json) and runtime props from Constellation
function PegaExtensionsMeterGaugeV2(props: PegaExtensionsMeterGaugeV2Props) {
  const { label, guageValue, unit, interval, getPConnect } = props;

  // State for the gauge value
  const [dynamicGaugeValue, setDynamicGaugeValue] = useState<number>(guageValue || 0);
  const [dynamicUnit, setDynamicUnit] = useState<string>(unit || '');
  const [dynamicInterval, setDynamicInterval] = useState<number>(interval || 0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const PConnect = getPConnect();
  const context = PConnect.getContextName();

  // Fetch data from the Pega API
  const fetchData = useCallback(() => {
    setIsLoading(true);
    try {
      PCore.getDataApiUtils()
        .getData('D_MeterGaugeList', {}, context)
        .then((response: any) => {

          setIsLoading(false);

          // Extract data from the response
          const meterData = response?.data?.data?.[0];
          if (meterData) {
            setDynamicGaugeValue(meterData.Value || guageValue || 0);
            setDynamicUnit(meterData.Unit || unit || '');
            setDynamicInterval(meterData.Interval || interval || 0);
          } else {
            setDynamicGaugeValue(guageValue || 0); // Fallback to guageValue
            setDynamicUnit(unit || '');
            setDynamicInterval(interval || 0);
          }
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err?.response?.data?.localizedValue || 'An error occurred while fetching data.');
        });
    } catch {
      setIsLoading(false);
      setError('Failed to fetch data.');
    }
  }, [context, guageValue, unit, interval]);

  // Trigger data fetch on component mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <StyledPegaExtensionsMeterGaugeV2Wrapper>
      <p>{label}</p>
      {isLoading && <p>Loading...</p>}
      {!isLoading && error && (
        <div className="error-container">
          <h3>Error</h3>
          <p>{error}</p>
        </div>
      )}
      {!isLoading && !error && (
        <MeterGauge
          value={dynamicGaugeValue} // Dynamic value fetched from API
          unit={dynamicUnit} // Dynamic unit fetched from API
          interval={dynamicInterval} // Dynamic interval fetched from API
        />
      )}
    </StyledPegaExtensionsMeterGaugeV2Wrapper>
  );
}

export default withConfiguration(PegaExtensionsMeterGaugeV2);