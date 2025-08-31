-- AlterTable
ALTER TABLE "public"."Skill" ADD COLUMN     "ProjectId" TEXT;

-- AddForeignKey
ALTER TABLE "public"."Skill" ADD CONSTRAINT "Skill_ProjectId_fkey" FOREIGN KEY ("ProjectId") REFERENCES "public"."Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
