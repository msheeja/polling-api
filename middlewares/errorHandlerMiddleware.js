
export class customErrorHandler extends Error {
  constructor(statusCode, errMessage) {
    super(errMessage);
    this.statusCode = statusCode;
  }
}

export const errorHandlerMiddleware = (err, req, res, next) => {
  // Write your code here
  if (err instanceof customErrorHandler) {
    return res.status(err.statusCode).json({ success: false, error: err.message });
  }

  res
    .status(500)
    .json({
      success: false,
      error: "Oops! Something went wrong... Please try again later!",
    });
};


