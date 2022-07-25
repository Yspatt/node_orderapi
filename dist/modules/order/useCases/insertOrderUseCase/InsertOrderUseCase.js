"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InsertOrderUseCase = void 0;

var _client = require("../../../../infra/prisma/client");

var _client2 = require("@prisma/client");

class InsertOrderUseCase {
  constructor(processOrderUseCase) {
    this.processOrderUseCase = processOrderUseCase;
  }

  async execute(model) {
    const data = await model;
    const upsert = await _client.prisma.order.upsert({
      where: {
        number: data.number
      },
      create: {
        erpStatus: data.erpStatus,
        integrationType: data.integrationType,
        number: data.number,
        observations: data.observations,
        orderReference: data.orderReference,
        shop: data.shop,
        client: {
          connectOrCreate: {
            where: {
              internalId: data.client.id
            },
            create: {
              internalId: data.client.id,
              cell: data.client.cell,
              cnpj: data.client.cnpj,
              email: data.client.email,
              ie: data.client.ie,
              name: data.client.name,
              phone: data.client.phone,
              rg: data.client.rg
            }
          }
        },
        invoice: {
          connectOrCreate: {
            create: {
              accessKey: data.invoice.accessKey,
              issuanceDate: data.invoice.issuanceDate,
              number: data.invoice.number,
              serie: data.invoice.serie,
              value: data.invoice.value
            },
            where: {
              accessKey: data.invoice.accessKey
            }
          }
        },
        transport: {
          create: {
            address: data.transport.address.address,
            cep: data.transport.address.cep,
            city: data.transport.address.city,
            complement: data.transport.address.complement,
            district: data.transport.address.district,
            number: data.transport.address.number,
            recipient: data.transport.address.recipient,
            uf: data.transport.address.uf,
            shipping: data.transport.shipping
          }
        },
        items: {
          create: data.items
        },
        status: {
          create: {
            id: data.number + _client2.StatusList.PENDING,
            status: _client2.StatusList.PENDING,
            observations: '',
            changedAt: new Date()
          }
        }
      },
      update: {
        erpStatus: data.erpStatus,
        integrationType: data.integrationType,
        number: data.number,
        observations: data.observations,
        orderReference: data.orderReference,
        shop: data.shop
      }
    });

    if (upsert) {
      await this.processOrderUseCase.execute({
        order: upsert
      });
      return upsert;
    } else {
      return null;
    }
  }

}

exports.InsertOrderUseCase = InsertOrderUseCase;