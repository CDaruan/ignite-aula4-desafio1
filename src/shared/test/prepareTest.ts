import { hash } from "bcryptjs";
import createConnection from "../../database/index";

import { v4 } from "uuid";
import { User } from "../../modules/users/entities/User";
export async function runMigrations() {
  const connection = await createConnection("localhost");
  await connection.runMigrations();
  await connection.close();
}

export async function createUser(): Promise<User> {
  const id = v4();
  const password = await hash("1234", 8)

  let user = {
    id,
    name: "Name test",
    email: "email@test.com",
    password,
    created_at: new Date(),
    updated_at: new Date(),
    statement: [],
  } as User;
  const connection = await createConnection("localhost");

  await connection.query(`INSERT INTO users(id, name, email, password)
    VALUES ('${id}','${user.name}', '${user.email}','${password}')`)

  await connection.close();
  return user;

}

export async function dropDatabase() {
  const connection = await createConnection("localhost");
  await connection.dropDatabase();
  await connection.close();
};

