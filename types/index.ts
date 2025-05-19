export type Transaction = {
    id: string
    siteId: string | null
    productId: string | null
    phone: string | null
    totalAmount: number
    paymentMethod: string | null
    params: string | null
    timestamp: string
    name: string
    qty: number | null
    userId: string
    siteServiceId: string | null
    providerOrderId: string | null
    createdAt: string
    deletedAt: string | null
    link: string | null
    updatedAt: string
    status: string
    profit: number | null
    spent: number
  }
  