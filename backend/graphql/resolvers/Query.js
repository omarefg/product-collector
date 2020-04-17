import Products from '../../models/Products';

const Query = {
  // Date: GraphQLDate,
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
  },
  daysAgo: async (__, args) => {
    const diff = Math.trunc((Date.now() - args.when) / 1000 / 60 / 60 / 24);
    console.log(diff);
    if (diff <= 30) {
      const product = await Products.aggregate([
        // First Stage
        {
          $match: {
            date: {
              // $gte: new Date(Date.now()),
              $gte: new Date(args.when)
            }
          }
        },
        // Second Stage
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
            count: { $sum: 1 }
          }
        },
        // Third Stage
        {
          $sort: { totalSaleAmount: -1 }
        }
      ]);
      return product;
    } else if (diff > 30 && diff <= 365) {
      const product = await Products.aggregate([
        // First Stage
        {
          $match: {
            date: {
              // $gte: new Date(Date.now()),
              $gte: new Date(args.when)
            }
          }
        },
        // Second Stage
        {
          $group: {
            _id: { $dateToString: { format: '%m', date: '$date' } },
            count: { $sum: 1 }
          }
        },
        // Third Stage
        {
          $sort: { totalSaleAmount: -1 }
        }
      ]);
      return product;
    } else if (diff > 365) {
      const product = await Products.aggregate([
        // First Stage
        {
          $match: {
            date: {
              // $gte: new Date(Date.now()),
              $gte: new Date(args.when)
            }
          }
        },
        // Second Stage
        {
          $group: {
            _id: { $dateToString: { format: '%Y', date: '$date' } },
            count: { $sum: 1 }
          }
        },
        // Third Stage
        {
          $sort: { totalSaleAmount: -1 }
        }
      ]);
      return product;
    }
    console.log(product);
  }
};

export default Query;
