-- CreateTable
CREATE TABLE "specialties" (
    "id" TEXT NOT NULL,
    "titile" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "icon" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "idDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "specialties_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_specialty_isDeleted" ON "specialties"("idDeleted");

-- CreateIndex
CREATE INDEX "idx_specialty_title" ON "specialties"("titile");
