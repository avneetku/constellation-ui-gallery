import { withConfiguration } from '@pega/cosmos-react-core';
import type { PConnFieldProps } from './PConnProps';
import MeterGauge from './MeterGauge';
import StyledPegaExtensionsMeterGaugeV2Wrapper from './styles';

interface PegaExtensionsMeterGaugeV2Props extends PConnFieldProps {
  guageValue?: any;
  unit?: any;
  interval?: any;
}

// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
function PegaExtensionsMeterGaugeV2(props: PegaExtensionsMeterGaugeV2Props) {
  const { label, guageValue, unit, interval } = props;
  return (
    <StyledPegaExtensionsMeterGaugeV2Wrapper>
      <p> { label } </p>
      <MeterGauge value={guageValue} unit={unit} interval={interval} />
     </StyledPegaExtensionsMeterGaugeV2Wrapper>
  );
}

export default withConfiguration(PegaExtensionsMeterGaugeV2);
