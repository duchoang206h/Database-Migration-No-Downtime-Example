import { faker } from "@faker-js/faker";
import { connect, sleep } from "./db.js";
const main = async () => {
  const db = await connect();
  await db
    .promise()
    .query(
      `CREATE TABLE IF NOT EXISTS users (user_id BIGINT AUTO_INCREMENT PRIMARY KEY,nickname VARCHAR(100));`
    );
  while (true) {
    const nickname = faker.internet.userName();
    await db
      .promise()
      .query(`INSERT INTO users(nickname) VALUES(?)`, [nickname]);
    console.log(
      `[${new Date().toLocaleTimeString()}] insert: nickname `,
      nickname
    );
    await sleep(200);
  }
};
main();
