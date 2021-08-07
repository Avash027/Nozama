export const _findProductsByName = (products, query) => {
  if (!query) return products;
  const queryRegEx = new RegExp(query.toLowerCase());
  return products.filter((product) =>
    queryRegEx.test(product.name.toLowerCase())
  );
};
