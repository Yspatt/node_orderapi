/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Status` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Status_id_key" ON "Status"("id");
