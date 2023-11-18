/*
  Warnings:

  - You are about to drop the column `headequarters` on the `Organization` table. All the data in the column will be lost.
  - Added the required column `headquarters` to the `Organization` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Organization" DROP COLUMN "headequarters",
ADD COLUMN     "headquarters" TEXT NOT NULL;
