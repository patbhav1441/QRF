import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Contact form submissions
export const contactSubmissions = pgTable("contact_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  role: text("role").notNull(), // student, educator, partner
  message: text("message").notNull(),
  submittedAt: timestamp("submitted_at").defaultNow(),
});

export const insertContactSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  submittedAt: true,
});

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contactSubmissions.$inferSelect;

// Newsletter subscriptions
export const newsletterSubscriptions = pgTable("newsletter_subscriptions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  subscribedAt: timestamp("subscribed_at").defaultNow(),
});

export const insertNewsletterSchema = createInsertSchema(newsletterSubscriptions).omit({
  id: true,
  subscribedAt: true,
});

export type InsertNewsletter = z.infer<typeof insertNewsletterSchema>;
export type Newsletter = typeof newsletterSubscriptions.$inferSelect;

// Focus areas data (static, used for type safety)
export const focusAreas = [
  {
    id: "environmental",
    title: "Environmental Sustainability & Climate",
    description: "Apply quantum computing to tackle climate challenges through carbon monitoring, weather forecasting, water quality analysis, and optimized recycling logistics.",
    projects: [
      "Exhaust pipe probe for carbon output measurement",
      "Extreme weather condition forecasting",
      "Water quality monitoring (pH, saltiness, cleanliness)",
      "Quantum optimized recycling logistics"
    ]
  },
  {
    id: "health",
    title: "Health, Medicine & Biology",
    description: "Leverage quantum simulations to advance healthcare through epidemic prediction, molecular interaction modeling, and neural network research.",
    projects: [
      "Epidemic prediction using diagnosis data and travel patterns",
      "Molecular interaction simulations",
      "Thermodynamics behavior modeling",
      "Brain neuron connection simulations"
    ]
  },
  {
    id: "finance",
    title: "Finance & Economics",
    description: "Transform financial systems with quantum-enhanced portfolio optimization, supply chain management, and advanced market forecasting.",
    projects: [
      "Quantum portfolio optimization",
      "Supply chain cost optimization",
      "Quantum blockchain exploration",
      "Quantum-enhanced financial modeling & risk analysis"
    ]
  },
  {
    id: "ai-cyber",
    title: "AI & ML + Cybersecurity",
    description: "Push the boundaries of artificial intelligence with quantum neural networks and strengthen security through quantum cryptography.",
    projects: [
      "Quantum neural networks",
      "NLP processing via quantum computing",
      "Quantum cryptography and encryption",
      "Attack simulation and encryption solutions"
    ]
  },
  {
    id: "mechatronics",
    title: "Mechatronics & SBCs",
    description: "Bridge theory and practice using Arduino, Raspberry Pi, and Orange Pi for robotics, web hosting, and distributed computing clusters.",
    projects: [
      "Robotics with Arduino and Raspberry Pi",
      "Web hosting on single board computers",
      "Kubernetes clusters for efficiency",
      "AI and LLM integration projects"
    ]
  }
] as const;

export type FocusArea = typeof focusAreas[number];

// Blog posts
export const blogPosts = pgTable("blog_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  author: text("author").notNull(),
  category: text("category").notNull(), // news, project-update, educational
  imageUrl: text("image_url"),
  published: boolean("published").default(false),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;

// Events
export const events = pgTable("events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  location: text("location").notNull(), // Online, In-Person, Hybrid
  venue: text("venue"), // Specific venue name/address
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"),
  eventType: text("event_type").notNull(), // workshop, lecture, hackathon, meetup
  registrationUrl: text("registration_url"),
  maxAttendees: integer("max_attendees"),
  published: boolean("published").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertEventSchema = createInsertSchema(events).omit({
  id: true,
  createdAt: true,
});

export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = typeof events.$inferSelect;

// Donations
export const donations = pgTable("donations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull(),
  name: text("name"),
  amount: integer("amount").notNull(), // Amount in cents
  frequency: text("frequency").notNull(), // one-time, monthly
  stripePaymentId: text("stripe_payment_id"),
  stripeCustomerId: text("stripe_customer_id"),
  status: text("status").notNull().default("pending"), // pending, completed, failed
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertDonationSchema = createInsertSchema(donations).omit({
  id: true,
  createdAt: true,
  stripePaymentId: true,
  stripeCustomerId: true,
  status: true,
});

export type InsertDonation = z.infer<typeof insertDonationSchema>;
export type Donation = typeof donations.$inferSelect;
