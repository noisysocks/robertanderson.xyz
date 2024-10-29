import { headers } from "next/headers";

export async function checkAdminAuth() {
  const headersList = await headers();
  const authorization = headersList.get("Authorization");

  if (!authorization) {
    return false;
  }

  const [scheme, base64Credentials] = authorization.split(" ");

  if (scheme !== "Basic") {
    return false;
  }

  const [username, password] = Buffer.from(base64Credentials, "base64")
    .toString("ascii")
    .split(":");

  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminUsername || !adminPassword) {
    console.error(
      "ADMIN_USERNAME and ADMIN_PASSWORD environment variables are not set.",
    );
    return false;
  }

  return username === adminUsername && password === adminPassword;
}
