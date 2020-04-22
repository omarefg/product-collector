import Products from '../../models/Products';

const Mutations = {
  createProduct: async (
    _,
    {
      id,
      country,
      city,
      currency,
      keyWord,
      condition,
      model,
      variants,
      price,
      soldQuantity,
      date,
      analyzedResults
    }
  ) => {
    const newProduct = new Products({
      id,
      country,
      city,
      currency,
      keyWord,
      condition,
      model,
      variants,
      price,
      soldQuantity,
      date,
      analyzedResults
    });
    return await newProduct.save();
  }
};

export default Mutations;
