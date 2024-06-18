export function listHasNoErrors<T>(list: Array<T | Error>): list is Array<T> {
  return !list.some((item) => item instanceof Error);
}
