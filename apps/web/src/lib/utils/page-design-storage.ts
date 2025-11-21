import { PageDesign } from "@/lib/types/page-builder";

export class PageDesignStorage {
  private static STORAGE_KEY_PREFIX = "event-design-";

  /**
   * Save a page design for a specific event
   */
  static saveDesign(eventId: number | string, design: PageDesign): void {
    try {
      const key = `${this.STORAGE_KEY_PREFIX}${eventId}`;
      localStorage.setItem(key, JSON.stringify(design));
    } catch (error) {
      console.error("Failed to save page design:", error);
      throw new Error("Could not save page design");
    }
  }

  /**
   * Load a page design for a specific event
   */
  static loadDesign(eventId: number | string): PageDesign | null {
    try {
      const key = `${this.STORAGE_KEY_PREFIX}${eventId}`;
      const data = localStorage.getItem(key);
      if (!data) return null;
      return JSON.parse(data) as PageDesign;
    } catch (error) {
      console.error("Failed to load page design:", error);
      return null;
    }
  }

  /**
   * Delete a page design for a specific event
   */
  static deleteDesign(eventId: number | string): void {
    try {
      const key = `${this.STORAGE_KEY_PREFIX}${eventId}`;
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Failed to delete page design:", error);
    }
  }

  /**
   * Get all saved event designs
   */
  static getAllDesigns(): Record<string, PageDesign> {
    const designs: Record<string, PageDesign> = {};
    
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(this.STORAGE_KEY_PREFIX)) {
          const eventId = key.replace(this.STORAGE_KEY_PREFIX, "");
          const data = localStorage.getItem(key);
          if (data) {
            designs[eventId] = JSON.parse(data);
          }
        }
      }
    } catch (error) {
      console.error("Failed to load all designs:", error);
    }
    
    return designs;
  }

  /**
   * Export design as JSON file
   */
  static exportDesignAsFile(eventId: number | string, design: PageDesign): void {
    const dataStr = JSON.stringify(design, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `event-${eventId}-design-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  /**
   * Import design from JSON file
   */
  static async importDesignFromFile(file: File): Promise<PageDesign> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const design = JSON.parse(e.target?.result as string) as PageDesign;
          resolve(design);
        } catch (error) {
          reject(new Error("Invalid design file format"));
        }
      };
      
      reader.onerror = () => {
        reject(new Error("Failed to read file"));
      };
      
      reader.readAsText(file);
    });
  }
}

// For database integration, create these API helper functions:

/**
 * Save design to database (replace with your actual API call)
 */
export async function saveDesignToDatabase(
  eventId: number | string,
  design: PageDesign
): Promise<void> {
  // TODO: Replace with your actual API endpoint
  const response = await fetch(`/api/events/${eventId}/design`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(design),
  });

  if (!response.ok) {
    throw new Error("Failed to save design to database");
  }
}

/**
 * Load design from database (replace with your actual API call)
 */
export async function loadDesignFromDatabase(
  eventId: number | string
): Promise<PageDesign | null> {
  // TODO: Replace with your actual API endpoint
  try {
    const response = await fetch(`/api/events/${eventId}/design`);
    
    if (response.status === 404) {
      return null;
    }
    
    if (!response.ok) {
      throw new Error("Failed to load design from database");
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error loading design:", error);
    return null;
  }
}