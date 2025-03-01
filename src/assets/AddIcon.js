import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';
const AddIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="#000000"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-circle-plus"
    {...props}>
    <Circle cx={12} cy={12} r={10} />
    <Path d="M8 12h8" />
    <Path d="M12 8v8" />
  </Svg>
);
export default AddIcon;
