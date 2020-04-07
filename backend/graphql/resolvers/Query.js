import Products from '../../models/Products';

const Query = {
  products: async (__, args, context, info) => {
    const criterias = Object.keys(args);
    console.log('criterias', criterias);
    const search = criterias.map(criteria => ({ [criteria]: args[criteria] }));
    console.log('search', search);
    const where =
      search.length > 0
        ? {
            $and: search
          }
        : {};

    console.log('where', where);

    const product = await Products.find(where);
    return product;
  },

  productsCount: async (__, args, context, info) => {
    const criterias = Object.keys(args);
    console.log('criterias', criterias);
    const search = criterias.map(criteria => ({ [criteria]: args[criteria] }));
    console.log('search', search);
    const where =
      search.length > 0
        ? {
            $and: search
          }
        : {};

    console.log('where', where);

    const product = await Products.aggregate([
      // First Stage
      {
        $match: where
      },
      // Second Stage
      {
        $group: {
          _id: '$country',
          count: { $sum: 1 }
        }
      }
    ]);
    console.log(product);
    return product;
  }
};

export default Query;
