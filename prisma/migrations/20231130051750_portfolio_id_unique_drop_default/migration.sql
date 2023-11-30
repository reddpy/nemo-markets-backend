/*
  Warnings:

  - A unique constraint covering the columns `[unique_portfolio_id]` on the table `Portfolio` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Portfolio" ALTER COLUMN "unique_portfolio_id" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "Portfolio_unique_portfolio_id_key" ON "Portfolio"("unique_portfolio_id");
