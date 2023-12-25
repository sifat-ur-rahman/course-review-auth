import { ZodError, ZodIssue } from 'zod';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });

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

export default handleZodError;
