import { mapboxClient, weekdays } from 'common/constants';

export function sortWeekdayRanges(openingHours) {
  for (const ranges of Object.values(openingHours)) {
    ranges.sort((a, b) => {
      if (a.start === b.start) {
        return 0;
      } else if (a.start > b.start) {
        return 1;
      } else {
        return -1;
      }
    });
  }
}

export async function isAddressValid(location) {
  const formattedAddress = `${location.street} ${location.number} ${location.postCode} ${location.city}`;
  const data = await mapboxClient.geocoding
    .forwardGeocode({
      query: formattedAddress,
      countries: ['DE'],
      types: ['address'],
      autocomplete: false,
      fuzzyMatch: false,
    })
    .send();
  return !(data.body.features[0].relevance < 1);
}

export const getOpeningHoursErrorMessage = (openingHoursError) => {
  if (openingHoursError) {
    if (openingHoursError.message) {
      return openingHoursError.message;
    } else {
      for (const weekday of Object.keys(weekdays)) {
        if (openingHoursError[weekday]) {
          return openingHoursError[weekday].message;
        }
      }
    }
  }
};
