export const extractNumbers = (str : string) => {
  const numberPattern = /\d+/g;
  if (str) {
    return str.match( numberPattern )
  }
  return str
}
