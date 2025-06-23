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

  if (ign) {
    const user = await User.findOne({ ign: new RegExp(`^${ign}$`, "i") });
    if (!user) {
      return jsonResponse({ error: "User not found" }, 404);
    }
    return jsonResponse(user);
  }

  // Extract and validate pagination parameters
  const page = Math.max(1, parseInt(searchParams.get("page")) || 1);
  const limit = Math.min(
    100,
    Math.max(1, parseInt(searchParams.get("limit")) || 20)
  );
  const skip = (page - 1) * limit;

  // Get paginated users and total count
  const [users, totalUsers] = await Promise.all([
    User.find().skip(skip).limit(limit),
    User.countDocuments(),
  ]);

  // Calculate pagination metadata
  const totalPages = Math.ceil(totalUsers / limit);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  const response = {
    users,
    pagination: {
      currentPage: page,
      totalPages,
      totalUsers,
      hasNextPage,
      hasPrevPage,
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
