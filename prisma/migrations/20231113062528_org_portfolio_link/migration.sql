/*
  Warnings:

  - A unique constraint covering the columns `[organizationId]` on the table `Portfolio` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `organizationId` to the `Portfolio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Portfolio" ADD COLUMN     "organizationId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Portfolio_organizationId_key" ON "Portfolio"("organizationId");

-- AddForeignKey
ALTER TABLE "Portfolio" ADD CONSTRAINT "Portfolio_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
