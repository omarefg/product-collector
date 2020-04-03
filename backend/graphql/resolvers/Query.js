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

  product: async (__, { _id }) => {
    return prepare(await Products.findOne(ObjectId(_id)));
  }
};

export default Query;
