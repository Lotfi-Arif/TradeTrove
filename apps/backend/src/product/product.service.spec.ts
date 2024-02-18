import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { PrismaService } from 'nestjs-prisma';
import { mockObject } from '@tradetrove/shared-utils';
import {
  Product,
  productSchema,
  ProductCreateInput,
  createProductSchema,
  ProductUpdateInput,
  updateProductSchema,
} from '@tradetrove/shared-types';
import { mockDeep } from 'jest-mock-extended';

const mockProduct: Product = mockObject(productSchema, {
  id: '1',
  name: 'Mock Product',
  description: 'Mock Product Description',
  price: 19.99,
  categoryId: '1',
  createdAt: new Date(),
  updatedAt: new Date(),
});

const mockProductCreateInput: ProductCreateInput = mockObject(
  createProductSchema,
  {
    name: 'Mock Product',
    description: 'Mock Product Description',
    price: 19.99,
    categoryId: '1',
  },
);

const mockProductUpdateInput: ProductUpdateInput = mockObject(
  updateProductSchema,
  {
    name: 'Updated Mock Product',
    description: 'Updated Mock Product Description',
    price: 29.99,
    categoryId: '2',
  },
);

describe('ProductService', () => {
  let service: ProductService;
  let mockPrismaService: PrismaService;

  beforeEach(async () => {
    jest.clearAllMocks();

    mockPrismaService = mockDeep<PrismaService>();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return a product', async () => {
      mockPrismaService.product.create = jest
        .fn()
        .mockResolvedValue(mockProduct);

      const result = await service.create(mockProductCreateInput);

      if (result.isOk()) expect(result.value).toEqual(mockProduct);
    });
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const mockProducts: Product[] = [mockProduct];
      mockPrismaService.product.findMany = jest
        .fn()
        .mockResolvedValue(mockProducts);

      const result = await service.findAll();

      if (result.isOk()) expect(result.value).toEqual(mockProducts);
    });
  });

  describe('findOne', () => {
    it('should return a product by ID', async () => {
      mockPrismaService.product.findUnique = jest
        .fn()
        .mockResolvedValue(mockProduct);

      const result = await service.findOne('1');

      if (result.isOk()) expect(result.value).toEqual(mockProduct);
    });

    it('should return null if product is not found', async () => {
      mockPrismaService.product.findUnique = jest.fn().mockResolvedValue(null);

      const result = await service.findOne('nonexistent');

      if (result.isOk()) expect(result.value).toBeNull();
    });
  });

  describe('update', () => {
    it('should update and return the updated product', async () => {
      mockPrismaService.product.update = jest
        .fn()
        .mockResolvedValue(mockProduct);

      const result = await service.update('1', mockProductUpdateInput);

      if (result.isOk()) expect(result.value).toEqual(mockProduct);
    });
  });

  describe('remove', () => {
    it('should delete and return the deleted product', async () => {
      mockPrismaService.product.delete = jest
        .fn()
        .mockResolvedValue(mockProduct);

      const result = await service.remove('1');

      if (result.isOk()) expect(result.value).toEqual(mockProduct);
    });

    it('should return null if product is not found', async () => {
      mockPrismaService.product.delete = jest
        .fn()
        .mockResolvedValue(null as unknown as Product);

      const result = await service.remove('nonexistent');

      if (result.isOk()) expect(result.value).toBeNull();
    });
  });
});
