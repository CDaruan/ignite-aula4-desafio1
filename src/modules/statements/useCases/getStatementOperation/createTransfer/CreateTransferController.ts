import { Request, Response } from "express";
import { container } from "tsyringe"
import { CreateTransferUseCase } from "./CreateTransferUseCase"

class CreateTransferController {
  async execute(request: Request, response: Response): Promise<Response> {
    const { amount, description } = request.body;
    const { sender_id } = request.params;
    const { id: user_id } = request.user;

    const createTransferUseCase = container.resolve(CreateTransferUseCase)
    const transfer = await createTransferUseCase.execute({ sender_id, user_id, amount, description })

    return response.json(transfer)
  }
}

export { CreateTransferController }
