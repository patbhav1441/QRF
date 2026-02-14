import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertNewsletterSchema, insertBlogPostSchema, insertEventSchema, insertDonationSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.status(201).json({ success: true, contact });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          error: "Invalid data", 
          details: error.errors 
        });
      } else {
        console.error("Contact submission error:", error);
        res.status(500).json({ 
          success: false, 
          error: "Failed to submit contact form" 
        });
      }
    }
  });

  // Newsletter subscription
  app.post("/api/newsletter", async (req, res) => {
    try {
      const validatedData = insertNewsletterSchema.parse(req.body);
      
      const existing = await storage.getNewsletterByEmail(validatedData.email);
      if (existing) {
        res.status(200).json({ 
          success: true, 
          message: "Already subscribed",
          newsletter: existing 
        });
        return;
      }
      
      const newsletter = await storage.createNewsletter(validatedData);
      res.status(201).json({ success: true, newsletter });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          error: "Invalid email address", 
          details: error.errors 
        });
      } else {
        console.error("Newsletter subscription error:", error);
        res.status(500).json({ 
          success: false, 
          error: "Failed to subscribe" 
        });
      }
    }
  });

  // Get all contacts (for admin purposes)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json({ success: true, contacts });
    } catch (error) {
      console.error("Get contacts error:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to get contacts" 
      });
    }
  });

  // Get all newsletter subscribers (for admin purposes)
  app.get("/api/newsletters", async (req, res) => {
    try {
      const newsletters = await storage.getNewsletters();
      res.json({ success: true, newsletters });
    } catch (error) {
      console.error("Get newsletters error:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to get newsletters" 
      });
    }
  });

  // Blog Posts API
  app.get("/api/blog", async (req, res) => {
    try {
      const publishedOnly = req.query.all !== "true";
      const posts = await storage.getBlogPosts(publishedOnly);
      res.json({ success: true, posts });
    } catch (error) {
      console.error("Get blog posts error:", error);
      res.status(500).json({ success: false, error: "Failed to get blog posts" });
    }
  });

  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (!post) {
        res.status(404).json({ success: false, error: "Blog post not found" });
        return;
      }
      res.json({ success: true, post });
    } catch (error) {
      console.error("Get blog post error:", error);
      res.status(500).json({ success: false, error: "Failed to get blog post" });
    }
  });

  app.post("/api/blog", async (req, res) => {
    try {
      const postData = {
        ...req.body,
        publishedAt: req.body.publishedAt ? new Date(req.body.publishedAt) : null,
      };
      const validatedData = insertBlogPostSchema.parse(postData);
      const post = await storage.createBlogPost(validatedData);
      res.status(201).json({ success: true, post });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, error: "Invalid data", details: error.errors });
      } else {
        console.error("Create blog post error:", error);
        res.status(500).json({ success: false, error: "Failed to create blog post" });
      }
    }
  });

  app.patch("/api/blog/:id", async (req, res) => {
    try {
      const post = await storage.updateBlogPost(req.params.id, req.body);
      if (!post) {
        res.status(404).json({ success: false, error: "Blog post not found" });
        return;
      }
      res.json({ success: true, post });
    } catch (error) {
      console.error("Update blog post error:", error);
      res.status(500).json({ success: false, error: "Failed to update blog post" });
    }
  });

  app.delete("/api/blog/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteBlogPost(req.params.id);
      if (!deleted) {
        res.status(404).json({ success: false, error: "Blog post not found" });
        return;
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Delete blog post error:", error);
      res.status(500).json({ success: false, error: "Failed to delete blog post" });
    }
  });

  // Events API
  app.get("/api/events", async (req, res) => {
    try {
      const publishedOnly = req.query.all !== "true";
      const upcomingOnly = req.query.past !== "true";
      const eventList = await storage.getEvents(publishedOnly, upcomingOnly);
      res.json({ success: true, events: eventList });
    } catch (error) {
      console.error("Get events error:", error);
      res.status(500).json({ success: false, error: "Failed to get events" });
    }
  });

  app.get("/api/events/:id", async (req, res) => {
    try {
      const event = await storage.getEvent(req.params.id);
      if (!event) {
        res.status(404).json({ success: false, error: "Event not found" });
        return;
      }
      res.json({ success: true, event });
    } catch (error) {
      console.error("Get event error:", error);
      res.status(500).json({ success: false, error: "Failed to get event" });
    }
  });

  app.post("/api/events", async (req, res) => {
    try {
      const validatedData = insertEventSchema.parse({
        ...req.body,
        startDate: new Date(req.body.startDate),
        endDate: req.body.endDate ? new Date(req.body.endDate) : null,
      });
      const event = await storage.createEvent(validatedData);
      res.status(201).json({ success: true, event });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, error: "Invalid data", details: error.errors });
      } else {
        console.error("Create event error:", error);
        res.status(500).json({ success: false, error: "Failed to create event" });
      }
    }
  });

  app.patch("/api/events/:id", async (req, res) => {
    try {
      const updateData = {
        ...req.body,
        ...(req.body.startDate && { startDate: new Date(req.body.startDate) }),
        ...(req.body.endDate && { endDate: new Date(req.body.endDate) }),
      };
      const event = await storage.updateEvent(req.params.id, updateData);
      if (!event) {
        res.status(404).json({ success: false, error: "Event not found" });
        return;
      }
      res.json({ success: true, event });
    } catch (error) {
      console.error("Update event error:", error);
      res.status(500).json({ success: false, error: "Failed to update event" });
    }
  });

  app.delete("/api/events/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteEvent(req.params.id);
      if (!deleted) {
        res.status(404).json({ success: false, error: "Event not found" });
        return;
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Delete event error:", error);
      res.status(500).json({ success: false, error: "Failed to delete event" });
    }
  });

  // Donations API
  app.post("/api/donations", async (req, res) => {
    try {
      const validatedData = insertDonationSchema.parse(req.body);
      const donation = await storage.createDonation(validatedData);
      res.status(201).json({ success: true, donation });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, error: "Invalid data", details: error.errors });
      } else {
        console.error("Create donation error:", error);
        res.status(500).json({ success: false, error: "Failed to create donation" });
      }
    }
  });

  app.get("/api/donations", async (req, res) => {
    try {
      const donationList = await storage.getDonations();
      res.json({ success: true, donations: donationList });
    } catch (error) {
      console.error("Get donations error:", error);
      res.status(500).json({ success: false, error: "Failed to get donations" });
    }
  });

  return httpServer;
}
