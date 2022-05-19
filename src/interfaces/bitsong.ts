export interface EventAttribute {
  key: string;
  value: string;
  index?: boolean;
}

export interface LogEvent {
  type: string;
  attributes: EventAttribute[];
}

export interface TransactionLog {
  events: LogEvent[];
}

export interface Transaction {
  height: string;
  txhash: string;
  data: string;
  raw_log: string;
  gas_wanted: string;
  gas_used: string;
  timestamp: string;
  logs: TransactionLog[];
}

export interface TransactionPagination {
  total_count: number;
  count: number;
  page_number: number;
  page_total: string;
  limit: number;
  txs: Transaction[];
}
