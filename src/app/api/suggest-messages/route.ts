import { streamText, generateText } from "ai";
import { google } from "@ai-sdk/google";

const geminiModel = google("gemini-1.5-pro-latest");

export const runtime = "edge";

export async function GET() {
  try {
    const prompt = `Create a list of three open-ended engaging questions formatted as a single string. Each question should be separted by '||'. Thease questions are for an anonymous social messaging platform, like Qooh.me, and shoudl be suitable for a diverse audience. Avoid a personal or sensitive topics., focusing instead on universan themes that encourage freiedly interaction. For example, your output should be strutured like this: 'What's a hobby you've recently started? || If you could have dinner with any historical figure, who would it be? || What's a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a postive and welcoming conversation environment.`;

    // // streaming response
    // const { textStream } = await streamText({
    //   model: geminiModel,
    //   prompt,
    // });

    // const encoder = new TextEncoder();
    // const stream = new ReadableStream({
    //   async start(controller) {
    //     for await (const chunk of textStream) {
    //       controller.enqueue(encoder.encode(chunk));
    //     }
    //     controller.close();
    //   },
    // });

    // return new Response(stream, {
    //   headers: {
    //     "Content-Type": "text/plain; charset=utf-8",
    //     "Transfer-Encoding": "chunked",
    //   },
    // });

    // without streaming response
    const { text } = await generateText({
      model: geminiModel,
      prompt,
    });

    return Response.json(
      {
        completion: text.trim(),
        message: "Questions generated successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Gemini API error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
