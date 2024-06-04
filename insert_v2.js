import { faker } from "@faker-js/faker";
import { connect, sleep } from "./db.js";
const main = async () => {
  const db = await connect();
  while (true) {
    const username = faker.internet.userName();
    await db
      .promise()
      .query(`INSERT INTO users(username) VALUES(?)`, [username]);
    console.log(`[${new Date().toLocaleTimeString()}] insert: `, username);
    await sleep(200);
  }
};
main();
