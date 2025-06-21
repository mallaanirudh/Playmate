/*
  Warnings:

  - Added the required column `sport` to the `Tournament` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SportsType" AS ENUM ('FOOTBALL', 'CRICKET', 'SWIMMING', 'KABADDI', 'ATHLETICS', 'CHESS');

-- AlterTable
ALTER TABLE "Tournament" ADD COLUMN     "sport" "SportsType" NOT NULL;
