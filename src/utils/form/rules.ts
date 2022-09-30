export const requiredInput = <T extends string>(val: T) =>
  (val && val.length > 0) || 'Please type something';
