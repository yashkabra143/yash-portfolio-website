import { db } from "@db";
import { messages, type MessageInsert } from "@shared/schema";

export const storage = {
  saveContactMessage: async (message: MessageInsert) => {
    try {
      const [savedMessage] = await db.insert(messages)
        .values(message)
        .returning();
      
      return savedMessage;
    } catch (error) {
      console.error("Error saving contact message:", error);
      throw error;
    }
  },
  
  getContactMessages: async () => {
    try {
      return await db.query.messages.findMany({
        orderBy: (messages, { desc }) => [desc(messages.createdAt)]
      });
    } catch (error) {
      console.error("Error getting contact messages:", error);
      throw error;
    }
  }
};
