/*
  Warnings:

  - You are about to drop the column `ProjectId` on the `Skill` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Skill" DROP CONSTRAINT "Skill_ProjectId_fkey";

-- AlterTable
ALTER TABLE "public"."Skill" DROP COLUMN "ProjectId";

-- CreateTable
CREATE TABLE "public"."_ProjectSkills" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ProjectSkills_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ProjectSkills_B_index" ON "public"."_ProjectSkills"("B");

-- AddForeignKey
ALTER TABLE "public"."_ProjectSkills" ADD CONSTRAINT "_ProjectSkills_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ProjectSkills" ADD CONSTRAINT "_ProjectSkills_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;
