import { PrismaClient, Role, EventStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Supernova database seed with official data...');

  // 1. Create Default Users (Admin, Organizer, Finance)
  const hashedPassword = await bcrypt.hash('Supernova@2026', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@supernova2026.com' },
    update: {},
    create: {
      name: 'Supernova Admin',
      email: 'admin@supernova2026.com',
      password: hashedPassword,
      role: Role.ADMIN,
    },
  });

  const organizer = await prisma.user.upsert({
    where: { email: 'organizer@supernova2026.com' },
    update: {},
    create: {
      name: 'Lead Organizer',
      email: 'organizer@supernova2026.com',
      password: hashedPassword,
      role: Role.ORGANIZER,
    },
  });

  const finance = await prisma.user.upsert({
    where: { email: 'finance@supernova2026.com' },
    update: {},
    create: {
      name: 'Finance Head',
      email: 'finance@supernova2026.com',
      password: hashedPassword,
      role: Role.FINANCE,
    },
  });

  console.log('✅ Base role users created: Admin, Organizer, Finance Officer');

  // 2. Create Committee Heads
  const committeeHeads = [
    { name: 'Diya Chuphal', role: 'Committee Head' },
    { name: 'Richa Bagdiya', role: 'Committee Head' },
    { name: 'Hitesh Phule', role: 'Committee Head' },
  ];

  for (const member of committeeHeads) {
    await prisma.committeeMember.create({
      data: member,
    });
  }
  console.log('✅ Committee Heads registered');

  // 3. Create Current Real Events
  const events = [
    {
      title: 'CodeBurst',
      slug: 'codeburst',
      category: 'Coding & Algorithm',
      description: 'Competitive coding challenge testing speed, accuracy, and algorithmic problem solving.',
      rules: [
        'Individual participation only',
        'Time duration: 2 hours',
        'Plagiarism checks will be enforced',
        'Languages allowed: C++, Java, Python, C#'
      ],
      venue: 'Computer Center Lab 1',
      eventDate: '22 August 2026',
      reportingTime: '09:30 AM',
      registrationFee: 150,
      prizePool: 10000,
      status: EventStatus.PUBLISHED,
      organizerId: organizer.id,
      coordinators: {
        create: [
          { name: 'Harshada', phone: '+91 9876543210', email: 'harshada@supernova2026.com' },
          { name: 'Parth', phone: '+91 9876543211', email: 'parth@supernova2026.com' }
        ]
      },
      customFields: [
        { key: 'githubProfile', label: 'GitHub Profile URL', type: 'text', required: false },
        { key: 'programmingLanguage', label: 'Preferred Programming Language', type: 'select', options: ['C++', 'Java', 'Python', 'C#'], required: true }
      ]
    },
    {
      title: 'Stella',
      slug: 'stella',
      category: 'UI/UX & Creative Design',
      description: 'Design hackathon focusing on futuristic web interfaces, user experience, and visual aesthetics.',
      rules: [
        'Team size: 1-2 members',
        'Tools permitted: Figma, Adobe XD, Canvas',
        'Prompt will be revealed on stage'
      ],
      venue: 'Design Studio 2',
      eventDate: '22 August 2026',
      reportingTime: '11:00 AM',
      registrationFee: 200,
      prizePool: 12000,
      status: EventStatus.PUBLISHED,
      organizerId: organizer.id,
      coordinators: {
        create: [
          { name: 'Rohan', phone: '+91 9876543212', email: 'rohan@supernova2026.com' }
        ]
      },
      customFields: [
        { key: 'figmaLink', label: 'Portfolio / Figma Profile', type: 'text', required: false }
      ]
    },
    {
      title: 'Workshop',
      slug: 'workshop',
      category: 'Hands-on Training',
      description: 'Hands-on technical workshop on emerging cloud architecture, AI workflows, and modern web application development.',
      rules: [
        'Open to all branches & years',
        'Laptops mandatory',
        'Certificate of participation will be issued'
      ],
      venue: 'Main Auditorium',
      eventDate: '22 August 2026',
      reportingTime: '01:30 PM',
      registrationFee: 100,
      prizePool: 0,
      status: EventStatus.PUBLISHED,
      organizerId: organizer.id,
      coordinators: {
        create: [
          { name: 'Ganesh', phone: '+91 9876543213', email: 'ganesh@supernova2026.com' }
        ]
      },
      customFields: [
        { key: 'experienceLevel', label: 'Prior Coding Experience', type: 'select', options: ['Beginner', 'Intermediate', 'Advanced'], required: true }
      ]
    },
    {
      title: 'SparkX',
      slug: 'sparkx',
      category: 'Ideation & Pitching',
      description: 'Fast-paced innovation pitch where tech visionaries present novel solutions to real-world problems.',
      rules: [
        'Presentation time limit: 5 minutes + 3 minutes Q&A',
        'Slide format: PDF or PPTX'
      ],
      venue: 'Seminar Hall B',
      eventDate: '23 August 2026',
      reportingTime: '10:00 AM',
      registrationFee: 250,
      prizePool: 15000,
      status: EventStatus.PUBLISHED,
      organizerId: organizer.id,
      coordinators: {
        create: [
          { name: 'Salman', phone: '+91 9876543214', email: 'salman@supernova2026.com' }
        ]
      },
      customFields: [
        { key: 'projectTitle', label: 'Idea / Project Title', type: 'text', required: true }
      ]
    },
    {
      title: 'Ninja Coders',
      slug: 'ninja-coders',
      category: 'Speed Coding & Debugging',
      description: 'High-speed debugging and live code optimization under severe time pressure.',
      rules: [
        'Individual event',
        '3 rounds: Bug Hunt, Code Refactor, Speed Run'
      ],
      venue: 'Computer Center Lab 2',
      eventDate: '23 August 2026',
      reportingTime: '11:30 AM',
      registrationFee: 150,
      prizePool: 8000,
      status: EventStatus.PUBLISHED,
      organizerId: organizer.id,
      coordinators: {
        create: [
          { name: 'Sushant', phone: '+91 9876543215', email: 'sushant@supernova2026.com' }
        ]
      },
      customFields: []
    },
    {
      title: 'Junior Shark',
      slug: 'junior-shark',
      category: 'Business & Entrepreneurship',
      description: 'Shark-tank style startup pitch contest evaluating market feasibility, valuation, and business strategy.',
      rules: [
        'Team size: 1-4 members',
        'Pitch deck required'
      ],
      venue: 'Management Hall 1',
      eventDate: '23 August 2026',
      reportingTime: '01:00 PM',
      registrationFee: 300,
      prizePool: 20000,
      status: EventStatus.PUBLISHED,
      organizerId: organizer.id,
      coordinators: {
        create: [
          { name: 'Harshada', phone: '+91 9876543210', email: 'harshada@supernova2026.com' },
          { name: 'Sushant', phone: '+91 9876543215', email: 'sushant@supernova2026.com' }
        ]
      },
      customFields: [
        { key: 'startupName', label: 'Startup Name / Concept', type: 'text', required: true }
      ]
    },
    {
      title: 'Protonova (Project Competition)',
      slug: 'protonova',
      category: 'Project Showcase',
      description: 'National-level flagship hardware and software project exhibition judged by industry expert panels.',
      rules: [
        'Working project prototype required',
        'Poster size A1 format'
      ],
      venue: 'Exhibition Pavilion A',
      eventDate: '23 August 2026',
      reportingTime: '02:30 PM',
      registrationFee: 350,
      prizePool: 25000,
      status: EventStatus.PUBLISHED,
      organizerId: organizer.id,
      coordinators: {
        create: [
          { name: 'Parth', phone: '+91 9876543211', email: 'parth@supernova2026.com' },
          { name: 'Ganesh', phone: '+91 9876543213', email: 'ganesh@supernova2026.com' }
        ]
      },
      customFields: [
        { key: 'projectDomain', label: 'Project Domain (AI / IoT / Web / Robotics)', type: 'text', required: true }
      ]
    }
  ];

  for (const eventData of events) {
    await prisma.event.upsert({
      where: { slug: eventData.slug },
      update: {},
      create: eventData,
    });
  }

  console.log('✅ Real Supernova events & coordinators seeded successfully');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
