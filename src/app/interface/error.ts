export type TErrorSources =
  | {
      path: string | number;
      message: string;
    }[]
  | string;

export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorSources: TErrorSources;
};
