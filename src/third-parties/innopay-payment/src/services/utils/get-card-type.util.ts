export const getCardType = (panMasked: string): string => {
  const firstNumber = Number(panMasked[0]);

  if (firstNumber === 4) {
    return 'VISA';
  }

  if (firstNumber === 5) {
    return 'MASTERCARD';
  }

  throw new Error('Invalid pan masked');
};
