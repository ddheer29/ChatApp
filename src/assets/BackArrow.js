import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const BackArrowSVG = ({color = '#000'}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={28}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-chevron-left">
    <Path d="m15 18-6-6 6-6" />
  </Svg>
);
export default BackArrowSVG;
