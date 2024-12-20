/*
  Warnings:

  - You are about to drop the `_ProductCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "_ProductCategory" DROP CONSTRAINT "_ProductCategory_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductCategory" DROP CONSTRAINT "_ProductCategory_B_fkey";

-- DropTable
DROP TABLE "_ProductCategory";
