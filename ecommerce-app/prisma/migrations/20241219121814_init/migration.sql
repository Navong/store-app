/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `ShippingAddress` table. All the data in the column will be lost.
  - You are about to drop the column `postalCode` on the `ShippingAddress` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `ShippingAddress` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "categoryId";

-- AlterTable
ALTER TABLE "ShippingAddress" DROP COLUMN "city",
DROP COLUMN "postalCode",
DROP COLUMN "state";

-- DropTable
DROP TABLE "Category";
