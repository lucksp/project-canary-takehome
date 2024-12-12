export interface DataShape {
  TimeStamp: string;
  Ch4: number;
  C2H6: number;
  Latitude: number;
  Longitude: number;
}

export const fetcher = () => {
  const csvData = require('../mock-data/data.json');
  return Promise.resolve(csvData);
};
