import { IERPImportOrderProvider } from '@infra/providers/models/erp/IERPImportOrdersProvider'
import { IERPOrderProvider } from '@infra/providers/models/erp/IERPOrderProvider'

export class BlingImportAllOrdersProvider implements IERPImportOrderProvider {
    constructor() {}

    importOrders(withStatus: string, orderNormalizer: IERPOrderProvider) {
        throw new Error('Method not implemented.')
    }
}
