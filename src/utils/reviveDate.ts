export default function reviveDate(key: string, value: string): Date | string {
  // Matches strings like "2022-08-25T09:39:19.288Z"
  const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
  return typeof value === 'string' && isoDateRegex.test(value) 
    ? new Date(value) 
    : value
}
