/*
  Warnings:

  - You are about to drop the column `organizationStatusId` on the `Organization` table. All the data in the column will be lost.
  - You are about to drop the `OrganizationStatus` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `status` to the `Organization` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Organization" DROP CONSTRAINT "Organization_organizationStatusId_fkey";

-- AlterTable
ALTER TABLE "Organization" DROP COLUMN "organizationStatusId",
ADD COLUMN     "status" TEXT NOT NULL;

-- DropTable
DROP TABLE "OrganizationStatus";
