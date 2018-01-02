export const dot = (obj, str) => str.split('.').reduce((o,i) => o[i], obj)
