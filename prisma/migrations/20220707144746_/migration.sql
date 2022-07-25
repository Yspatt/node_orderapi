/*
  Warnings:

  - A unique constraint covering the columns `[internalId]` on the table `clients` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `internalId` on the `clients` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "clients" DROP COLUMN "internalId",
ADD COLUMN     "internalId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "clients_internalId_key" ON "clients"("internalId");
