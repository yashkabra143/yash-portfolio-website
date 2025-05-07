import { db } from "./index";
import * as schema from "@shared/schema";

async function seed() {
  try {
    // We don't need to seed any initial data for this portfolio site
    // The contact messages will be stored when users submit the contact form
    
    console.log("✅ Database is ready");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  }
}

seed();
