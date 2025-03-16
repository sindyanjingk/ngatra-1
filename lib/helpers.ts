export function formatIDR(amount: number): string {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0, // Agar selalu bulat
    }).format(Math.round(amount));
  }

  export const formatUSD = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  export const convertUsdToIdr = (amount: number, exchangeRate: number): string => {
    const convertedAmount = amount * exchangeRate;
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(convertedAmount);
  };

  export const oneUsd = 16350