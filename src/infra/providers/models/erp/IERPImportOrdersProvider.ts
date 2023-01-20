import { IERPOrderProvider } from './IERPOrderProvider'

export interface IERPImportOrderProvider {
    importOrders(withStatus: string, orderNormalizer: IERPOrderProvider)
}
