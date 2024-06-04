import mysql from "mysql2";
const connectionUri = `mysql://root:root@localhost:3309/user`;
export const connect = async () => {
  return mysql.createConnection({
    uri: connectionUri,
    multipleStatements: true,
  });
};
export const sleep = (time) =>
  new Promise((resolve, _) => setTimeout(resolve, time));
