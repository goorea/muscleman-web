export interface Cell<T> {
  disablePadding: boolean;
  id: Exclude<keyof T, symbol>;
  label: string;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
}

export type Order = 'asc' | 'desc';
