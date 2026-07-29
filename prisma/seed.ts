import { PrismaClient, Role, DonationStatus, DonationFrequency, DonationProvider } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

/** PLACEHOLDER_IMAGE URLs — swap before launch */
const IMG = {
  hero: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1600&h=1200&fit=crop",
  classroom: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop",
  mentorship: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop",
  workshop: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&h=600&fit=crop",
  confidence: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop",
  community: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&h=600&fit=crop",
  story: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=1200&h=630&fit=crop",
  story2: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=630&fit=crop",
  event: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&h=800&fit=crop",
  team1: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&h=500&fit=crop",
  team2: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&h=500&fit=crop",
  team3: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=500&h=500&fit=crop",
  gallery1: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=900&h=700&fit=crop",
  gallery2: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=700&h=900&fit=crop",
  gallery3: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=900&h=600&fit=crop",
  gallery4: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=800&fit=crop",
  gallery5: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1000&h=700&fit=crop",
  gallery6: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&h=1000&fit=crop",
};

async function main() {
  console.log("Seeding The Girl Can Foundation database...");

  await prisma.activityLog.deleteMany();
  await prisma.donation.deleteMany();
  await prisma.eventRegistration.deleteMany();
  await prisma.event.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.story.deleteMany();
  await prisma.program.deleteMany();
  await prisma.teamMember.deleteMany();
  await prisma.mediaAsset.deleteMany();
  await prisma.volunteerApplication.deleteMany();
  await prisma.partnerInquiry.deleteMany();
  await prisma.contactMessage.deleteMany();
  await prisma.newsletterSubscriber.deleteMany();
  await prisma.siteSetting.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash(
    process.env.ADMIN_PASSWORD || "ChangeMe123!",
    12
  );

  const admin = await prisma.user.create({
    data: {
      name: "Site Administrator",
      email: (process.env.ADMIN_EMAIL || "admin@girlcanfoundation.org").toLowerCase(),
      passwordHash,
      role: Role.SUPER_ADMIN,
    },
  });

  await prisma.user.create({
    data: {
      name: "Content Editor",
      email: "editor@girlcanfoundation.org",
      passwordHash: await bcrypt.hash("Editor123!", 12),
      role: Role.EDITOR,
    },
  });

  // Site settings — verbatim prototype hero copy
  const settings: Record<string, string> = {
    hero_badge: "Empowering Girls & Young Women",
    hero_headline: "She Believes.\nShe Leads.\nShe Can.",
    hero_tagline:
      "The Girl Can Foundation is committed to helping every girl discover her strength, build unshakeable confidence, and reach her full potential — regardless of her background or circumstances.",
    hero_card_quote:
      "Every girl has the power to dream big, lead boldly, and create meaningful change.",
    hero_card_body:
      "Creating safe spaces where girls are encouraged to express themselves, grow in knowledge, and embrace their unique potential.",
    mission_intro:
      "At The Girl Can Foundation, we believe that every girl — regardless of her background or circumstances — has the power to dream big, lead boldly, and create meaningful change in her community and beyond.",
    mission_body:
      "We focus on creating safe spaces where girls are encouraged to express themselves, grow in knowledge, develop life skills, and embrace their unique potential.",
    mission_title: "Inspire. Educate. Mentor. Support.",
    mission_text:
      "To inspire, educate, mentor, and support girls through programs and opportunities that promote leadership, personal development, education, confidence-building, and social impact.",
    vision_text:
      "To raise a generation of empowered, resilient, and purpose-driven girls equipped to break barriers and become leaders, changemakers, and role models.",
    contact_email: "hello@girlcanfoundation.org",
    social_instagram: "https://instagram.com",
    social_facebook: "https://facebook.com",
    social_twitter: "https://x.com",
    social_linkedin: "https://linkedin.com",
    stats_girls_reached: "1200",
    stats_workshops: "48",
    stats_mentors: "85",
    stats_communities: "22",
  };

  await prisma.siteSetting.createMany({
    data: Object.entries(settings).map(([key, value]) => ({ key, value })),
  });

  // Pillars stored as programs with icons (lucide names)
  const pillars = [
    {
      slug: "education",
      title: "Education",
      summary:
        "Providing access to knowledge, resources, and learning opportunities that open doors and expand horizons for girls everywhere.",
      description:
        "Providing access to knowledge, resources, and learning opportunities that open doors and expand horizons for girls everywhere. Our educational support includes scholarships, tutoring, learning materials, and pathways that keep girls in school and thriving academically.",
      icon: "GraduationCap",
      coverImage: IMG.classroom,
      order: 1,
    },
    {
      slug: "leadership",
      title: "Leadership",
      summary:
        "Equipping girls with the skills, mindset, and opportunities to step into leadership roles in their schools, communities, and beyond.",
      description:
        "Equipping girls with the skills, mindset, and opportunities to step into leadership roles in their schools, communities, and beyond. Through workshops and practice, we build public speaking, decision-making, and the courage to lead.",
      icon: "Crown",
      coverImage: IMG.workshop,
      order: 2,
    },
    {
      slug: "mentorship",
      title: "Mentorship",
      summary:
        "Connecting young women with inspiring role models and mentors who guide, encourage, and champion their growth and ambitions.",
      description:
        "Connecting young women with inspiring role models and mentors who guide, encourage, and champion their growth and ambitions. Mentorship pairs create lasting relationships that nurture confidence and purpose.",
      icon: "Handshake",
      coverImage: IMG.mentorship,
      order: 3,
    },
    {
      slug: "confidence",
      title: "Confidence",
      summary:
        "Building the self-belief and inner strength girls need to embrace their potential, use their voice, and show up fully in every space.",
      description:
        "Building the self-belief and inner strength girls need to embrace their potential, use their voice, and show up fully in every space. Confidence is the foundation for everything we do.",
      icon: "Sparkles",
      coverImage: IMG.confidence,
      order: 4,
    },
    {
      slug: "advocacy",
      title: "Advocacy",
      summary:
        "Speaking up for girls' rights, amplifying their voices, and driving systemic change for equality and opportunity at every level.",
      description:
        "Speaking up for girls' rights, amplifying their voices, and driving systemic change for equality and opportunity at every level. We campaign, convene, and elevate girls' stories.",
      icon: "Megaphone",
      coverImage: IMG.community,
      order: 5,
    },
    {
      slug: "community-impact",
      title: "Community Impact",
      summary:
        "Empowering girls to become active contributors to their communities, creating lasting change from the ground up.",
      description:
        "Empowering girls to become active contributors to their communities, creating lasting change from the ground up. Local action becomes national inspiration.",
      icon: "Globe2",
      coverImage: IMG.community,
      order: 6,
    },
  ];

  // Additional initiative programs
  const initiatives = [
    {
      slug: "leadership-workshops",
      title: "Leadership Workshops",
      summary:
        "Hands-on, transformative workshops that build leadership skills, public speaking, and decision-making confidence.",
      description:
        "Hands-on, transformative workshops that build leadership skills, public speaking, and decision-making confidence. Girls leave with tools they can use immediately in school and community life.",
      icon: "School",
      coverImage: IMG.workshop,
      order: 10,
    },
    {
      slug: "mentorship-programme",
      title: "Mentorship Programme",
      summary:
        "Pairing girls with inspiring mentors for guidance, support, and growth.",
      description:
        "Pairing girls with inspiring mentors for guidance, support, and growth. Mentors walk alongside girls through academic, personal, and leadership journeys.",
      icon: "Sparkle",
      coverImage: IMG.mentorship,
      order: 11,
    },
    {
      slug: "educational-support",
      title: "Educational Support",
      summary:
        "Resources, scholarships, and programs to keep girls in school and thriving academically.",
      description:
        "Resources, scholarships, and programs to keep girls in school and thriving academically. We remove barriers so potential can flourish.",
      icon: "BookOpen",
      coverImage: IMG.classroom,
      order: 12,
    },
    {
      slug: "outreach-advocacy",
      title: "Outreach & Advocacy",
      summary:
        "Community events and campaigns that raise awareness and champion girls' rights.",
      description:
        "Community events and campaigns that raise awareness and champion girls' rights. Together we shift narratives and open doors.",
      icon: "Globe",
      coverImage: IMG.community,
      order: 13,
    },
    {
      slug: "inspirational-content",
      title: "Inspirational Content & Safe Spaces",
      summary:
        "Creating platforms and environments where girls can express themselves freely, share stories, and find community with peers who believe in their potential.",
      description:
        "Creating platforms and environments where girls can express themselves freely, share stories, and find community with peers who believe in their potential.",
      icon: "Lightbulb",
      coverImage: IMG.confidence,
      order: 14,
    },
  ];

  for (const p of [...pillars, ...initiatives]) {
    await prisma.program.create({ data: { ...p, published: true } });
  }

  const mentorship = await prisma.program.findUnique({
    where: { slug: "mentorship-programme" },
  });

  await prisma.story.createMany({
    data: [
      {
        slug: "ama-found-her-voice",
        title: "Ama Found Her Voice",
        excerpt:
          "From quiet classrooms to leading her school debate club — how mentorship helped Ama believe she belongs at the front of the room.",
        contentRich: `<p>When Ama first joined our Mentorship Programme, she barely spoke above a whisper. Today she leads her school's debate club and mentors younger girls in her community.</p><p>She is strong. She is capable. She can.</p>`,
        coverImage: IMG.story,
        category: "Impact Stories",
        authorId: admin.id,
        published: true,
        publishedAt: new Date(),
        featured: true,
      },
      {
        slug: "leadership-weekend-recap",
        title: "What Happened at Leadership Weekend",
        excerpt:
          "Forty girls. Three days. One shared belief: every girl can lead boldly.",
        contentRich: `<p>Our Leadership Weekend brought together forty girls for workshops on public speaking, decision-making, and sisterhood. The energy in the room reminded us why we do this work.</p>`,
        coverImage: IMG.story2,
        category: "Programs",
        authorId: admin.id,
        published: true,
        publishedAt: new Date(Date.now() - 7 * 86400000),
        featured: false,
      },
      {
        slug: "why-safe-spaces-matter",
        title: "Why Safe Spaces Matter",
        excerpt:
          "Creating rooms where girls can express themselves freely is not soft work — it is foundation work.",
        contentRich: `<p>At The Girl Can Foundation, we believe safe spaces are where confidence takes root. When girls feel seen and heard, they begin to dream bigger than their circumstances.</p>`,
        coverImage: IMG.confidence,
        category: "Advocacy",
        authorId: admin.id,
        published: true,
        publishedAt: new Date(Date.now() - 14 * 86400000),
        featured: false,
      },
    ],
  });

  await prisma.teamMember.createMany({
    data: [
      {
        name: "Founder & Executive Director",
        role: "Founder & Executive Director",
        bio: "Driven by a deep belief that every girl deserves the chance to lead boldly, our founder established The Girl Can Foundation to create pathways of education, mentorship, and advocacy.",
        photo: IMG.team1,
        order: 1,
        socialLinks: { linkedin: "#", twitter: "#" },
      },
      {
        name: "Programmes Lead",
        role: "Programmes Lead",
        bio: "Designs and delivers workshops and mentorship experiences that meet girls where they are and take them further than they imagined.",
        photo: IMG.team2,
        order: 2,
        socialLinks: { linkedin: "#" },
      },
      {
        name: "Community & Advocacy Lead",
        role: "Community & Advocacy Lead",
        bio: "Builds partnerships and campaigns that amplify girls' voices and drive lasting community change.",
        photo: IMG.team3,
        order: 3,
        socialLinks: { linkedin: "#" },
      },
    ],
  });

  // Fix team names to be realistic
  const members = await prisma.teamMember.findMany({ orderBy: { order: "asc" } });
  const names = ["Akosua Mensah", "Efua Boateng", "Abena Owusu"];
  for (let i = 0; i < members.length; i++) {
    await prisma.teamMember.update({
      where: { id: members[i].id },
      data: { name: names[i] },
    });
  }

  await prisma.testimonial.createMany({
    data: [
      {
        quote:
          "The mentorship programme helped me see that my voice matters. I now speak up in class and dream of leading my community one day.",
        name: "Ama, 16",
        photo: IMG.team1,
        programId: mentorship?.id,
        featured: true,
      },
      {
        quote:
          "At the leadership workshop I learned that being a leader is not about being the loudest — it is about being brave enough to care.",
        name: "Serwaa, 17",
        featured: true,
      },
      {
        quote:
          "Partnering with The Girl Can Foundation has deepened our school's commitment to girls' leadership and wellbeing.",
        name: "Mrs. Adjei, School Partner",
        featured: true,
      },
    ],
  });

  const now = new Date();
  await prisma.event.createMany({
    data: [
      {
        slug: "girls-leadership-summit-2026",
        title: "Girls Leadership Summit 2026",
        description:
          "A day of workshops, storytelling, and sisterhood for girls aged 13–19. Join us as we celebrate courage, creativity, and community.",
        startAt: new Date(now.getFullYear(), now.getMonth() + 1, 15, 9, 0),
        endAt: new Date(now.getFullYear(), now.getMonth() + 1, 15, 16, 0),
        location: "Accra, Ghana",
        coverImage: IMG.event,
        capacity: 120,
        registrationOpen: true,
        published: true,
      },
      {
        slug: "mentorship-match-day",
        title: "Mentorship Match Day",
        description:
          "Meet your mentor, set goals, and begin a journey of growth together.",
        startAt: new Date(now.getFullYear(), now.getMonth() + 2, 5, 10, 0),
        endAt: new Date(now.getFullYear(), now.getMonth() + 2, 5, 14, 0),
        location: "Kumasi, Ghana",
        coverImage: IMG.mentorship,
        capacity: 60,
        registrationOpen: true,
        published: true,
      },
      {
        slug: "community-advocacy-walk",
        title: "Community Advocacy Walk",
        description:
          "Walk with us to raise awareness for girls' education and equality in our communities.",
        startAt: new Date(now.getFullYear(), now.getMonth() + 3, 20, 7, 0),
        location: "Tamale, Ghana",
        coverImage: IMG.community,
        capacity: 200,
        registrationOpen: true,
        published: true,
      },
    ],
  });

  await prisma.mediaAsset.createMany({
    data: [
      { url: IMG.gallery1, altText: "Girls learning together in a classroom workshop", album: "Programs" },
      { url: IMG.gallery2, altText: "Young woman speaking at a leadership session", album: "Leadership" },
      { url: IMG.gallery3, altText: "Mentorship circle outdoors", album: "Mentorship" },
      { url: IMG.gallery4, altText: "Community gathering celebrating girls", album: "Community" },
      { url: IMG.gallery5, altText: "Hands raised in solidarity at an event", album: "Events" },
      { url: IMG.gallery6, altText: "Group of young women smiling after a workshop", album: "Programs" },
      { url: IMG.hero, altText: "Girls walking together with confidence", album: "Hero" },
      { url: IMG.classroom, altText: "Students engaged in classroom learning", album: "Education" },
    ],
  });

  await prisma.newsletterSubscriber.createMany({
    data: [
      { email: "friend@example.com" },
      { email: "supporter@example.com" },
      { email: "ally@example.com" },
    ],
  });

  await prisma.contactMessage.create({
    data: {
      name: "Kojo Asante",
      email: "kojo@example.com",
      subject: "Partnership inquiry",
      message: "We would love to explore a school partnership for next term.",
      read: false,
    },
  });

  await prisma.volunteerApplication.create({
    data: {
      name: "Ama Darko",
      email: "ama.darko@example.com",
      phone: "+233200000000",
      message: "I would love to mentor girls in STEM and public speaking.",
    },
  });

  await prisma.partnerInquiry.create({
    data: {
      orgName: "Bright Futures School",
      contactName: "Grace Mensah",
      email: "grace@brightfutures.edu.gh",
      message: "Interested in hosting a leadership workshop for our Form 2 girls.",
    },
  });

  await prisma.donation.createMany({
    data: [
      {
        donorName: "Anonymous",
        donorEmail: "donor1@example.com",
        amount: 100,
        currency: "GHS",
        frequency: DonationFrequency.ONE_TIME,
        provider: DonationProvider.PAYSTACK,
        providerRef: "seed_psk_1",
        status: DonationStatus.PAID,
        createdAt: new Date(now.getFullYear(), now.getMonth(), 2),
      },
      {
        donorName: "Yaw Owusu",
        donorEmail: "yaw@example.com",
        amount: 50,
        currency: "USD",
        frequency: DonationFrequency.MONTHLY,
        provider: DonationProvider.STRIPE,
        providerRef: "seed_str_1",
        status: DonationStatus.PAID,
        createdAt: new Date(now.getFullYear(), now.getMonth(), 8),
      },
      {
        donorName: "Community Circle",
        donorEmail: "circle@example.com",
        amount: 500,
        currency: "GHS",
        frequency: DonationFrequency.ONE_TIME,
        provider: DonationProvider.OFFLINE,
        status: DonationStatus.OFFLINE,
        createdAt: new Date(now.getFullYear(), now.getMonth() - 1, 20),
      },
    ],
  });

  await prisma.activityLog.create({
    data: {
      userId: admin.id,
      action: "SEED_DATABASE",
      entityType: "System",
      entityId: "initial",
    },
  });

  console.log("Seed complete.");
  console.log(`Admin login: ${admin.email} / ${process.env.ADMIN_PASSWORD || "ChangeMe123!"}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
