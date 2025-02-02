/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import { Category } from '../category/category.model';
import { Review } from '../review/review.model';
import { TCourse } from './course.interface';
import { Course } from './course.model';

const createCourseIntoDB = async (
  userData: JwtPayload,
  courseData: TCourse,
) => {
  const category = await Category.findById(courseData.categoryId);
  if (!category) {
    throw new AppError(
      400,
      `${courseData.categoryId} no category with categoryId`,
      null,
    );
  }
  const saveData = {
    ...courseData,
    createdBy: userData.userId,
  };

  const result = await Course.create(saveData);

  return result;
};
const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const {
    page = 1,
    limit = 5,
    sortBy,
    sortOrder,
    minPrice,
    maxPrice,
    tags,
    startDate,
    endDate,
    language,
    provider,
    durationInWeeks,
    level,
  } = query;

  const searchTerm: any = {};

  if (tags) {
    searchTerm['tags.name'] = tags;
  }
  if (minPrice && maxPrice) {
    searchTerm.price = { $gte: minPrice, $lte: maxPrice };
  }

  if (startDate && endDate) {
    searchTerm.startDate = { $gte: startDate, $lte: endDate };
  }
  if (language) {
    searchTerm.language = language;
  }

  if (provider) {
    searchTerm.provider = provider;
  }

  if (durationInWeeks) {
    searchTerm.durationInWeeks = durationInWeeks;
  }
  if (level) {
    searchTerm['details.level'] = level;
  }
  const sort: any = {};
  if (sortBy) {
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
  } else {
    sort.startDate = 1;
  }
  const skip = (page - 1) * limit;

  const courses = await Course.find(searchTerm)
    .populate('createdBy', '_id username email role')
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .exec();

  const total = await Course.countDocuments(searchTerm);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: courses,
  };
};
const getOneCourseWithReviewFromDB = async (id: string) => {
  const course = await Course.findById(id).populate(
    'createdBy',
    '_id username email role',
  );
  const reviews = await Review.find({ courseId: id }).populate(
    'createdBy',
    '_id username email role',
  );

  const result = {
    course,
    reviews,
  };
  return result;
};
const updateCourseFromDB = async (
  id: string,
  updatedCourseData: Partial<TCourse>,
): Promise<TCourse | null> => {
  const { tags, details, categoryId, ...remainingStudentData } =
    updatedCourseData;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (details && Object.keys(details).length) {
    for (const [key, value] of Object.entries(details)) {
      modifiedUpdatedData[`details.${key}`] = value;
    }
  }

  if (categoryId) {
    const category = await Category.findById(categoryId);
    if (!category) {
      throw new AppError(400, `${categoryId} no category with categoryId`);
    }
  }

  if (tags && tags.length > 0) {
    // filter out the deleted fields
    const deletedTag = tags
      .filter((el) => el.name && el.isDeleted)
      .map((el) => el.name);

    const deletedTags = await Course.findByIdAndUpdate(
      id,
      {
        $pull: {
          tags: { name: { $in: deletedTag } },
        },
      },
      {
        new: true,
        runValidators: true,
      },
    );

    // filter out the new course fields
    const newTags = tags?.filter((el) => el.name && !el.isDeleted);

    const newTag = await Course.findByIdAndUpdate(
      id,
      {
        $addToSet: { tags: { $each: newTags } },
      },
      {
        new: true,
        runValidators: true,
      },
    );
  }

  const result = await Course.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  }).populate('createdBy', '_id username email role');

  return result;
};

export const CourseService = {
  createCourseIntoDB,
  getAllCourseFromDB,
  getOneCourseWithReviewFromDB,
  updateCourseFromDB,
};
