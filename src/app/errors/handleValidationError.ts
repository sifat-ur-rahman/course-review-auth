import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const errorSources: TErrorSources = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    },
  );

  const statusCode = 400;
  const error = errorSources
    .map((error) => `${error.path} is ${error.message}`)
    .join('. ');
  return {
    statusCode,
    message: 'Validation Error',
    errorSources: error,
  };
};

export default handleValidationError;
