-- CreateEnum
CREATE TYPE "StatusList" AS ENUM ('PENDING', 'PAID', 'LABEL_ATTACHED', 'INVOICE_ATTACHED', 'WAITING_PROCCESS', 'IN_SEPARATION', 'IN_CONFERENCE', 'SENT', 'DELIVERED', 'CANCELLED', 'RETURNED');

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "erpNumber" INTEGER NOT NULL,
    "erpStatus" TEXT NOT NULL,
    "shopNumber" TEXT NOT NULL,
    "shop" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "discounts" DOUBLE PRECISION NOT NULL,
    "totalShipping" DOUBLE PRECISION NOT NULL,
    "totalProducts" DOUBLE PRECISION NOT NULL,
    "totalOrder" DOUBLE PRECISION NOT NULL,
    "observations" TEXT NOT NULL,
    "internalObservations" TEXT NOT NULL,
    "integrationType" TEXT NOT NULL,
    "invoiceAccessKey" TEXT NOT NULL,
    "invoiceNumber" INTEGER NOT NULL,
    "invoiceSerie" INTEGER NOT NULL,
    "transport" TEXT NOT NULL,
    "trackingCode" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "invoice" TEXT NOT NULL,
    "clientId" TEXT,
    "invoiceId" TEXT,
    "transportId" TEXT,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,
    "internalId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "ie" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "cell" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "items" (
    "id" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "gtin" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,

    CONSTRAINT "items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alert" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "orderId" TEXT,

    CONSTRAINT "Alert_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Status" (
    "id" TEXT NOT NULL,
    "status" "StatusList" NOT NULL,
    "observations" TEXT NOT NULL,
    "changedAt" TIMESTAMP(3) NOT NULL,
    "orderId" TEXT,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "orders_erpNumber_key" ON "orders"("erpNumber");

-- CreateIndex
CREATE UNIQUE INDEX "clients_internalId_key" ON "clients"("internalId");

-- CreateIndex
CREATE UNIQUE INDEX "Status_id_key" ON "Status"("id");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alert" ADD CONSTRAINT "Alert_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Status" ADD CONSTRAINT "Status_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
