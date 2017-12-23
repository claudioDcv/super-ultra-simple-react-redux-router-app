export const extractNumbers = (str) => {
  const numberPattern = /\d+/g;
  if (str) {
    return str.match( numberPattern )
  }
  return str
}
