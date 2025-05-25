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
  const users = await User.find();
  return new Response(JSON.stringify(users), { status: 200 });
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
