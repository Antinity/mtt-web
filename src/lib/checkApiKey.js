export function checkApiKey(req) {
  const key = req.headers.get("api");
  if (!key || key !== process.env.API_KEY) {
    return false;
  }
  return true;
}
