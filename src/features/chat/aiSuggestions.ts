"use server";

export const getAiSuggestions = async (
  message: string,
  role: "user" | "vendor" | "admin",
  targetRole: "user" | "vendor" | "admin",
) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/chat/ai-suggestion`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, role, targetRole }),
    });

    return await res.json();
  } catch (error) {
    console.error(error);
    return { suggestions: [] };
  }
};
