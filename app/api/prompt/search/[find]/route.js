import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const options =
      params.find === "" || !params.find
        ? {}
        : {
            $or: [
              { prompt: { $regex: params.find, $options: "i" } },
              { tag: { $regex: params.find, $options: "i" } },
            ],
          };
    const prompts = await Prompt.find(options).populate("creator");
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response(`Failed to fetch prompts: ${error.message}`, {
      status: 500,
    });
  }
};
