/*
  Warnings:

  - You are about to drop the column `education` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Profile" DROP COLUMN "education";

-- CreateTable
CREATE TABLE "public"."education" (
    "id" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "instName" TEXT NOT NULL,
    "streame" TEXT NOT NULL,
    "year_of_passing" TEXT NOT NULL,
    "percentage" INTEGER NOT NULL,
    "profileId" TEXT,

    CONSTRAINT "education_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."education" ADD CONSTRAINT "education_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "public"."Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
