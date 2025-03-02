import * as React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';
const RoomIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={28}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-users-round"
    {...props}>
    <Path d="M18 21a8 8 0 0 0-16 0" />
    <Circle cx={10} cy={8} r={5} />
    <Path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3" />
  </Svg>
);
export default RoomIcon;
