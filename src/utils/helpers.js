export const extractNumbers = (str : string) => {
  const numberPattern = /\d+/g;
  if (str) {
    return str.match( numberPattern )
  }
  return str
}

export const genderToIcon = (gender : string) => {
  const options = {
    male: 'male',
    female: 'female',
    'n/a': 'question',
    hermaphrodite: 'question',
    none: 'question',
  }
  return options[gender] || 'question'
}
