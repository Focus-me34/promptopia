import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req, res) => {
  const { prompt, tag, userId } = await req.json();

  try {
    await connectToDB();
    const newPrompt = await Prompt.create({ creator: userId, prompt, tag })
    await newPrompt.save();

    return new Response(newPrompt, { status: 201 })
  } catch (e) {
    return new Response("Failed to create a new prompt", { status: 500 })
  }
}
