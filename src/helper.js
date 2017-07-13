export const getMongooseErrors = (e) =>
  Object.keys(e.errors).map(k => e.errors[k].message)

