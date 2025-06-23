import { connectToDatabase } from "@/lib/mongodb";
import { checkApiKey } from "@/lib/checkApiKey";
import { User } from "@/models/User";

export async function GET(req) {
  if (!checkApiKey(req)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  await connectToDatabase();
  
  const { searchParams } = new URL(req.url);
  const ign = searchParams.get('ign');
  
  if (ign) {
    const user = await User.findOne({ ign: new RegExp(`^${ign}$`, 'i') });
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify(user), { status: 200 });
  }
  
  // Extract and validate pagination parameters
  const page = Math.max(1, parseInt(searchParams.get('page')) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit')) || 20));
  const skip = (page - 1) * limit;
  
  // Get paginated users and total count
  const [users, totalUsers] = await Promise.all([
    User.find().skip(skip).limit(limit),
    User.countDocuments()
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
      hasPrevPage
    }
  };
  
  return new Response(JSON.stringify(response), { status: 200 });
}

export async function POST(req) {
  if (!checkApiKey(req)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  await connectToDatabase();
  const body = await req.json();

  try {
    const user = new User(body);
    await user.save();
    return new Response(JSON.stringify(user), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 400,
    });
  }
}
