import app from "./app";

import "dotenv/config";
import config from "./config";
import { prisma } from "./lib/prsima";

const PORT = config.port

async function main() {
  try {
    await prisma.$connect();
    console.log("database connected successfully");

    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("server error", error);
    process.exit(1);
  }
}

main();