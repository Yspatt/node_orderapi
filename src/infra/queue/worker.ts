import { BlingAndPluggtoOrderProvider } from '@infra/providers/implementations/erp/BlingAndPluggtoOrderProvider'
import { BlingImportAllOrdersProvider } from '@infra/providers/implementations/erp/BlingImportAllOrdersProvider'
import { BullProvider } from '@infra/providers/implementations/queue/BullProvider'

const importQueueProvider = new BullProvider()
const importAllOrders = new BlingImportAllOrdersProvider()
const normalizer = new BlingAndPluggtoOrderProvider()

importQueueProvider.process(async ({ data }) => {
    await importAllOrders.importOrders(data.status, normalizer)
})
