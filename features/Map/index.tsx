import React, { useEffect, useRef, useState } from 'react';
import { Dimensions } from 'react-native';
import ClusterMap from 'react-native-map-clustering';
import RNMaps, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SWRResponse } from 'swr';

import { DataShape } from '@/api/fetcher';
import { MapPinIcon } from '@/components/Icons/MapPinIcon';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

import { BottomData } from './BottomData';

const { height } = Dimensions.get('screen');

type Data = DataShape & { latitude: number; longitude: number };

export const MapView = ({ data, error }: Partial<SWRResponse<Data[]>>) => {
  const insets = useSafeAreaInsets();

  const mapRef = useRef<RNMaps | null>(null);

  const spiderLineColor = useThemeColor({}, 'highlight');

  const [isFit, setIsFit] = useState(false);
  const [clickedMarker, setClickedMarker] = useState<DataShape>();

  useEffect(
    function fitMarkers() {
      let timeout: NodeJS.Timeout;

      if (data?.length && !isFit) {
        timeout = setTimeout(() => {
          mapRef.current?.fitToCoordinates(data, {
            edgePadding: {
              ...insets,
              bottom: height / 8,
            },
          });
          setIsFit(true);
        }, 500);
      }

      return () => clearTimeout(timeout);
    },
    [data, isFit, insets]
  );

  const handleClickedMarker = (item: Data) => {
    if (item === clickedMarker) {
      setClickedMarker(undefined);
    } else {
      setClickedMarker(item);
    }
  };

  return (
    <ThemedView style={{ flex: 1 }}>
      {error && <ThemedText>Oops! Looks like something went wrong</ThemedText>}
      <ClusterMap
        clusterColor={spiderLineColor}
        clusteringEnabled
        initialRegion={{
          latitude: 39.7392,
          longitude: -104.9903,
          latitudeDelta: 8.5,
          longitudeDelta: 8.5,
        }}
        mapPadding={{
          ...insets,
          bottom: height / 8,
        }}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        ref={mapRef}
        spiderLineColor={spiderLineColor}
        style={{ flex: 1 }}
      >
        {data?.map((datum, i) => {
          return (
            <Marker
              coordinate={{
                latitude: datum.Latitude,
                longitude: datum.Longitude,
              }}
              hitSlop={20}
              identifier={datum.TimeStamp}
              key={`${i}-${datum.TimeStamp}`}
              onPress={() => handleClickedMarker(datum)}
            >
              <MapPinIcon
                color={
                  clickedMarker?.TimeStamp === datum.TimeStamp
                    ? '#fff'
                    : spiderLineColor
                }
                fill={spiderLineColor}
                height="32"
                width="32"
              />
            </Marker>
          );
        })}
      </ClusterMap>
      {isFit && <BottomData marker={clickedMarker} />}
    </ThemedView>
  );
};
