import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useCallback, useRef } from 'react';
import { StyleSheet, View } from 'react-native';

import { DataShape } from '@/api/fetcher';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

interface Props {
  marker?: DataShape;
}

export const BottomData = ({ marker }: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const bg = useThemeColor({}, 'onBackground');
  const handle = useThemeColor({}, 'highlight');

  const handleSheetChanges = useCallback((index: number) => {
    if (index >= 0) {
      bottomSheetRef.current?.expand();
    }
  }, []);

  return (
    <BottomSheet
      handleIndicatorStyle={{
        backgroundColor: handle,
      }}
      handleStyle={{ backgroundColor: bg }}
      index={0}
      onChange={handleSheetChanges}
      ref={bottomSheetRef}
      snapPoints={['25%']}
    >
      <BottomSheetView style={styles.bottomSheetView}>
        <ThemedView style={[styles.themedView, { backgroundColor: bg }]}>
          {marker ? (
            <>
              <ThemedText type="subtitle">{marker.TimeStamp}</ThemedText>
              <View style={styles.spaceAroundContainer}>
                <View style={styles.rowSpaceAround}>
                  <View style={styles.iconTextContainer}>
                    <View style={styles.c2h6Icon} />
                    <ThemedText>C2H6: {marker.C2H6}</ThemedText>
                  </View>
                  <View style={styles.iconTextContainer}>
                    <View style={styles.ch4Icon} />
                    <ThemedText>Ch4: {marker.Ch4}</ThemedText>
                  </View>
                </View>
                <View>
                  <ThemedText>
                    Location: {marker.Latitude}, {marker.Longitude}{' '}
                  </ThemedText>
                </View>
              </View>
            </>
          ) : (
            <ThemedText type="subtitle">
              Choose a location to view data
            </ThemedText>
          )}
        </ThemedView>
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomSheetView: {
    flex: 1,
  },
  themedView: {
    flex: 1,
    padding: 16,
  },
  spaceAroundContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  rowSpaceAround: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  c2h6Icon: {
    backgroundColor: '#f0f',
    height: 32,
    width: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  ch4Icon: {
    backgroundColor: '#3c3',
    height: 32,
    width: 32,
    borderRadius: 16,
    marginRight: 8,
  },
});
