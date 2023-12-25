import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const errorSources: TErrorSources = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  const statusCode = 400;
  const failedValue = errorSources[0]?.message?.match(/"([^"]*)"/)[1];

  const errorMessage = `${failedValue} is not a valid ID!`;
  return {
    statusCode,
    message: 'Invalid ID',
    errorSources: errorMessage,
  };
};

export default handleCastError;
