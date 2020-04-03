import Products from '../../models/Products';
import { prepare } from '../../utils/index';

const Query = {
  products: async (__, args, context, info) => {
    const where = args.filter
      ? {
          $or: [{ keyWord: args.filter }, { country: args.filter }]
        }
      : {};

    const product = await Products.find(where);
    console.log(where);
    return product;
  },

  productsCount: async (__, args, context, info) => {
    const where = args.filter
      ? {
          $or: [{ keyWord: args.filter }, { country: args.filter }]
        }
      : {};

    const product = await Products.find(where).countDocuments();
    console.log(where);
    return product;
  }
};

export default Query;
