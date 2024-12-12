/* eslint-disable @typescript-eslint/no-require-imports */
import { Dimensions, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useSWR from 'swr';

import { DataShape, fetcher } from '@/api/fetcher';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Chart } from '@/features/Chart';
import { useThemeColor } from '@/hooks/useThemeColor';
import { parseTimestamp } from '@/utils';

const { width } = Dimensions.get('screen');

export default function ChartScreen() {
  const insets = useSafeAreaInsets();
  const color = useThemeColor({}, 'onBackground');

  const { data, error } = useSWR<DataShape[]>(
    'map-data',
    async () => await fetcher()
  );

  const formatted = data?.map(item => {
    const date = parseTimestamp(item.TimeStamp);

    return {
      day: date.getTime(),
      Ch4: item.Ch4,
      C2H6: item.C2H6,
    };
  });

  return (
    <ThemedView
      style={[
        styles.container,
        {
          paddingTop: insets.top * 2,
          paddingBottom: insets.bottom * 2,
          paddingLeft: insets.left || 16,
          paddingRight: insets.right || 16,
        },
      ]}
    >
      <ThemedText type="subtitle">Chart Data of Ch4 and C2H6</ThemedText>
      {formatted && (
        <View style={{ backgroundColor: color, flex: 1 }}>
          <Chart data={formatted} />
        </View>
      )}
      {error && (
        <View style={{ height: width, width }}>
          <ThemedText>Something went wrong. Please try again.</ThemedText>
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
