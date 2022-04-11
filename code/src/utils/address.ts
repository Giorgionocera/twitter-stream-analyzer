export const searchValidAddress = (text: string, prefix = 'bitsong') => {
  const regex = new RegExp(`${prefix}1[a-zA-Z0-9]{38}`, 'm');
  let address: string;

  let m: RegExpExecArray;

  if ((m = regex.exec(text)) !== null) {
    m.forEach((match) => {
      address = match;
    });
  }

  return address;
};
