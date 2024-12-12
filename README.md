# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   yarn
   ```

2. Start the app

- Android:

```bash
 yarn android
```

- iOS:

```bash
 yarn ios
```

## Assignment

The goal of this exercise is to simulate a connection to third party sensor that is moving through an area collecting pollutant and air quality data.

This repo is derived from an early version of a mobile application developed by Project Canary. There may be some out of date libraries. Don't be too concerned about that, but if you'd like to update anything feel free to.

For the purposes of this exercise only worry about running the Android version of the app.

- Map Screen - Visualize the provided data on a map.
- Chart Screen - Visualize the Methane and Ethane data on a timeseries chart.
- Bonus - Can you set up the app to mock as if the data is streaming in live?

> Mock data can be found in `\src\mock-data`
