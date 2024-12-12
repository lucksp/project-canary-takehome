import { Circle, Text, useFont } from '@shopify/react-native-skia';
import React from 'react';
import { SharedValue } from 'react-native-reanimated';

import { useThemeColor } from '@/hooks/useThemeColor';

import fontFile from '../../assets/fonts/SpaceMono-Regular.ttf';

export function Indicator({
  x,
  y,
  color,
  text,
}: {
  text?: string;
  color: string;
  x: SharedValue<number>;
  y: SharedValue<number>;
}) {
  const textColor = useThemeColor({}, 'text');
  const font = useFont(fontFile, 12);

  return (
    <>
      <Circle color={color} cx={x} cy={y} r={8} />
      <Text color={textColor} font={font} text={text || ''} x={x} y={y} />
    </>
  );
}
