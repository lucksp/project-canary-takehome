import { useFont } from '@shopify/react-native-skia';
import React, { Fragment } from 'react';
import { CartesianChart, Line, useChartPressState } from 'victory-native';

import { useThemeColor } from '@/hooks/useThemeColor';

import fontFile from '../../assets/fonts/SpaceMono-Regular.ttf';
import { Indicator } from './Inidicator';

interface Props {
  data: {
    day: number;
    Ch4: number;
    C2H6: number;
  }[];
}

export const Chart = ({ data }: Props) => {
  const font = useFont(fontFile, 12);
  const color = useThemeColor({}, 'text');
  const { state, isActive } = useChartPressState({
    x: 0,
    y: { Ch4: 0, C2H6: 0 },
  });

  return (
    <>
      <CartesianChart
        axisOptions={{ font, labelColor: color }}
        chartPressState={state}
        data={data}
        domain={{
          y: [0, Math.max(...data.map(item => Math.max(item.Ch4, item.C2H6)))],
        }}
        padding={{
          top: 24,
        }}
        xAxis={{
          labelColor: color,
          font,
          formatXLabel: label => {
            const options: Intl.DateTimeFormatOptions = {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            };

            const time = new Date(label).toLocaleTimeString('en-US', options);

            return time;
          },
        }}
        xKey="day"
        yKeys={['Ch4', 'C2H6']}
      >
        {({ points }) => {
          return (
            <>
              <Line
                animate={{ type: 'timing', duration: 300 }}
                color={'#f0f'}
                points={points['Ch4']}
                strokeWidth={1}
              />
              <Line
                animate={{ type: 'timing', duration: 300 }}
                color={'#3c3'}
                points={points['C2H6']}
                strokeWidth={1}
              />

              {isActive ? (
                <>
                  <Indicator
                    color={'#f0f'}
                    text={
                      points['Ch4'][
                        Math.round(state.x.position.value)
                      ].yValue?.toString() || ''
                    }
                    x={state.x.position}
                    y={state.y.Ch4.position}
                  />
                  <Indicator
                    color={'#3c3'}
                    text={
                      points['C2H6'][
                        Math.round(state.x.position.value)
                      ].yValue?.toString() || ''
                    }
                    x={state.x.position}
                    y={state.y.C2H6.position}
                  />
                </>
              ) : null}
            </>
          );
        }}
      </CartesianChart>
    </>
  );
};
