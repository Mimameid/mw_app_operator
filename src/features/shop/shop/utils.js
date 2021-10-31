export function sortWeekdayRanges(fieldArrays, weekday, index, newStart) {
  let newIndex = 0;
  for (let i = 0; i < fieldArrays[weekday].fields.length; i++) {
    const range = fieldArrays[weekday].fields[i];
    if (i !== index && newStart > range.start) {
      newIndex++;
    }
  }

  fieldArrays[weekday].move(index, newIndex);
}
