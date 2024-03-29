import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const foundProductWithTheSameName = await this.productsRepository.findByName(
      name,
    );

    if (foundProductWithTheSameName) {
      throw new AppError('This product already exists.');
    }

    const product = this.productsRepository.create({ name, price, quantity });

    return product;
  }
}

export default CreateProductService;
