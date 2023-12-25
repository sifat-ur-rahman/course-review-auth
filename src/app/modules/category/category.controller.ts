import { NextFunction, Request, Response } from 'express';
import { CategoryService } from './category.service';

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const categoryData = req.body;
    const result = await CategoryService.createCategoryIntoDB(categoryData);

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Category created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getAllCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await CategoryService.getAllCategoryFromDB();
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Categories retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const CategoryControllers = {
  createCategory,
  getAllCategory,
};
