export interface OrderModel {
    erpNumber: number
    erpStatus: string
    shopNumber: string
    shop: string
    date: string

    discounts: number
    totalShipping: number
    totalProducts: number
    totalOrder: number

    observations: string
    internalObservations: string

    integrationType: string

    client: {
        id: string
        name: string
        cnpj: string
        ie: string
        rg: string
        phone: string
        cell: string
        email: string
    }
    invoiceAccessKey: string
    invoiceNumber: number
    invoiceSerie: number
    items: [
        {
            sku: string
            name: string
            amount: number
            gtin: string
            unitValue: number
        }
    ]
    transport: string
    trackingCode: string
}

export interface IERPOrderProvider {
    normalize(raw: JSON): Promise<OrderModel>
}
