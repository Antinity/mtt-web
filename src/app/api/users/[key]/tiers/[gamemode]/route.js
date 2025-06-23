import { connectToDatabase } from "@/lib/mongodb";
import { checkApiKey } from "@/lib/checkApiKey";
import { User } from "@/models/User";

export async function PUT(req, { params }) {
  if (!checkApiKey(req)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  await connectToDatabase();

  const { key, gamemode } = params;
  const body = await req.json();
  const { tier } = body;

  if (typeof tier !== "number") {
    return new Response(JSON.stringify({ error: "Tier must be a number" }), {
      status: 400,
    });
  }

  try {
    const user = await User.findOneAndUpdate(
      { discord: key },
      { [`tiers.${gamemode}`]: tier },
      { upsert: true, new: true }
    );

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 400,
    });
  }
}
