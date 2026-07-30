// Shared In-Memory State Store for Supernova 2026
// Connects Registrations, Payments, Event Creation & Approvals, Attendance, and Certificates across all portals

export interface StoreEvent {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  rules: string[];
  venue: string;
  eventDate: string;
  reportingTime: string;
  registrationFee: number;
  prizePool: number;
  status: 'DRAFT' | 'PENDING_APPROVAL' | 'PUBLISHED' | 'CANCELLED';
  organizerId?: string;
  coordinators: { id?: string; name: string; phone?: string; email?: string }[];
  customFields?: any[];
  createdAt: Date;
}

export interface StoreRegistration {
  id: string;
  registrationId: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  college: string;
  city: string;
  customAnswers?: any;
  eventId: string;
  createdAt: Date;
  event: {
    id: string;
    title: string;
    slug: string;
    category?: string;
    registrationFee: number;
    venue: string;
    eventDate: string;
    reportingTime: string;
  };
  payment: {
    id: string;
    razorpayOrderId: string;
    razorpayPaymentId?: string;
    amount: number;
    currency: string;
    status: 'PENDING' | 'SUCCESSFUL' | 'FAILED' | 'REFUNDED';
    failureReason?: string;
    createdAt: Date;
  };
  attendance?: {
    id: string;
    scannedAt: Date;
  } | null;
  certificate?: {
    id: string;
    certificateNo: string;
    issuedAt: Date;
  } | null;
}

const INITIAL_EVENTS: StoreEvent[] = [
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
    status: 'PUBLISHED',
    coordinators: [{ id: 'c1', name: 'Harshada', phone: '+91 9876543210', email: 'harshada@supernova2026.com' }],
    customFields: [{ key: 'programmingLanguage', label: 'Preferred Programming Language', type: 'select', options: ['C++', 'Java', 'Python', 'C#'], required: true }],
    createdAt: new Date('2026-01-01'),
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
    status: 'PUBLISHED',
    coordinators: [{ id: 'c2', name: 'Rohan', phone: '+91 9876543212', email: 'rohan@supernova2026.com' }],
    customFields: [{ key: 'figmaLink', label: 'Portfolio / Figma Profile', type: 'text', required: false }],
    createdAt: new Date('2026-01-01'),
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
    status: 'PUBLISHED',
    coordinators: [{ id: 'c3', name: 'Ganesh', phone: '+91 9876543213', email: 'ganesh@supernova2026.com' }],
    customFields: [{ key: 'experienceLevel', label: 'Prior Coding Experience', type: 'select', options: ['Beginner', 'Intermediate', 'Advanced'], required: true }],
    createdAt: new Date('2026-01-01'),
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
    status: 'PUBLISHED',
    coordinators: [{ id: 'c4', name: 'Salman', phone: '+91 9876543214', email: 'salman@supernova2026.com' }],
    customFields: [{ key: 'projectTitle', label: 'Idea / Project Title', type: 'text', required: true }],
    createdAt: new Date('2026-01-01'),
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
    status: 'PUBLISHED',
    coordinators: [{ id: 'c5', name: 'Sushant', phone: '+91 9876543215', email: 'sushant@supernova2026.com' }],
    customFields: [],
    createdAt: new Date('2026-01-01'),
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
    status: 'PUBLISHED',
    coordinators: [{ id: 'c6', name: 'Harshada', phone: '+91 9876543210', email: 'harshada@supernova2026.com' }],
    customFields: [{ key: 'startupName', label: 'Startup Name / Concept', type: 'text', required: true }],
    createdAt: new Date('2026-01-01'),
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
    status: 'PUBLISHED',
    coordinators: [{ id: 'c7', name: 'Parth', phone: '+91 9876543211', email: 'parth@supernova2026.com' }],
    customFields: [{ key: 'projectDomain', label: 'Project Domain (AI / IoT / Web / Robotics)', type: 'text', required: true }],
    createdAt: new Date('2026-01-01'),
  },
];

class StateStore {
  events: StoreEvent[] = [...INITIAL_EVENTS];
  registrations: StoreRegistration[] = [];

  // Events API
  getPublishedEvents(category?: string) {
    let list = this.events.filter((e) => e.status === 'PUBLISHED');
    if (category) {
      list = list.filter((e) => e.category.toLowerCase().includes(category.toLowerCase()));
    }
    return list;
  }

  getAllEventsForStaff() {
    return this.events.map((e) => {
      const regCount = this.registrations.filter((r) => r.eventId === e.id && r.payment.status === 'SUCCESSFUL').length;
      return {
        ...e,
        _count: { registrations: regCount },
      };
    });
  }

  getEventBySlug(slug: string) {
    return this.events.find((e) => e.slug === slug);
  }

  getEventById(id: string) {
    return this.events.find((e) => e.id === id);
  }

  proposeEvent(data: Partial<StoreEvent>) {
    const title = data.title || 'Untitled Event';
    let slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    if (this.events.some((e) => e.slug === slug)) {
      slug = `${slug}-${Math.floor(1000 + Math.random() * 9000)}`;
    }

    const newEvent: StoreEvent = {
      id: `evt-${Date.now()}`,
      title,
      slug,
      category: data.category || 'General Technical',
      description: data.description || '',
      rules: data.rules || [],
      venue: data.venue || 'Main Campus Venue',
      eventDate: data.eventDate || '22 August 2026',
      reportingTime: data.reportingTime || '09:00 AM',
      registrationFee: Number(data.registrationFee) || 0,
      prizePool: Number(data.prizePool) || 0,
      status: 'PENDING_APPROVAL',
      organizerId: data.organizerId || 'organizer-default-id',
      coordinators: data.coordinators || [{ name: 'Lead Coordinator', phone: '+91 9876543210', email: 'coordinator@supernova2026.com' }],
      customFields: data.customFields || [],
      createdAt: new Date(),
    };

    this.events.unshift(newEvent);
    return newEvent;
  }

  updateEventStatus(id: string, status: 'PUBLISHED' | 'CANCELLED' | 'DRAFT') {
    const evt = this.getEventById(id);
    if (evt) {
      evt.status = status;
      return evt;
    }
    return null;
  }

  // Registrations & Payments API
  addRegistration(reg: StoreRegistration) {
    this.registrations.unshift(reg);
    return reg;
  }

  getRegistrationById(registrationId: string, email: string) {
    const normId = registrationId.trim().toUpperCase();
    const normEmail = email.toLowerCase().trim();
    return this.registrations.find(
      (r) => r.registrationId.toUpperCase() === normId && r.email.toLowerCase() === normEmail
    );
  }

  verifyRegistrationPayment(registrationIdCode: string, razorpayPaymentId: string) {
    const reg = this.registrations.find((r) => r.registrationId.toUpperCase() === registrationIdCode.toUpperCase());
    if (reg) {
      reg.payment.status = 'SUCCESSFUL';
      reg.payment.razorpayPaymentId = razorpayPaymentId;
      return reg;
    }
    return null;
  }

  markAttendance(regId: string) {
    const reg = this.registrations.find((r) => r.id === regId || r.registrationId === regId);
    if (reg) {
      reg.attendance = {
        id: `att-${Date.now()}`,
        scannedAt: new Date(),
      };
      return reg;
    }
    return null;
  }

  issueCertificate(regId: string) {
    const reg = this.registrations.find((r) => r.id === regId || r.registrationId === regId);
    if (reg) {
      reg.certificate = {
        id: `cert-${Date.now()}`,
        certificateNo: `CERT-SN26-${Math.floor(10000 + Math.random() * 90000)}`,
        issuedAt: new Date(),
      };
      return reg;
    }
    return null;
  }

  getFinanceMetrics() {
    const payments = this.registrations.map((r) => r.payment);
    const successfulPayments = payments.filter((p) => p.status === 'SUCCESSFUL');
    const totalRevenue = successfulPayments.reduce((sum, p) => sum + p.amount, 0);

    return {
      metrics: {
        totalRevenue,
        totalTransactions: payments.length,
        successfulCount: successfulPayments.length,
        pendingCount: payments.filter((p) => p.status === 'PENDING').length,
        failedCount: payments.filter((p) => p.status === 'FAILED').length,
        refundedCount: 0,
      },
      transactions: this.registrations,
    };
  }
}

export const stateStore = new StateStore();
