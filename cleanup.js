import { connect } from "./db.js";
const main = async () => {
  const db = await connect();
  // verify that no record username is null
  const [result] = await db
    .promise()
    .query(`SELECT count(*) as total_user from users where username IS NULL;`);
  if (result.total_user > 0) {
    await db.promise().query(`CALL UpdateUsernameInBatches();`);
    // repeat verify
    const [result] = await db
      .promise()
      .query(
        `SELECT count(*) as total_user from users where username IS NULL;`
      );
    console.log({ result });
    ///
  }
  await db.promise().query(`
    DROP TRIGGER IF EXISTS insert_username;
    DROP TRIGGER IF EXISTS update_username;
    DROP PROCEDURE IF EXISTS UpdateUsernameInBatches;
    ALTER TABLE users DROP COLUMN nickname;
  `);
  console.log(`DONE`);
  db.destroy();
};
main();
