import db from "./database";

async function testConnection(): Promise<void> {
  try {
    const result = await db.one("SELECT NOW() AS current_time");

    console.log("Database connection successful!");
    console.log("PostgreSQL time:", result.current_time);
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exitCode = 1;
  } finally {
    await db.$pool.end();
  }
}

void testConnection();
