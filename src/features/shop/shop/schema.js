import * as yup from 'yup';

import { CUISINE_TYPES, CUISINE_LABELS, dayAfterMap } from 'common/constants';

const WeekdaySchema = yup
  .array()
  .of(yup.object({ start: yup.string().required(), end: yup.string().required() }))
  .test('same value test', 'Start- und Endzeit dürfen nicht identisch sein.', function (value) {
    for (const range of value) {
      if (range.start === range.end) {
        return false;
      }
    }
    return true;
  })
  .test('same day overlap test', 'Die angegebenen Zeiten überschneiden sich.', function (value, context) {
    for (const range of value) {
      const rangeStart = parseInt(range.start.replace(':', ''));
      let rangeEnd = parseInt(range.end.replace(':', ''));
      if (rangeEnd === 0) {
        rangeEnd += 2400;
      }
      for (const nextRange of value) {
        if (range !== nextRange) {
          const nextRangeStart = parseInt(nextRange.start.replace(':', ''));
          let nextRangeEnd = parseInt(nextRange.end.replace(':', ''));
          if (nextRangeEnd === 0) {
            nextRangeEnd += 2400;
          }

          if (
            (rangeStart >= nextRangeStart && rangeStart < nextRangeEnd) ||
            (rangeEnd > nextRangeStart && rangeEnd < nextRangeEnd)
          ) {
            return false;
          }
        }
      }
    }
    return true;
  });

export const ShopSchema = yup.object({
  name: yup
    .string('Geben Sie einen Namen ein.')
    .min(1, 'Name ist erforderlich')
    .max(48, 'Name zu lang.')
    .required('Name ist erforderlich'),
  desc: yup
    .string('Geben Sie eine Kurzbeschreibung ein.')
    .max(48, 'Kurzbeschreibung zu lang.')
    .required('Kurzbeschreibung ist erforderlich'),
  descLong: yup
    .string('Geben Sie eine Beschreibung ein.')
    .max(1024, 'Beschreibung zu lang.')
    .required('Beschreibung ist erforderlich'),
  location: yup
    .object({
      postCode: yup
        .string('Geben Sie eine Postleitzahl ein.')
        .matches(/^\d{5}$/i, { message: 'Die Postleitzahl muss eine 5-stellige Zahlenfolge sein.' })
        .required('Postleitzahl ist erforderlich'),
      city: yup.string('Geben Sie den Ort ein.').required('Adresse ist erforderlich'),
      street: yup.string('Geben Sie den Straßennamen ein.').required('Straße ist erforderlich'),
      number: yup
        .string('Geben Sie die Hausnummer ein.')
        .max(5, 'Hausnummer zu lang.')
        .matches(/^(\d{1,4}[a-z]?)$/i, {
          message: 'Hausnummer muss eine Zahl sein oder eine Zahl auf die maximal ein Buchstabe folgt.',
        })
        .required('Hausnummer erforderlich'),
    })
    .required(),
  phoneNumber: yup
    .string('Geben Sie eine Telefonnumer ein.')
    .matches(/^\+?[0-9]+([0-9]|\/|\(|\)|-| ){7,}$/, {
      message: 'Das Format ist fehlerhaft',
      excludeEmptyString: true,
    })
    .required('Telefonnummer ist erforderlich'),
  url: yup
    .string('Geben Sie eine URL ein.')
    .matches(
      /^(www\.|[a-zA-Z0-9](.*[a-zA-Z0-9])?\.)?((?!www)[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9])\.[a-z]{2,5}(:[0-9]{1,5})?$/i,
      { message: 'Das Format ist fehlerhaft', excludeEmptyString: true },
    ),
  cuisineTypes: yup
    .array()
    .min(1, 'Es muss mindestens eine Kategorie ausgewählt werden.')
    .max(3, 'Es dürfen maximal 3 Kategorien ausgewählt werden.')
    .of(yup.string().oneOf(CUISINE_TYPES, 'Kategorie muss aus der vorgegebenen Liste ausgewählt werden'))
    .required(),
  cuisineLabels: yup
    .array()
    .of(yup.string().oneOf(CUISINE_LABELS, 'Label muss aus der vorgegebenen Liste ausgewählt werden'))
    .required(),
  isActive: yup
    .boolean('Geben Sie an, ob Ihre Gastronomie online gehen soll.')
    .required('Diese Angabe ist erforderlich'),
  isKosher: yup
    .boolean('Geben Sie an, ob Ihre Gastronomie das Essen Kosher zubereitet.')
    .required('Diese Angabe ist erforderlich'),
  openingHours: yup
    .object({
      monday: WeekdaySchema,
      tuesday: WeekdaySchema,
      wednesday: WeekdaySchema,
      thursday: WeekdaySchema,
      friday: WeekdaySchema,
      saturday: WeekdaySchema,
      sunday: WeekdaySchema,
    })
    .test('has opening hours test', 'Es muss mindestens eine Öffnungszeit angegeben sein.', function (value) {
      for (const weekday of Object.values(value)) {
        if (weekday?.length) {
          return true;
        }
      }
      return false;
    })
    .transform((value) => {
      const structuredTimes = {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: [],
      };
      for (const [weekday, ranges] of Object.entries(value)) {
        for (const range of ranges) {
          if (range.end < range.start && range.end !== '00:00') {
            structuredTimes[weekday].push({ start: range.start, end: '00:00' });
            structuredTimes[dayAfterMap[weekday]].push({ start: '00:00', end: range.end });
          } else {
            structuredTimes[weekday].push(range);
          }
        }
      }
      return structuredTimes;
    })

    .required(),
});

export const openingHoursOverlapSchema = yup
  .object({
    monday: WeekdaySchema,
    tuesday: WeekdaySchema,
    wednesday: WeekdaySchema,
    thursday: WeekdaySchema,
    friday: WeekdaySchema,
    saturday: WeekdaySchema,
    sunday: WeekdaySchema,
  })
  .transform((value) => {
    const structuredTimes = {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
    };
    for (const [weekday, ranges] of Object.entries(value)) {
      for (const range of ranges) {
        if (range.end < range.start && range.end !== '00:00') {
          structuredTimes[weekday].push({ start: range.start, end: '00:00' });
          structuredTimes[dayAfterMap[weekday]].push({ start: '00:00', end: range.end });
        } else {
          structuredTimes[weekday].push(range);
        }
      }
    }
    return structuredTimes;
  })
  .test('has opening hours test', 'Es muss mindestens eine Öffnungszeit angegeben sein.', function (value) {
    let hasOpeningHours = false;
    for (const weekday of Object.values(value)) {
      if (weekday?.length) {
        hasOpeningHours = true;
        break;
      }
    }

    return hasOpeningHours;
  })
  .test('overlap test', 'Die angegebenen Zeiten überschneiden sich.', function (value) {
    for (const ranges of Object.values(value)) {
      for (const range of ranges) {
        const rangeStart = parseInt(range.start.replace(':', ''));
        let rangeEnd = parseInt(range.end.replace(':', ''));

        if (rangeEnd === 0) {
          rangeEnd += 2400;
        }

        for (const otherRange of ranges) {
          if (range !== otherRange) {
            const otherRangeStart = parseInt(otherRange.start.replace(':', ''));
            let otherRangeEnd = parseInt(otherRange.end.replace(':', ''));

            if (otherRangeEnd === 0) {
              rangeEnd += 2400;
            }

            if (
              (rangeStart >= otherRangeStart && rangeStart < otherRangeEnd) ||
              (rangeEnd > otherRangeStart && rangeEnd < otherRangeEnd)
            ) {
              return false;
            }
          }
        }
      }
    }

    return true;
  });
