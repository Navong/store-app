// lib/session.ts
import { currentUser } from "@clerk/nextjs/server";

export async function getCurrentUser() {
  try {
    const user = await currentUser();

    if (!user) {
      return null; // No authenticated user
    }

    return {
      id: user.id,
      name: user.fullName || "Anonymous",
      email: user.emailAddresses[0]?.emailAddress,
    };
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
}
