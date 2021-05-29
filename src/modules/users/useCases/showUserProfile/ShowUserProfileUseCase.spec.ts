import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";


let inMemoryUsersRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;
let showUserProfileUseCase: ShowUserProfileUseCase;

describe("Show user profile", () => {

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    showUserProfileUseCase = new ShowUserProfileUseCase(
      inMemoryUsersRepository
    );
    createUserUseCase = new CreateUserUseCase(
      inMemoryUsersRepository
    );
  });

  it("Shold be able to show an user profile", async () => {

    const user = {
      name: "Name test",
      email: "email@test.com",
      password: "12345"
    };
    const createdUser = await createUserUseCase.execute(user);

    const profile = await showUserProfileUseCase.execute(createdUser.id as string);

    expect(profile.id).toEqual(createdUser.id)
  });


  it("Shold not be able to show a profile from a not existing user", async () => {
    async function showNonexistetUserProfile() {
      const profile = await showUserProfileUseCase.execute("FakeId");

    }

    expect(async () => showNonexistetUserProfile()).rejects.toBeInstanceOf(AppError);
  });
});
