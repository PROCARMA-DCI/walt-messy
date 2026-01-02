export function truncated(value: string | number) {
  const num = Number(value) || 0;
  const truncated = Math.trunc(num * 100) / 100;
  return truncated.toFixed(2); // returns a string like "10.00"
}

export const currencyFormatter = (
  value: number,
  currency: string = "USD",
  format: string = "en-US"
) => {
  const options: Intl.NumberFormatOptions = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  if (currency) {
    options.style = "currency";
    options.currency = currency;
  }

  const numberFormatter = new Intl.NumberFormat(format, options);
  const absTruncated = truncated(Math.abs(value));
  // We format the absolute value of the provided number to handle both positive and negative values.
  const num = Number(absTruncated); // Convert string back to number for formatting

  let formattedValue = numberFormatter.format(num);

  // If the value is negative, adjust the formatting
  if (value < 0) {
    if (currency) {
      formattedValue = formattedValue.replace(/^(\D+)/, "$1-");
    } else {
      formattedValue = `-${formattedValue}`;
    }
  }

  return formattedValue;
};
