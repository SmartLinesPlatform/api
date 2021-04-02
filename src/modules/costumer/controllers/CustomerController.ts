import IController from "@utils/interfaces/IController";
import { Request, Response } from "express";

import CreateCustomerService from "../services/CreateCustomerService";
import DeleteCustomerService from "../services/DeleteCustomerService";
import FindCustomerByIdService from "../services/FindCustomerByIdService";
import ListCustomersService from "../services/ListCustomersService";
import UpdateCustomerService from "../services/UpdateCustomerService";

class CustomerController implements IController {
  async read(req: Request, res: Response): Promise<Response> {
    const { customerId } = req.params;
    const customer = await FindCustomerByIdService.execute(customerId);
    return res.json(customer);
  }

  async index(req: Request, res: Response): Promise<Response> {
    const customers = await ListCustomersService.execute();
    return res.json(customers);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;
    const customer = await CreateCustomerService.execute({
      name,
      email,
      password,
    });
    return res.json(customer);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { customerId } = req.params;
    const { name, email, password } = req.body;
    await UpdateCustomerService.execute({
      id: customerId,
      name,
      email,
      password,
    });
    return res.json();
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { customerId } = req.params;
    await DeleteCustomerService.execute(customerId);
    return res.json();
  }
}

export default CustomerController;
