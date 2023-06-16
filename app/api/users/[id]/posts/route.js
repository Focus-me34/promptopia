import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, {params}) => {
  const { id: userId } = params;
  console.log(userId);

  try {
    await connectToDB();
    const prompts = await Prompt.find({
      creator: userId,
    }).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 201 });
  } catch (e) {
    return new Response(`Failed to fetch all prompts for user with id: ${userId}`, { status: 500 });
  }
};
