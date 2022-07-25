export interface OrderModel {
    data: any
    number: number
    date: string
    observations: string
    integrationType: string
    shop: string
    orderReference: string
    erpStatus: string
    client: {
        id: number
        name: string
        cnpj: string
        ie: string
        rg: string
        phone: string
        cell: string
        email: string
    }
    invoice: {
        serie: number
        number: number
        issuanceDate: string
        value: string
        accessKey: string
    }
    items: [
        {
            sku: string
            name: string
            amount: number
            gtin: string
        }
    ]
    transport: {
        shipping: string
        address: {
            recipient: string
            address: string
            number: string
            complement: string
            city: string
            district: string
            cep: string
            uf: string
        }
    }
}

export interface IERPOrderProvider {
    normalize(raw: JSON): Promise<OrderModel>
}
