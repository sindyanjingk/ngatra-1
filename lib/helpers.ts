export function formatIDR(amount: number): string {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0, // Agar selalu bulat
    }).format(Math.round(amount));
  }