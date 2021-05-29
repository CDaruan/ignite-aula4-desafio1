import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { CreateStatementUseCase } from "../createStatement/CreateStatementUseCase";
import { ICreateStatementDTO } from "../createStatement/ICreateStatementDTO";
import { GetBalanceUseCase } from "./GetBalanceUseCase";

let inMemoryStatementsRepository: InMemoryStatementsRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let createStatementUseCase: CreateStatementUseCase;
let createUserUseCase: CreateUserUseCase;
let getBalanceUseCase: GetBalanceUseCase;

let user_id: string;

enum OperationType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
}

describe("Get Balance", () => {

  beforeAll(async () => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
    user_id = (await createUserUseCase.execute({ email: "email@test", password: "password", name: "test" })).id as string;

  });

  beforeEach(() => {
    inMemoryStatementsRepository = new InMemoryStatementsRepository();
    createStatementUseCase = new CreateStatementUseCase(inMemoryUsersRepository, inMemoryStatementsRepository);
    getBalanceUseCase = new GetBalanceUseCase(inMemoryStatementsRepository, inMemoryUsersRepository)
  });

  it("shold be able to get the balance and all statements of an user", async () => {
    const deposit: ICreateStatementDTO = {
      user_id,
      amount: 2000,
      description: "Description test",
      type: 'deposit' as OperationType
    };
    await createStatementUseCase.execute(deposit);
    await createStatementUseCase.execute(deposit);

    const balance = await getBalanceUseCase.execute({ user_id });

    expect(balance.balance).toEqual(4000)
    expect(balance.statement.length).toEqual(2)
  });


  it("shold not be able to get the balance of a nonexistent user", async () => {
    async function getBalanceOfANonexistentUser() {
      const balance = await getBalanceUseCase.execute({ user_id:"FakeId" });
    }

    expect(async () => getBalanceOfANonexistentUser()).rejects.toBeInstanceOf(AppError);
  });

});
