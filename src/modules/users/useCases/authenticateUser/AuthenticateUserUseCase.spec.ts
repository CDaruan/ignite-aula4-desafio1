import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";


let inMemoryUsersRepository: InMemoryUsersRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      inMemoryUsersRepository
    );
    createUserUseCase = new CreateUserUseCase(
      inMemoryUsersRepository
    );
  });

  it("shold be able to authenticate an user", async () => {
    const user = {
      name: "Name test",
      email: "email@test.com",
      password: "12345"
    };
    await createUserUseCase.execute(user);

    const authResponse = await authenticateUserUseCase.execute({ email: user.email, password: user.password });

    expect(authResponse).toHaveProperty("token");
  });

  it("shold not be able to authenticate an user with a nonexistent email", async () => {
    async function authenticateUserWithFakeEmail() {
      const user = {
        name: "Name test",
        email: "email@test.com",
        password: "12345"
      };
      await createUserUseCase.execute(user);
      await authenticateUserUseCase.execute({ email: "fake@email.com", password: user.password });
    }

    expect(authenticateUserWithFakeEmail()).rejects.toBeInstanceOf(AppError);
  });

  it("shold not be able to authenticate an user with a wrong password", async () => {
    async function authenticateUserWithWrongPassword() {
      const user = {
        name: "Name test",
        email: "email@test.com",
        password: "12345"
      };
      await createUserUseCase.execute(user);
      await authenticateUserUseCase.execute({ email: user.email, password: "wrong password" });
    }

    expect(authenticateUserWithWrongPassword()).rejects.toBeInstanceOf(AppError);
  });
});
