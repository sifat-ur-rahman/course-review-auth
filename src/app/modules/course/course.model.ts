import { Schema, model } from 'mongoose';
import {
  CourseMethods,
  CourseModel,
  TCourse,
  TDetails,
  TTag,
} from './course.interface';

const TagsSchema = new Schema<TTag>({
  name: { type: String },
  isDeleted: { type: Boolean },
});
const DetailsSchema = new Schema<TDetails>({
  level: { type: String, required: true },
  description: { type: String, required: true },
});
const courseSchema = new Schema<TCourse, CourseModel, CourseMethods>({
  title: { type: String, required: true },
  instructor: { type: String, required: true },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  price: { type: Number, required: true },
  tags: { type: [TagsSchema], required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  language: { type: String, required: true },
  provider: { type: String, required: true },
  details: { type: DetailsSchema, required: true },
  durationInWeeks: { type: Number, default: 0 },
});

courseSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const course = this;
  const CourseStartDate: Date = new Date(course.startDate);
  const CourseEndDate: Date = new Date(course.endDate);
  course.durationInWeeks = Math.ceil(
    (CourseEndDate - CourseStartDate) / (1000 * 60 * 60 * 24 * 7),
  );
  next();
});
courseSchema.methods.isCourseExits = async function (id: string) {
  const existingCourse = await Course.findById(id);
  return existingCourse;
};

export const Course = model<TCourse, CourseModel>('Course', courseSchema);
