import { connectToDatabase } from "@/lib/mongodb";
import { checkApiKey } from "@/lib/checkApiKey";
import { User } from "@/models/User";

async function findUserByKey(key) {
  // Try discord first
  let user = await User.findOne({ discord: key });
  if (user) return user;

  // Then try ign (case-insensitive)
  user = await User.findOne({ ign: key });
  return user;
}

export async function GET(req, { params }) {
  if (!checkApiKey(req)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  await connectToDatabase();
  const { key } = await params;

  const user = await findUserByKey(key);
  if (!user) {
    return new Response(JSON.stringify({ error: "User not found" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify(user), { status: 200 });
}

export async function PUT(req, { params }) {
  if (!checkApiKey(req)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  await connectToDatabase();
  const { key } = await params;
  const body = await req.json();

  const user = await findUserByKey(key);
  if (!user) {
    try {
      const newUser = new User(body);
      await newUser.save();
      return new Response(JSON.stringify(newUser.toObject()), { status: 201 });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 400,
      });
    }
  }

  try {
    Object.assign(user, body);
    await user.save();
    return new Response(JSON.stringify(user.toObject()), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 400,
    });
  }
}

export async function DELETE(req, { params }) {
  if (!checkApiKey(req)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  await connectToDatabase();
  const { key } = await params;

  const user = await findUserByKey(key);
  if (!user) {
    return new Response(JSON.stringify({ error: "User not found" }), {
      status: 404,
    });
  }

  await user.deleteOne();
  return new Response(null, { status: 204 });
}
