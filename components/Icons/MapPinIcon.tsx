import React from 'react';
import { Path, Svg } from 'react-native-svg';

import { SVGProps } from './types';

export const MapPinIcon = ({
  color = '#292D32',
  width = '24',
  height = '24',
  fill,
}: SVGProps) => {
  return (
    <Svg height={height} viewBox="0 0 24 24" width={width}>
      <Path
        d="M4.11995 8.49C6.08995 -0.169998 18.92 -0.159997 20.88 8.5C22.03 13.58 18.87 17.88 16.1 20.54C14.09 22.48 10.91 22.48 8.88995 20.54C6.12995 17.88 2.96995 13.57 4.11995 8.49Z"
        fill={fill}
        stroke={color}
        strokeWidth="1.5"
      />
      <Path
        d="M9.75 11.5L11.25 13L15.25 9"
        fill={fill}
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </Svg>
  );
};
