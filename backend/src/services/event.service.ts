import { prisma } from '../config/db';
import { EventStatus } from '@prisma/client';
import { AppError } from '../middlewares/error.middleware';

export interface CreateEventInput {
  title: string;
  category: string;
  description: string;
  rules: string[];
  bannerUrl?: string;
  venue: string;
  eventDate: string;
  reportingTime: string;
  registrationFee: number;
  prizePool: number;
  status?: EventStatus;
  customFields?: any;
  organizerId?: string;
  coordinators?: { name: string; phone?: string; email?: string }[];
}

const DEFAULT_EVENTS: any[] = [
  {
    id: 'evt-1',
    title: 'CodeBurst',
    slug: 'codeburst',
    category: 'Coding & Algorithm',
    description: 'Competitive coding challenge testing speed, accuracy, and algorithmic problem solving.',
    rules: ['Individual participation only', 'Time duration: 2 hours', 'Plagiarism checks will be enforced', 'Languages allowed: C++, Java, Python, C#'],
    venue: 'Computer Center Lab 1',
    eventDate: '22 August 2026',
    reportingTime: '09:30 AM',
    registrationFee: 150,
    prizePool: 10000,
    status: EventStatus.PUBLISHED,
    coordinators: [{ id: 'c1', name: 'Harshada', phone: '+91 9876543210', email: 'harshada@supernova2026.com' }],
    customFields: [{ key: 'programmingLanguage', label: 'Preferred Programming Language', type: 'select', options: ['C++', 'Java', 'Python', 'C#'], required: true }]
  },
  {
    id: 'evt-2',
    title: 'Stella',
    slug: 'stella',
    category: 'UI/UX & Creative Design',
    description: 'Design hackathon focusing on futuristic web interfaces, user experience, and visual aesthetics.',
    rules: ['Team size: 1-2 members', 'Tools permitted: Figma, Adobe XD, Canvas', 'Prompt will be revealed on stage'],
    venue: 'Design Studio 2',
    eventDate: '22 August 2026',
    reportingTime: '11:00 AM',
    registrationFee: 200,
    prizePool: 12000,
    status: EventStatus.PUBLISHED,
    coordinators: [{ id: 'c2', name: 'Rohan', phone: '+91 9876543212', email: 'rohan@supernova2026.com' }],
    customFields: [{ key: 'figmaLink', label: 'Portfolio / Figma Profile', type: 'text', required: false }]
  },
  {
    id: 'evt-3',
    title: 'Workshop',
    slug: 'workshop',
    category: 'Hands-on Training',
    description: 'Hands-on technical workshop on emerging cloud architecture, AI workflows, and modern web application development.',
    rules: ['Open to all branches & years', 'Laptops mandatory', 'Certificate of participation will be issued'],
    venue: 'Main Auditorium',
    eventDate: '22 August 2026',
    reportingTime: '01:30 PM',
    registrationFee: 100,
    prizePool: 0,
    status: EventStatus.PUBLISHED,
    coordinators: [{ id: 'c3', name: 'Ganesh', phone: '+91 9876543213', email: 'ganesh@supernova2026.com' }],
    customFields: [{ key: 'experienceLevel', label: 'Prior Coding Experience', type: 'select', options: ['Beginner', 'Intermediate', 'Advanced'], required: true }]
  },
  {
    id: 'evt-4',
    title: 'SparkX',
    slug: 'sparkx',
    category: 'Ideation & Pitching',
    description: 'Fast-paced innovation pitch where tech visionaries present novel solutions to real-world problems.',
    rules: ['Presentation time limit: 5 minutes + 3 minutes Q&A', 'Slide format: PDF or PPTX'],
    venue: 'Seminar Hall B',
    eventDate: '23 August 2026',
    reportingTime: '10:00 AM',
    registrationFee: 250,
    prizePool: 15000,
    status: EventStatus.PUBLISHED,
    coordinators: [{ id: 'c4', name: 'Salman', phone: '+91 9876543214', email: 'salman@supernova2026.com' }],
    customFields: [{ key: 'projectTitle', label: 'Idea / Project Title', type: 'text', required: true }]
  },
  {
    id: 'evt-5',
    title: 'Ninja Coders',
    slug: 'ninja-coders',
    category: 'Speed Coding & Debugging',
    description: 'High-speed debugging and live code optimization under severe time pressure.',
    rules: ['Individual event', '3 rounds: Bug Hunt, Code Refactor, Speed Run'],
    venue: 'Computer Center Lab 2',
    eventDate: '23 August 2026',
    reportingTime: '11:30 AM',
    registrationFee: 150,
    prizePool: 8000,
    status: EventStatus.PUBLISHED,
    coordinators: [{ id: 'c5', name: 'Sushant', phone: '+91 9876543215', email: 'sushant@supernova2026.com' }],
    customFields: []
  },
  {
    id: 'evt-6',
    title: 'Junior Shark',
    slug: 'junior-shark',
    category: 'Business & Entrepreneurship',
    description: 'Shark-tank style startup pitch contest evaluating market feasibility, valuation, and business strategy.',
    rules: ['Team size: 1-4 members', 'Pitch deck required'],
    venue: 'Management Hall 1',
    eventDate: '23 August 2026',
    reportingTime: '01:00 PM',
    registrationFee: 300,
    prizePool: 20000,
    status: EventStatus.PUBLISHED,
    coordinators: [{ id: 'c6', name: 'Harshada', phone: '+91 9876543210', email: 'harshada@supernova2026.com' }],
    customFields: [{ key: 'startupName', label: 'Startup Name / Concept', type: 'text', required: true }]
  },
  {
    id: 'evt-7',
    title: 'Protonova (Project Competition)',
    slug: 'protonova',
    category: 'Project Showcase',
    description: 'National-level flagship hardware and software project exhibition judged by industry expert panels.',
    rules: ['Working project prototype required', 'Poster size A1 format'],
    venue: 'Exhibition Pavilion A',
    eventDate: '23 August 2026',
    reportingTime: '02:30 PM',
    registrationFee: 350,
    prizePool: 25000,
    status: EventStatus.PUBLISHED,
    coordinators: [{ id: 'c7', name: 'Parth', phone: '+91 9876543211', email: 'parth@supernova2026.com' }],
    customFields: [{ key: 'projectDomain', label: 'Project Domain (AI / IoT / Web / Robotics)', type: 'text', required: true }]
  }
];

import { stateStore } from '../config/stateStore';

export class EventService {
  static async getPublicEvents(category?: string) {
    try {
      const whereCondition: any = { status: EventStatus.PUBLISHED };
      if (category) {
        whereCondition.category = category;
      }

      const events = await prisma.event.findMany({
        where: whereCondition,
        include: {
          coordinators: true,
        },
        orderBy: { createdAt: 'desc' },
      });

      if (events.length > 0) return events;
    } catch (error: any) {
      console.warn('⚠️ DB offline, returning stateStore published events:', error.message);
    }

    return stateStore.getPublishedEvents(category);
  }

  static async getAllEventsForStaff() {
    try {
      const events = await prisma.event.findMany({
        include: {
          coordinators: true,
          organizer: {
            select: { id: true, name: true, email: true },
          },
          _count: {
            select: { registrations: true },
          },
        },
        orderBy: { createdAt: 'desc' },
      });

      if (events.length > 0) return events;
    } catch (error: any) {
      console.warn('⚠️ DB offline, returning stateStore staff events:', error.message);
    }

    return stateStore.getAllEventsForStaff();
  }

  static async getEventBySlug(slug: string) {
    try {
      const event = await prisma.event.findUnique({
        where: { slug },
        include: {
          coordinators: true,
          organizer: {
            select: { id: true, name: true, email: true },
          },
        },
      });

      if (event) return event;
    } catch (error: any) {
      console.warn('⚠️ DB offline, searching stateStore by slug:', error.message);
    }

    const storeEvt = stateStore.getEventBySlug(slug);
    if (storeEvt) return storeEvt;

    const err: AppError = new Error('Event not found');
    err.statusCode = 404;
    throw err;
  }

  static async createEvent(data: CreateEventInput) {
    let slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    try {
      const existingSlug = await prisma.event.findUnique({ where: { slug } });
      if (existingSlug) {
        slug = `${slug}-${Math.floor(1000 + Math.random() * 9000)}`;
      }

      const newEvent = await prisma.event.create({
        data: {
          title: data.title,
          slug,
          category: data.category,
          description: data.description,
          rules: data.rules || [],
          bannerUrl: data.bannerUrl,
          venue: data.venue,
          eventDate: data.eventDate,
          reportingTime: data.reportingTime,
          registrationFee: Number(data.registrationFee) || 0,
          prizePool: Number(data.prizePool) || 0,
          status: data.status || EventStatus.DRAFT,
          customFields: data.customFields || [],
          organizerId: data.organizerId,
          coordinators: data.coordinators
            ? {
                create: data.coordinators,
              }
            : undefined,
        },
        include: {
          coordinators: true,
        },
      });

      return newEvent;
    } catch (e: any) {
      console.warn('⚠️ DB offline, saving proposed event to stateStore:', e.message);
      return stateStore.proposeEvent({
        ...data,
        status: data.status as any || 'PENDING_APPROVAL',
      });
    }
  }

  static async updateEvent(id: string, data: Partial<CreateEventInput>) {
    try {
      const existing = await prisma.event.findUnique({ where: { id } });
      if (existing) {
        if (data.coordinators) {
          await prisma.coordinator.deleteMany({ where: { eventId: id } });
        }

        return prisma.event.update({
          where: { id },
          data: {
            title: data.title,
            category: data.category,
            description: data.description,
            rules: data.rules,
            bannerUrl: data.bannerUrl,
            venue: data.venue,
            eventDate: data.eventDate,
            reportingTime: data.reportingTime,
            registrationFee: data.registrationFee !== undefined ? Number(data.registrationFee) : undefined,
            prizePool: data.prizePool !== undefined ? Number(data.prizePool) : undefined,
            status: data.status,
            customFields: data.customFields,
            coordinators: data.coordinators
              ? {
                  create: data.coordinators,
                }
              : undefined,
          },
          include: {
            coordinators: true,
          },
        });
      }
    } catch (e: any) {
      console.warn('⚠️ DB offline, updating event in stateStore:', e.message);
    }

    const storeEvt = stateStore.getEventById(id);
    if (storeEvt) {
      Object.assign(storeEvt, data);
      return storeEvt;
    }

    const err: AppError = new Error('Event not found');
    err.statusCode = 404;
    throw err;
  }

  static async updateEventStatus(id: string, status: EventStatus) {
    try {
      const existing = await prisma.event.findUnique({ where: { id } });
      if (existing) {
        return prisma.event.update({
          where: { id },
          data: { status },
        });
      }
    } catch (e: any) {
      console.warn('⚠️ DB offline, updating event status in stateStore:', e.message);
    }

    const updated = stateStore.updateEventStatus(id, status as any);
    if (updated) return updated;

    const err: AppError = new Error('Event not found');
    err.statusCode = 404;
    throw err;
  }

  static async deleteEvent(id: string) {
    try {
      const existing = await prisma.event.findUnique({ where: { id } });
      if (existing) {
        await prisma.event.delete({ where: { id } });
      }
    } catch (e: any) {
      console.warn('⚠️ DB offline during event deletion:', e.message);
    }

    const idx = stateStore.events.findIndex((e) => e.id === id);
    if (idx !== -1) {
      stateStore.events.splice(idx, 1);
    }

    return { message: 'Event deleted successfully' };
  }
}
