"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlingOrderProvider = void 0;

/* eslint-disable dot-notation */
class BlingOrderProvider {
  async normalize(raw) {
    const realData = raw['retorno']['pedidos'][0].pedido;
    const orderItens = realData.itens.map(data => {
      return {
        sku: String(data.item.codigo),
        name: String(data.item.descricao),
        amount: Number(data.item.quantidade),
        gtin: String(data.item.gtin)
      };
    });
    const orderModel = {
      shop: realData.loja,
      date: realData.data,
      number: Number(realData.numero),
      erpStatus: realData.situacao,
      observations: realData.observacoes,
      integrationType: realData.tipoIntegracao,
      orderReference: realData.numeroPedidoLoja,
      data: realData.data,
      client: {
        cell: realData.cliente.celular ?? '',
        cnpj: realData.cliente.cnpj ?? '',
        email: realData.cliente.email ?? '',
        ie: realData.cliente.ie ?? '',
        id: Number(realData.cliente.id) ?? 0,
        name: realData.cliente.nome ?? '',
        phone: realData.cliente.fone ?? '',
        rg: realData.cliente.rg ?? ''
      },
      invoice: {
        accessKey: realData.nota.chaveAcesso,
        issuanceDate: realData.nota.dataEmissao,
        number: Number(realData.nota.numero),
        serie: Number(realData.nota.serie),
        value: realData.nota.valorNota
      },
      transport: {
        shipping: realData.transporte.transportadora ?? '',
        address: {
          address: realData.transporte.enderecoEntrega.endereco,
          cep: realData.transporte.enderecoEntrega.cep,
          city: realData.transporte.enderecoEntrega.cidade,
          complement: realData.transporte.enderecoEntrega.complemento,
          district: realData.transporte.enderecoEntrega.bairro,
          number: realData.transporte.enderecoEntrega.numero,
          recipient: realData.transporte.enderecoEntrega.nome,
          uf: realData.transporte.enderecoEntrega.uf
        }
      },
      items: orderItens
    };
    return orderModel;
  }

}

exports.BlingOrderProvider = BlingOrderProvider;