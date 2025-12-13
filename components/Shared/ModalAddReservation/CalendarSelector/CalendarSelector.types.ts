export type CalendarSelectorProps = React.HTMLAttributes<HTMLElement> & {
  setDateSelected: React.Dispatch<
    React.SetStateAction<{ from: Date | undefined; to: Date | undefined }>

  >;
  carPriceDay: string;
}
