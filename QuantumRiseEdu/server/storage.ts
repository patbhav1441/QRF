import { eq, desc } from "drizzle-orm";
import { db } from "./db";
import {
  users,
  contactSubmissions,
  newsletterSubscriptions,
  blogPosts,
  events,
  donations,
  type User,
  type InsertUser,
  type Contact,
  type InsertContact,
  type Newsletter,
  type InsertNewsletter,
  type BlogPost,
  type InsertBlogPost,
  type Event,
  type InsertEvent,
  type Donation,
  type InsertDonation,
} from "@shared/schema";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  
  createNewsletter(newsletter: InsertNewsletter): Promise<Newsletter>;
  getNewsletterByEmail(email: string): Promise<Newsletter | undefined>;
  getNewsletters(): Promise<Newsletter[]>;
  
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  getBlogPosts(publishedOnly?: boolean): Promise<BlogPost[]>;
  deleteBlogPost(id: string): Promise<boolean>;
  
  createEvent(event: InsertEvent): Promise<Event>;
  updateEvent(id: string, event: Partial<InsertEvent>): Promise<Event | undefined>;
  getEvent(id: string): Promise<Event | undefined>;
  getEvents(publishedOnly?: boolean, upcomingOnly?: boolean): Promise<Event[]>;
  deleteEvent(id: string): Promise<boolean>;
  
  createDonation(donation: InsertDonation): Promise<Donation>;
  updateDonation(id: string, updates: Partial<Donation>): Promise<Donation | undefined>;
  getDonation(id: string): Promise<Donation | undefined>;
  getDonations(): Promise<Donation[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const result = await db.insert(contactSubmissions).values(insertContact).returning();
    return result[0];
  }

  async getContacts(): Promise<Contact[]> {
    return db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.submittedAt));
  }

  async createNewsletter(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
    const result = await db.insert(newsletterSubscriptions).values(insertNewsletter).returning();
    return result[0];
  }

  async getNewsletterByEmail(email: string): Promise<Newsletter | undefined> {
    const result = await db.select().from(newsletterSubscriptions)
      .where(eq(newsletterSubscriptions.email, email.toLowerCase()));
    return result[0];
  }

  async getNewsletters(): Promise<Newsletter[]> {
    return db.select().from(newsletterSubscriptions).orderBy(desc(newsletterSubscriptions.subscribedAt));
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const result = await db.insert(blogPosts).values(post).returning();
    return result[0];
  }

  async updateBlogPost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const result = await db.update(blogPosts)
      .set({ ...post, updatedAt: new Date() })
      .where(eq(blogPosts.id, id))
      .returning();
    return result[0];
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    const result = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return result[0];
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const result = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return result[0];
  }

  async getBlogPosts(publishedOnly = true): Promise<BlogPost[]> {
    if (publishedOnly) {
      return db.select().from(blogPosts)
        .where(eq(blogPosts.published, true))
        .orderBy(desc(blogPosts.publishedAt));
    }
    return db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    const result = await db.delete(blogPosts).where(eq(blogPosts.id, id)).returning();
    return result.length > 0;
  }

  async createEvent(event: InsertEvent): Promise<Event> {
    const result = await db.insert(events).values(event).returning();
    return result[0];
  }

  async updateEvent(id: string, event: Partial<InsertEvent>): Promise<Event | undefined> {
    const result = await db.update(events)
      .set(event)
      .where(eq(events.id, id))
      .returning();
    return result[0];
  }

  async getEvent(id: string): Promise<Event | undefined> {
    const result = await db.select().from(events).where(eq(events.id, id));
    return result[0];
  }

  async getEvents(publishedOnly = true, upcomingOnly = true): Promise<Event[]> {
    let query = db.select().from(events);
    
    const allEvents = await query.orderBy(desc(events.startDate));
    
    return allEvents.filter(event => {
      if (publishedOnly && !event.published) return false;
      if (upcomingOnly && event.startDate < new Date()) return false;
      return true;
    });
  }

  async deleteEvent(id: string): Promise<boolean> {
    const result = await db.delete(events).where(eq(events.id, id)).returning();
    return result.length > 0;
  }

  async createDonation(donation: InsertDonation): Promise<Donation> {
    const result = await db.insert(donations).values(donation).returning();
    return result[0];
  }

  async updateDonation(id: string, updates: Partial<Donation>): Promise<Donation | undefined> {
    const result = await db.update(donations)
      .set(updates)
      .where(eq(donations.id, id))
      .returning();
    return result[0];
  }

  async getDonation(id: string): Promise<Donation | undefined> {
    const result = await db.select().from(donations).where(eq(donations.id, id));
    return result[0];
  }

  async getDonations(): Promise<Donation[]> {
    return db.select().from(donations).orderBy(desc(donations.createdAt));
  }
}

export const storage = new DatabaseStorage();
