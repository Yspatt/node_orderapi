/*
  Warnings:

  - A unique constraint covering the columns `[recipient]` on the table `transports` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[number]` on the table `transports` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cep]` on the table `transports` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "transports_recipient_key" ON "transports"("recipient");

-- CreateIndex
CREATE UNIQUE INDEX "transports_number_key" ON "transports"("number");

-- CreateIndex
CREATE UNIQUE INDEX "transports_cep_key" ON "transports"("cep");
