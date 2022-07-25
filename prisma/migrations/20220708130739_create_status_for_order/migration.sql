-- CreateEnum
CREATE TYPE "StatusList" AS ENUM ('PENDING', 'PAID', 'LABEL_ATTACHED', 'INVOICE_ATTACHED', 'WAITING_PROCESS', 'IN_SEPARATION', 'IN_CONFERENCE', 'SENT', 'DELIVERED', 'CANCELLED', 'RETURNED');

-- CreateTable
CREATE TABLE "Status" (
    "id" TEXT NOT NULL,
    "status" "StatusList" NOT NULL,
    "observations" TEXT NOT NULL,
    "changedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "orderId" TEXT,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Status" ADD CONSTRAINT "Status_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
