import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { CreateStatementUseCase } from "./CreateStatementUseCase";
import { ICreateStatementDTO } from "./ICreateStatementDTO";

let inMemoryStatementsRepository: InMemoryStatementsRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let createStatementUseCase: CreateStatementUseCase;
let createUserUseCase: CreateUserUseCase;

let user_id: string;

enum OperationType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
  TRANSFER = 'transfer',
  TRANSFER_RECEIVED = 'transfer_received'
}

describe("Create Statement", () => {

  beforeAll(async () => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
    user_id = (await createUserUseCase.execute({ email: "email@test", password: "password", name: "test" })).id as string;

  });

  beforeEach(() => {
    inMemoryStatementsRepository = new InMemoryStatementsRepository();
    createStatementUseCase = new CreateStatementUseCase(inMemoryUsersRepository, inMemoryStatementsRepository);
  });

  it("shold be able to create a deposit", async () => {
    const deposit:ICreateStatementDTO = {
      user_id,
      amount:2000,
      description:"Description test",
      type:'deposit' as OperationType
    };
    const newDeposit = await createStatementUseCase.execute(deposit);

    expect(newDeposit).toHaveProperty("id")
  });


  it("shold not be able to create a new deposit for a nonexistent user", async () => {
    async function createANewDepositToANonexistentUser() {
      const deposit:ICreateStatementDTO = {
        user_id:"FakeId",
        amount:2000,
        description:"Description test",
        type:'deposit' as OperationType
      };
      await createStatementUseCase.execute(deposit);
    }

    expect(async () => createANewDepositToANonexistentUser()).rejects.toBeInstanceOf(AppError);
  });


  it("shold be able to create a withdraw", async () => {
    const deposit:ICreateStatementDTO = {
      user_id,
      amount:4000,
      description:"Description test",
      type:'deposit' as OperationType
    };
    const withdraw:ICreateStatementDTO = {
      user_id,
      amount:2000,
      description:"withdraw test",
      type:'withdraw' as OperationType
    };
    await createStatementUseCase.execute(deposit);
    const newwithdraw = await createStatementUseCase.execute(withdraw);

    expect(newwithdraw).toHaveProperty("id")
  });


  it("shold not be able to create a new withdraw for a nonexistent user", async () => {
    const deposit: ICreateStatementDTO = {
      user_id,
      amount: 4000,
      description: "Description test",
      type: 'deposit' as OperationType
    };

    await createStatementUseCase.execute(deposit);

    async function createANewWithdrawToANonexistentUser() {

      const withdraw: ICreateStatementDTO = {
        user_id:"FakeId",
        amount: 2000,
        description: "withdraw test",
        type: 'withdraw' as OperationType
      };
      await createStatementUseCase.execute(withdraw);

    }

    expect(createANewWithdrawToANonexistentUser()).rejects.toBeInstanceOf(AppError);
  });

  it("shold not be able to withdraw an amount greater than the account balance", async () => {
    async function createANewWithdrawGreaterThenBalance() {
      const withdraw:ICreateStatementDTO = {
        user_id,
        amount:2000,
        description:"Description test",
        type:'withdraw' as OperationType
      };
      await createStatementUseCase.execute(withdraw);
    }

    expect(async () => createANewWithdrawGreaterThenBalance()).rejects.toBeInstanceOf(AppError);
  });
});
