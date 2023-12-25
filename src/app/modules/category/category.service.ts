import { Category } from './category.model';
import { TCategory } from './category.interface';

const createCategoryIntoDB = async (Data: TCategory) => {
  const result = await Category.create(Data);

  return result;
};
const getAllCategoryFromDB = async () => {
  const result = await Category.find();
  return result;
};

export const CategoryService = {
  createCategoryIntoDB,
  getAllCategoryFromDB,
};
