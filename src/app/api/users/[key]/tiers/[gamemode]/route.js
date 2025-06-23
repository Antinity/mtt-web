import { connectToDatabase } from "@/lib/mongodb";
import { checkApiKey } from "@/lib/checkApiKey";
import { User } from "@/models/User";
import { jsonResponse } from "@/lib/apiResponse";

export async function PUT(req, { params }) {
  if (!checkApiKey(req)) {
    return jsonResponse({ error: "Unauthorized" }, 401);
  }

  await connectToDatabase();

  const { key, gamemode } = params;
  const body = await req.json();
  const { tier } = body;

  if (typeof tier !== "number") {
    return jsonResponse({ error: "Tier must be a number" }, 400);
  }

  try {
    const user = await User.findOneAndUpdate(
      { discord: key },
      { [`tiers.${gamemode}`]: tier },
      { upsert: true, new: true }
    );

    return jsonResponse(user);
  } catch (err) {
    return jsonResponse({ error: err.message }, 400);
  }
}
