export type TableRowAvoidedProps = {
  label: string;
  value: string | undefined;
  pattern?: string;
  currency?: boolean;
  formatter?: (s: string) => string | undefined;
};
