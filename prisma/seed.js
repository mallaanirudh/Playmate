const { PrismaClient } = require('../app/generated/prisma');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

async function main() {
  // Create 3 venue owners
  for (let i = 0; i < 5; i++) {
    const user = await prisma.user.create({
      data: {
        email_address: faker.internet.email(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        phone: faker.phone.number(),
        username: faker.internet.userName(),
        role: 'VENUE_OWNER',
      },
    });

    // Create 2 venues for each owner
    for (let j = 0; j < 4; j++) {
      await prisma.venue.create({
        data: {
          name: faker.company.name(),
          ownerId: user.id,
          venueType: 'TURF', // must match one of your enum values
          address: faker.location.streetAddress(),
          city: faker.location.city(),
          state: faker.location.state(),
          pincode: faker.location.zipCode(),
          latitude: faker.location.latitude(),
          longitude: faker.location.longitude(),
          phone: faker.phone.number(),
          email: faker.internet.email(),
          websiteUrl: faker.internet.url(),
          rating: faker.number.float({ min: 1, max: 5 }),
          totalReviews: faker.number.int({ min: 0, max: 100 }),
          price: faker.commerce.price({ min: 100, max: 500 }),
          timings: "9am - 9pm",
          contact: faker.phone.number(),
        },
      });
    }
  }

  console.log("✅ Seed complete");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
