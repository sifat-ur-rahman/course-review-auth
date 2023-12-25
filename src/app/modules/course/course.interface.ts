/* eslint-disable no-unused-vars */
//import { Schema, model, connect } from 'mongoose';

import { Model, Types } from 'mongoose';

export type TTag = {
  name: string;
  isDeleted: boolean;
};

export type TDetails = {
  level: string;
  description: string;
};

export type TCourse = {
  title: string;
  instructor: string;
  categoryId: Types.ObjectId;
  price: number;
  tags: TTag[];
  startDate: string;
  endDate: string;
  language: string;
  provider: string;
  details: TDetails;
  durationInWeeks: number;
};

export type CourseMethods = {
  isCourseExits(id: string): Promise<TCourse | null>;
};

export type CourseModel = Model<TCourse, Record<string, never>, CourseMethods>;
