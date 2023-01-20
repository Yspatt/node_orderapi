import { IImportOrderJob } from '@modules/order/jobs/IImportOrdersJob'

export interface Job {
    data: IImportOrderJob
}

export interface IOrderQueueProvider {
    addJob(job: IImportOrderJob): Promise<void>
    addManyJobs(jobs: IImportOrderJob[]): Promise<void>
    process(processFunction: (job: Job) => Promise<void>): void
}
