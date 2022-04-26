export const searchValidAddress = (text: string, prefix = 'bitsong') => {
  const regex = new RegExp(`${prefix}1[a-zA-Z0-9]{38}`, 'gm');
  let address: string;

  const matches = text.match(regex);

  if (matches && matches.length === 1) {
    matches.forEach((match) => {
      address = match;
    });
  }

  return address;
};
