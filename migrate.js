import { connect } from "./db.js";
const main = async () => {
  const db = await connect();
  await db.promise().query(`ALTER TABLE users ADD username varchar(100);`);
  await db.promise().query(`
      CREATE TRIGGER insert_username
      BEFORE INSERT ON users
      FOR EACH ROW
      BEGIN
          IF NEW.username IS NULL THEN
              SET NEW.username = NEW.nickname;
          END IF;
      END;
    `);
  await db.promise().query(`
      CREATE TRIGGER update_username
      BEFORE UPDATE ON users
      FOR EACH ROW
      BEGIN
          IF NEW.username IS NULL THEN
              SET NEW.username = NEW.nickname;
          END IF;
      END;
    `);
  db.destroy();
};
main();
