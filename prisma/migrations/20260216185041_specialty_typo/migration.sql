/*
  Warnings:

  - You are about to drop the column `titile` on the `specialties` table. All the data in the column will be lost.
  - Added the required column `title` to the `specialties` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "idx_specialty_title";

-- AlterTable
ALTER TABLE "specialties" DROP COLUMN "titile",
ADD COLUMN     "title" VARCHAR(100) NOT NULL;

-- CreateIndex
CREATE INDEX "idx_specialty_title" ON "specialties"("title");
