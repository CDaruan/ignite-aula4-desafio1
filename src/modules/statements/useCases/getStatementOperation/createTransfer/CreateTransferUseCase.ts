import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../../shared/errors/AppError";
import { IUsersRepository } from "../../../../users/repositories/IUsersRepository";
import { Statement } from "../../../entities/Statement";
import { IStatementsRepository } from "../../../repositories/IStatementsRepository";
import { ICreateTransferDTO } from "./ICreateTransferDTO";

enum OperationType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
  TRANSFER = 'transfer',
  TRANSFER_RECEIVED = 'transfer_received'
}

@injectable()
class CreateTransferUseCase {
  constructor(
    @inject('StatementsRepository')
    private statementsRepository: IStatementsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) { }

  async execute({ sender_id, user_id, amount, description }: ICreateTransferDTO): Promise<Statement> {

    if(sender_id === user_id) throw new AppError(`You can't transfer for yourself`)

    const sender_user = this.usersRepository.findById(user_id);
    if (!sender_user) throw new AppError(`Sender user not found`);

    const receiver_user = this.usersRepository.findById(sender_id);
    if (!receiver_user) throw new AppError(`Receiver user not found`);

    const { balance } = await this.statementsRepository.getUserBalance({ user_id, with_statement: false })

    if (balance < amount) throw new AppError(`Insufficient funds`);

    const transfer = {
      user_id,
      sender_id,
      amount,
      description,
      type:'transfer' as OperationType
    }
    const transfer_complete = await this.statementsRepository.create(transfer);

    const transfer_received = {
      user_id: sender_id,
      sender_id: user_id,
      amount,
      description,
      type: "transfer_received" as OperationType,
    }
    await this.statementsRepository.create(transfer_received);

    return transfer_complete;
  }
}

export { CreateTransferUseCase }
