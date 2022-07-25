/*
  Warnings:

  - The values [WAITING_PROCESS] on the enum `StatusList` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StatusList_new" AS ENUM ('PENDING', 'PAID', 'LABEL_ATTACHED', 'INVOICE_ATTACHED', 'WAITING_PROCCESS', 'IN_SEPARATION', 'IN_CONFERENCE', 'SENT', 'DELIVERED', 'CANCELLED', 'RETURNED');
ALTER TABLE "Status" ALTER COLUMN "status" TYPE "StatusList_new" USING ("status"::text::"StatusList_new");
ALTER TYPE "StatusList" RENAME TO "StatusList_old";
ALTER TYPE "StatusList_new" RENAME TO "StatusList";
DROP TYPE "StatusList_old";
COMMIT;

-- CreateTable
CREATE TABLE "Alert" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "addedAt" TEXT NOT NULL,
    "orderId" TEXT,

    CONSTRAINT "Alert_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Alert" ADD CONSTRAINT "Alert_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
