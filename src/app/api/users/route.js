import { connectToDatabase } from "@/lib/mongodb";
import { checkApiKey } from "@/lib/checkApiKey";
import { User } from "@/models/User";
import { jsonResponse } from "@/lib/apiResponse";

export async function GET(req) {
  if (!checkApiKey(req)) {
    return jsonResponse({ error: "Unauthorized" }, 401);
  }

  await connectToDatabase();

  const { searchParams } = new URL(req.url);
  const ign = searchParams.get("ign");
  const gamemode = searchParams.get("gamemode");
  const tier = searchParams.get("tier");
  const sortByTier = searchParams.get("sortByTier");

  if (ign) {
    const user = await User.findOne({ ign: new RegExp(`^${ign}$`, "i") });
    if (!user) {
      return jsonResponse({ error: "User not found" }, 404);
    }
    return jsonResponse(user);
  }

  const cursor = searchParams.get("cursor");
  const limit = Math.min(
    100,
    Math.max(1, parseInt(searchParams.get("limit")) || 20)
  );

  if (cursor && !cursor.match(/^[0-9a-fA-F]{24}$/)) {
    return jsonResponse({ error: "Invalid cursor format" }, 400);
  }

  const filter = cursor ? { _id: { $gt: cursor } } : {};

  if (gamemode) {
    if (tier != null) {
      const tierValue = parseInt(tier);
      if (isNaN(tierValue)) {
        return jsonResponse({ error: "Invalid tier value" }, 400);
      }
      filter[`tiers.${gamemode}`] = tierValue;
    } else {
      filter[`tiers.${gamemode}`] = { $exists: true };
    }
  }

  const sortOptions = { _id: 1 };
  if (gamemode && sortByTier) {
    const sortDirection = sortByTier.toLowerCase() === "desc" ? -1 : 1;
    sortOptions[`tiers.${gamemode}`] = sortDirection;
  }

  const users = await User.find(filter)
    .sort(sortOptions)
    .limit(limit + 1)
    .lean()
    .exec();

  const hasMore = users.length > limit;

  if (hasMore) {
    users.pop();
  }

  const nextCursor = users.length > 0 ? users[users.length - 1]._id : null;

  const response = {
    users,
    pagination: {
      nextCursor,
      hasMore,
      limit,
    },
  };

  return jsonResponse(response);
}

export async function POST(req) {
  if (!checkApiKey(req)) {
    return jsonResponse({ error: "Unauthorized" }, 401);
  }

  await connectToDatabase();
  const body = await req.json();

  try {
    const user = new User(body);
    await user.save();
    return jsonResponse(user, 201);
  } catch (err) {
    return jsonResponse({ error: err.message }, 400);
  }
}
