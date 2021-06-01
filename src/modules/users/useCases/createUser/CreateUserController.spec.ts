import { createUser, dropDatabase, runMigrations } from "../../../../shared/test/prepareTest"

describe ("Create User Controller", () => {
  beforeAll(async () => {
    await runMigrations();
  })

  afterAll(async () => {
    await dropDatabase();
  });

  it("should be able to create a new user", () => {

  })
})
