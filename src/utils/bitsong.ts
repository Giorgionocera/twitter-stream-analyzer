import { Transaction } from 'src/interfaces';

export const searchTransferAddresses = (txs: Transaction[]) => {
  const banned = [];

  for (const tx of txs) {
    for (const log of tx.logs) {
      const transfer = log.events.find((event) => event.type === 'transfer');

      if (transfer) {
        const recipient = transfer.attributes.find(
          (attribute) => attribute.key === 'recipient',
        );
        const sender = transfer.attributes.find(
          (attribute) => attribute.key === 'sender',
        );

        if (recipient && sender && recipient.value !== sender.value) {
          banned.push(recipient.value);
          banned.push(sender.value);
        }
      }
    }
  }

  return [...new Set(banned)];
};
