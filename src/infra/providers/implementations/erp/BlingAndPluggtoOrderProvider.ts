/* eslint-disable dot-notation */
import {
    IERPOrderProvider,
    OrderModel,
} from '@infra/providers/models/erp/IERPOrderProvider'

export class BlingAndPluggtoOrderProvider implements IERPOrderProvider {
    async normalize(raw: JSON): Promise<OrderModel> {
        const realData = raw['retorno']['pedidos'][0].pedido
        const orderItens = realData.itens.map((data) => {
            return {
                sku: String(data.item.codigo),
                name: String(data.item.descricao),
                amount: Number(data.item.quantidade),
                gtin: String(data.item.gtin),
                unitValue: Number(data.item.valorunidade),
            }
        })

        if (
            realData.observacaointerna.includes(':') &&
            realData.tipoIntegracao.includes('Api')
        ) {
            const split = realData.observacaointerna.split(':')
            realData.tipoIntegracao = split[0].trim()
            realData.shopNumber = split[1]
        }

        const orderModel: OrderModel = {
            erpNumber: Number(realData.numero),
            erpStatus: realData.situacao,
            shopNumber: realData.numeroPedidoLoja,
            shop: realData.loja,
            date: realData.data,
            discounts: realData.desconto,
            totalProducts: realData.totalprodutos,
            totalShipping: realData.valorfrete,
            totalOrder: realData.totalvenda,
            observations: realData.observacoes,
            internalObservations: realData.observacaointerna,
            integrationType: realData.tipoIntegracao,

            client: {
                id: realData.cliente.id ?? '',
                cell: realData.cliente.celular ?? '',
                cnpj: realData.cliente.cnpj ?? '',
                email: realData.cliente.email ?? '',
                ie: realData.cliente.ie ?? '',
                name: realData.cliente.nome ?? '',
                phone: realData.cliente.fone ?? '',
                rg: realData.cliente.rg ?? '',
            },

            invoiceAccessKey: realData.nota?.chaveAcesso ?? '',
            invoiceNumber: realData.nota?.numero ?? 0,
            invoiceSerie: realData.nota?.serie ?? 0,

            transport: realData.transporte.transportadora ?? '',
            trackingCode: '',
            items: orderItens,
        }

        return orderModel
    }
}
