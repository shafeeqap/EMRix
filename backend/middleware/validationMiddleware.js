export const validate =
  (schema, source = "body") =>
  (req, res, next) => {
    try {
      const data = schema.parse(req[source]);
      req.validatedData = data;
      next();
    } catch (error) {
      next(error);
    }
  };
