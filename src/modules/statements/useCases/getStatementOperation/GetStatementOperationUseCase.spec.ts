import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { CreateStatementUseCase } from "../createStatement/CreateStatementUseCase";
import { ICreateStatementDTO } from "../createStatement/ICreateStatementDTO";
import { GetStatementOperationUseCase } from "./GetStatementOperationUseCase";

let inMemoryStatementsRepository: InMemoryStatementsRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let createStatementUseCase: CreateStatementUseCase;
let createUserUseCase: CreateUserUseCase;
let getStatementOperationUseCase: GetStatementOperationUseCase;

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
    getStatementOperationUseCase = new GetStatementOperationUseCase(inMemoryUsersRepository, inMemoryStatementsRepository)
  });

  it("shold be able to get a statement by id", async () => {
    const deposit: ICreateStatementDTO = {
      user_id,
      amount: 2000,
      description: "Description test",
      type: 'deposit' as OperationType
    };
    const cretedStatement = await createStatementUseCase.execute(deposit);

    const statement = await getStatementOperationUseCase.execute({ user_id, statement_id: cretedStatement.id as string });

    expect(statement).toBe(cretedStatement);
  });

  it("shold not be able to get a statement from a nonexistent user", async () => {
    async function getStatamentByFakeUserId() {
      const deposit: ICreateStatementDTO = {
        user_id,
        amount: 2000,
        description: "Description test",
        type: 'deposit' as OperationType
      };
      const cretedStatement = await createStatementUseCase.execute(deposit);

      await getStatementOperationUseCase.execute({ user_id:'fakeUserId', statement_id: cretedStatement.id as string });

    }

    expect(async () => getStatamentByFakeUserId()).rejects.toBeInstanceOf(AppError);
  });

  it("shold not be able to get a statement from a nonexistent statement_id", async () => {
    async function getStatamentByFakeStatementId() {
      const deposit: ICreateStatementDTO = {
        user_id,
        amount: 2000,
        description: "Description test",
        type: 'deposit' as OperationType
      };
      await createStatementUseCase.execute(deposit);

      await getStatementOperationUseCase.execute({ user_id, statement_id: "FakeStatementId"});

    }

    expect(async () => getStatamentByFakeStatementId()).rejects.toBeInstanceOf(AppError);
  });

});
