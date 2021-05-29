import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";


let inMemoryUsersRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe("Create User", () => {

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(
      inMemoryUsersRepository
    );
  });

  it("shold be able to create a new user", async () => {

    const user = {
      name: "Name test",
      email: "email@test.com",
      password: "12345"
    };
    const createdUser = await createUserUseCase.execute(user);


    expect(createdUser).toHaveProperty("id");
  });


  it("shold not be able to create an user with an existing email", async () => {
    async function createUserWithAExistentEmail() {
      const user = {
        name: "Name test",
        email: "email@test.com",
        password: "12345"
      };
      await createUserUseCase.execute(user);

      await createUserUseCase.execute(user);
    }

    expect(async () => createUserWithAExistentEmail()).rejects.toBeInstanceOf(AppError);
  });
});
