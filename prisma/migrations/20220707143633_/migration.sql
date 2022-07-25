/*
  Warnings:

  - Changed the type of `amount` on the `items` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "items" DROP COLUMN "amount",
ADD COLUMN     "amount" INTEGER NOT NULL;
