import { connect } from "./db.js";
const main = async () => {
  const db = await connect();
  await db.promise().query(`
    CREATE PROCEDURE UpdateUsernameInBatches()
    BEGIN
        DECLARE done BOOLEAN DEFAULT FALSE;
        DECLARE batch_size INT DEFAULT 1000;
        DECLARE offset INT DEFAULT 0;
        DECLARE cur CURSOR FOR
            SELECT user_id
            FROM users
            WHERE username IS NULL
            LIMIT offset, batch_size;
        DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
        OPEN cur;
        batch_loop: LOOP
            FETCH cur INTO offset;
            IF done THEN
                LEAVE batch_loop;
            END IF;
            UPDATE users
            SET username = nickname
            WHERE user_id = offset;
        END LOOP;
        CLOSE cur;
    END;
    `);
  await db.promise().query(`CALL UpdateUsernameInBatches();`);
  db.destroy();
};
main();
