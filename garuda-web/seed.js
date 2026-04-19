const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("password123", 10);

  // 1. Clear existing data to avoid conflicts during development
  await prisma.task.deleteMany({});
  await prisma.student.deleteMany({});

  console.log("Cleared existing data...");

  // 2. Create Team Captain
  const captain = await prisma.student.create({
    data: {
      usn: "1RV21ME001",
      name: "Arjun Sharma",
      password: password,
      position: "Team Captain",
      role: "TEAM_CAPTAIN",
      tasks: {
        create: [
          {
            title: "Finalize Aero Simulations",
            description: "Review CFD results for the front wing and nose cone iterations.",
            month: "April 2024",
            deadline: new Date("2024-04-15"),
            status: "in progress",
          },
          {
            title: "Internal Budget Review",
            description: "Go over the component purchasing lists for the new chassis with the finance dept.",
            month: "April 2024",
            deadline: new Date("2024-04-20"),
            status: "pending",
          },
        ],
      },
    },
  });

  // 3. Create Students
  const student1 = await prisma.student.create({
    data: {
      usn: "1RV21ME002",
      name: "Sneha Reddy",
      password: password,
      position: "Aero Lead",
      role: "STUDENT",
      tasks: {
        create: [
          {
            title: "Front Wing Assembly",
            description: "Oversee the assembly of the carbon fiber front wing components.",
            month: "April 2024",
            deadline: new Date("2024-04-18"),
            status: "pending",
          },
        ],
      },
    },
  });

  const student2 = await prisma.student.create({
    data: {
      usn: "1RV21ME003",
      name: "Vikram Malhotra",
      password: password,
      position: "Dynamics Member",
      role: "STUDENT",
      tasks: {
        create: [
          {
            title: "Suspension Fine-tuning",
            description: "Adjust damper settings based on last week's track data.",
            month: "April 2024",
            deadline: new Date("2024-04-22"),
            status: "in progress",
          },
        ],
      },
    },
  });

  console.log({
    captain: captain.usn,
    student1: student1.usn,
    student2: student2.usn,
  });
  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
