/*
  Warnings:

  - Added the required column `transportId` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "transportId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_transportId_fkey" FOREIGN KEY ("transportId") REFERENCES "transports"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
