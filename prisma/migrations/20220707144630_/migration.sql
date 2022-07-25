/*
  Warnings:

  - A unique constraint covering the columns `[internalId]` on the table `clients` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `internalId` to the `clients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clients" ADD COLUMN     "internalId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "clients_internalId_key" ON "clients"("internalId");
