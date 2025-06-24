-- CreateEnum
CREATE TYPE "CoachingStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateTable
CREATE TABLE "CoachingOffer" (
    "id" TEXT NOT NULL,
    "coachId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "durationMins" INTEGER NOT NULL,
    "sport" "SportsType" NOT NULL,
    "status" "CoachingStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CoachingOffer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoachingBooking" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "coachingOfferId" TEXT NOT NULL,
    "bookingDate" DATE NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "bookingStatus" "BookingStatus" NOT NULL DEFAULT 'PENDING',
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "paymentMethod" "PaymentMethod",
    "paymentId" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CoachingBooking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CoachingOffer" ADD CONSTRAINT "CoachingOffer_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoachingBooking" ADD CONSTRAINT "CoachingBooking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoachingBooking" ADD CONSTRAINT "CoachingBooking_coachingOfferId_fkey" FOREIGN KEY ("coachingOfferId") REFERENCES "CoachingOffer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
