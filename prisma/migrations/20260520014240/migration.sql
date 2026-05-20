/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `stores` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "stores_name_key" ON "stores"("name");
