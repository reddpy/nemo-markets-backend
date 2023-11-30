/*
  Warnings:

  - Added the required column `key_metrics_json` to the `Portfolio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Portfolio" ADD COLUMN     "key_metrics_json" JSONB NOT NULL;
