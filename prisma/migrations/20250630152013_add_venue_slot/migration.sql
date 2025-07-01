-- CreateTable
CREATE TABLE "VenueSlot" (
    "id" TEXT NOT NULL,
    "venueId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "isBooked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "VenueSlot_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VenueSlot" ADD CONSTRAINT "VenueSlot_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE CASCADE ON UPDATE CASCADE;
