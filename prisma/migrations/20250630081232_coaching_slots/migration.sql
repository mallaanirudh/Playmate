-- CreateTable
CREATE TABLE "CoachingSlot" (
    "id" TEXT NOT NULL,
    "coachingOfferId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "isBooked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "CoachingSlot_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CoachingSlot" ADD CONSTRAINT "CoachingSlot_coachingOfferId_fkey" FOREIGN KEY ("coachingOfferId") REFERENCES "CoachingOffer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
