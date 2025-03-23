import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// Create a SQL connection
const sql = neon(process.env.DATABASE_URL!);
// Initialize drizzle with the connection
const db = drizzle(sql, { schema: { ...schema } });

async function main() {
  const queryUser = await db.query.usersTable.findMany({
    with: {
      userReferences: true,
      posts: true,
    },
  });
  console.log(queryUser);
}

// Only run main() if this file is executed directly
if (require.main === module) {
  // Change this to insertSampleData() to insert sample data instead
  main()
    .then(() => console.log("Script completed successfully"))
    .catch((err) => console.error("Script failed:", err))
    .finally(() => process.exit(0));
}

export { db };
