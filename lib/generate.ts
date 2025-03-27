export const generateOrderId = () => {
    // Ambil tanggal dan waktu sekarang
    const now = new Date();

    // Format datetime (YYYYMMDDHHmmss)
    const datetime = now.toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);

    // Generate random string (4 karakter alfanumerik)
    const randomString = Math.random().toString(36).substring(2, 6).toUpperCase();

    // Gabungkan menjadi order ID
    const orderId = `ORDER-${datetime}-${randomString}`;

    return orderId;
}

export const generateTopUpOrderId = () => {
    const now = new Date();

    // Format datetime (YYYYMMDDHHmmss)
    const datetime = now.toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);

    // Generate random string (4 karakter alfanumerik)
    const randomString = Math.random().toString(36).substring(2, 6).toUpperCase();

    // Gabungkan menjadi order ID
    const orderId = `TOPUP-${datetime}-${randomString}`;

    return orderId;
}