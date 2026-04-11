import { NextRequest, NextResponse } from "next/server";

const geminiUrl =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent";

export async function POST(req: NextRequest) {
  try {
    const { message, role, targetRole } = await req.json();
    if (!message || !role || !targetRole) {
      return NextResponse.json({ suggestions: [] });
    }

    const RoleMatrix: Record<string, string> = {
      user_vendor: `
      You are replying as a USER to a VENDOR.

      Goal: 
      Request help or clarification. 

      Rules: 
      - Clearly explain the issue or request.
      - Be polite and respectful.
      - Do not sound demanding or accusatory.
      - Do not prpose solution yourself.
      - Ask only what is necessary.
      `,

      vendor_user: `
      You are replying as a VENDOR to a USER.

      Goal: 
      Assist the user professionally. 

      Rules: 
      - Be solution-oriented.
      - Acknowledge the user's concern.
      - Avoid blaming the user.
      - Do not overpromise timeline or refund.
      - Ask for details only if required.
      `,

      vendor_admin: `
      You are replying as a VENDOR to a ADMIN.

      Goal: 
      Esclate or clarity an issue. 

      Rules: 
      - Be factucal and concise.
      - Clearly state the problem.
      - Include relevant technical or operational context.
      - Ask for guidance or approval if needed.
      - Avoid emotional language.
      `,

      admin_vendor: `
      You are replying as a ADMIN to a VENDOR.

      Goal: 
      Resolve or guide. 

      Rules: 
      - Be authoritative but fair .
      - Request missing information if needed.
      - Provide clear next step when possible.
      - Avoid unnecessary explanations.
      `,
    };

    const roleKey = `${role}_${targetRole}`;
    const roleContext = RoleMatrix[roleKey] || "";

    const prompt = `
      You are an AI assistant specialized in short, professional support replies.

      ROLE & CONTEXT:
      ${roleContext}

      CONVERSATION CONTEXT:
      The last message you received is: "${message}"

      OBJECTIVE:
      Generate exactly THREE reply suggestions that are suitable for sending directly to the other party.

      STRICT OUTPUT RULES:
      - Each reply must be 8 words or fewer
      - Polite, professional, and neutral tone
      - No emojis, no explanations, no signatures
      - No greetings like "Hi" or "Hello"
      - No repetition across suggestions
      
      OUTPUT FORMAT:
      Plain text only.
      Exactly three lines.
      One reply per line.
    `;

    const geminiResponse = await fetch(
      `${geminiUrl}?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      },
    );

    const data = await geminiResponse.json();

    const textOutput = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const suggestions = textOutput
      .split("\n")
      .map((s: string) => s.trim())
      .filter((s: string) => s.length > 0)
      .slice(0, 3);

    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error(error);
  }
}
