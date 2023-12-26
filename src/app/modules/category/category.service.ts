/* eslint-disable @typescript-eslint/no-explicit-any */
import { Category } from './category.model';

import { JwtPayload } from 'jsonwebtoken';

const createCategoryIntoDB = async (userData: JwtPayload, Data: any) => {
  const saveData = {
    createdBy: userData.userId,
    name: Data.name,
  };

  const result = await Category.create(saveData);

  return result;
};
const getAllCategoryFromDB = async () => {
  const result = await Category.find().populate('createdBy');
  return result;
};

export const CategoryService = {
  createCategoryIntoDB,
  getAllCategoryFromDB,
};
