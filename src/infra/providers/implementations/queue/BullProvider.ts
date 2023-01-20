import { Queue, QueueScheduler, Worker } from 'bullmq'

import {
    IOrderQueueProvider,
    Job,
} from '@infra/providers/models/IOrderQueueProvider'
import { redisConnection } from '@infra/redis/connection'
import { IImportOrderJob } from '@modules/order/jobs/IImportOrdersJob'

export class BullProvider implements IOrderQueueProvider {
    private queue: Queue

    constructor() {
        this.queue = new Queue('import-queue', {
            connection: redisConnection,
            defaultJobOptions: {
                removeOnComplete: false,
                attempts: 5,
                backoff: {
                    type: 'exponential',
                    delay: 60000,
                },
            },
        })
    }

    async addJob(job: IImportOrderJob): Promise<void> {
        await this.queue.add('request', job)
    }

    async addManyJobs(jobs: IImportOrderJob[]): Promise<void> {
        throw new Error('Method not implemented.')
    }

    process(processFunction: (job: Job) => Promise<void>): void {
        new Worker('import-queue', processFunction, {
            connection: redisConnection,
            concurrency: 100,
            limiter: {
                max: 400,
                duration: 1000,
            },
        })

        new QueueScheduler('import-queue', {
            connection: redisConnection,
        })
    }
}
