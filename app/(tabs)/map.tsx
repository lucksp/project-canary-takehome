import React from 'react';
import useSWR from 'swr';

import { DataShape, fetcher } from '@/api/fetcher';
import { MapView } from '@/features/Map';

export default function MapScreen() {
  const { data, error } = useSWR<DataShape[]>(
    'map-data',
    async () => await fetcher()
  );

  return (
    <MapView
      data={data?.map(datum => ({
        ...datum,
        latitude: datum.Latitude,
        longitude: datum.Longitude,
      }))}
      error={error}
    />
  );
}
