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
    const criterias = Object.keys(args).filter(args => {
      args = args.replace(/\b(\w*_\w*)\b/, 'date');
      return args != 'date';
    });

    const search = criterias
      .map(criteria => ({
        [criteria]: {
          $in: Array.isArray(args[criteria]) ? args[criteria] : [args[criteria]]
        }
      }))
      .reduce((result, item) => {
        const key = Object.keys(item)[0];
        result[key] = item[key];
        return result;
      }, {});

    const diff = Math.trunc(
      (args.end_date - args.start_date) / 1000 / 60 / 60 / 24
    );
    console.log(diff);
    if (diff <= 30) {
      search.date = {
        $gte: new Date(args.start_date),
        $lte: new Date(args.end_date.setHours(22, 59, 59, 999))
      };
      console.log('search', search);
      const product = await Products.aggregate([
        // First Stage
        {
          $match: search
        },
        // Second Stage
        {
          $group: {
            _id: {
              keyWord: '$keyWord',
              country: '$country'
            },
            count: { $sum: 1 },
            sumSold: { $sum: '$soldQuantity' }
          }
        },
        // Third Stage
        {
          $sort: { '_id.date': -1 }
        }
      ]);
      return product;
    } else if (diff > 30 && diff <= 365) {
      search.date = {
        $gte: new Date(args.start_date),
        $lte: new Date(args.end_date.setHours(22, 59, 59, 999))
      };
      console.log('search', search);
      const product = await Products.aggregate([
        // First Stage
        {
          $match: search
        },
        // Second Stage
        {
          $group: {
            _id: {
              keyWord: '$keyWord',
              country: '$country'
            },
            count: { $sum: 1 },
            sumSold: { $sum: '$soldQuantity' }
          }
        },
        // Third Stage
        {
          $sort: { '_id.date': -1 }
        }
      ]);
      return product;
    } else if (diff > 365) {
      search.date = {
        $gte: new Date(args.start_date),
        $lte: new Date(args.end_date.setHours(22, 59, 59, 999))
      };
      console.log('search', search);
      const product = await Products.aggregate([
        // First Stage
        {
          $match: search
        },
        // Second Stage
        {
          $group: {
            _id: {
              keyWord: '$keyWord',
              country: '$country'
            },
            count: { $sum: 1 },
            sumSold: { $sum: '$soldQuantity' }
          }
        },
        // Third Stage
        {
          $sort: { '_id.date': -1 }
        }
      ]);
      return product;
    }
  },

  productsByDate: async (__, args) => {
    const criterias = Object.keys(args).filter(args => {
      args = args.replace(/\b(\w*_\w*)\b/, 'date');
      return args != 'date';
    });

    const search = criterias
      .map(criteria => ({
        [criteria]: {
          $in: Array.isArray(args[criteria]) ? args[criteria] : [args[criteria]]
        }
      }))
      .reduce((result, item) => {
        const key = Object.keys(item)[0];
        result[key] = item[key];
        return result;
      }, {});

    const diff = Math.trunc(
      (args.end_date - args.start_date) / 1000 / 60 / 60 / 24
    );
    console.log(diff);
    if (diff <= 31) {
      // args.end_date.setHours(22, 59, 59, 999);
      console.log(args.end_date);

      search.date = {
        $gte: new Date(args.start_date),
        $lte: new Date(args.end_date.setHours(22, 59, 59, 999))
      };
      console.log('search', search);
      const product = await Products.aggregate([
        // First Stage
        {
          $match: search
        },
        // Second Stage
        {
          $group: {
            _id: {
              keyWord: '$keyWord',
              date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } }
            },
            count: { $sum: 1 },
            sumSold: { $sum: '$soldQuantity' }
          }
        },
        // Third Stage
        {
          $sort: { '_id.date': -1 }
        }
      ]);
      return product;
    } else if (diff > 30 && diff <= 366) {
      search.date = {
        $gte: new Date(args.start_date),
        $lte: new Date(args.end_date.setHours(22, 59, 59, 999))
      };
      console.log('search', search);
      const product = await Products.aggregate([
        // First Stage
        {
          $match: search
        },
        // Second Stage
        {
          $group: {
            _id: {
              date: { $dateToString: { format: '%Y-%m', date: '$date' } },
              keyWord: '$keyWord'
            },
            count: { $sum: 1 },
            sumSold: { $sum: '$soldQuantity' }
          }
        },
        // Third Stage
        {
          $sort: { '_id.date': -1 }
        }
      ]);
      return product;
    } else if (diff > 365) {
      search.date = {
        $gte: new Date(args.start_date),
        $lte: new Date(args.end_date.setHours(22, 59, 59, 999))
      };
      console.log('search', search);
      const product = await Products.aggregate([
        // First Stage
        {
          $match: search
        },
        // Second Stage
        {
          $group: {
            _id: {
              keyWord: '$keyWord',
              date: { $dateToString: { format: '%Y', date: '$date' } }
            },
            count: { $sum: 1 },
            sumSold: { $sum: '$soldQuantity' }
          }
        },
        // Third Stage
        {
          $sort: { '_id.date': -1 }
        }
      ]);
      return product;
    }
  },

  productsAvgPrice: async (__, args, context, info) => {
    const criterias = Object.keys(args).filter(args => {
      args = args.replace(/\b(\w*_\w*)\b/, 'date');
      return args != 'date';
    });

    const search = criterias
      .map(criteria => ({
        [criteria]: {
          $in: Array.isArray(args[criteria]) ? args[criteria] : [args[criteria]]
        }
      }))
      .reduce((result, item) => {
        const key = Object.keys(item)[0];
        result[key] = item[key];
        return result;
      }, {});

    const diff = Math.trunc(
      (args.end_date - args.start_date) / 1000 / 60 / 60 / 24
    );
    console.log(diff);
    if (diff <= 30) {
      search.date = {
        $gte: new Date(args.start_date),
        $lte: new Date(args.end_date.setHours(22, 59, 59, 999))
      };
      console.log('search', search);
      const product = await Products.aggregate([
        // First Stage
        {
          $match: search
        },
        // Second Stage
        {
          $group: {
            _id: {
              keyWord: '$keyWord',
              country: '$country',
              currency: '$currency'
            },
            avg: { $avg: '$price' }
          }
        },
        // Third Stage
        {
          $sort: { '_id.date': -1 }
        }
      ]);
      return product;
    } else if (diff > 30 && diff <= 365) {
      search.date = {
        $gte: new Date(args.start_date),
        $lte: new Date(args.end_date.setHours(22, 59, 59, 999))
      };
      console.log('search', search);
      const product = await Products.aggregate([
        // First Stage
        {
          $match: search
        },
        // Second Stage
        {
          $group: {
            _id: {
              keyWord: '$keyWord',
              country: '$country',
              currency: '$currency'
            },
            avg: { $avg: '$price' }
          }
        },
        // Third Stage
        {
          $sort: { '_id.date': -1 }
        }
      ]);
      return product;
    } else if (diff > 365) {
      search.date = {
        $gte: new Date(args.start_date),
        $lte: new Date(args.end_date.setHours(22, 59, 59, 999))
      };
      console.log('search', search);
      const product = await Products.aggregate([
        // First Stage
        {
          $match: search
        },
        // Second Stage
        {
          $group: {
            _id: {
              keyWord: '$keyWord',
              country: '$country',
              currency: '$currency'
            },
            avg: { $avg: '$price' }
          }
        },
        // Third Stage
        {
          $sort: { '_id.date': -1 }
        }
      ]);
      return product;
    }
  },

  productsAvgByDate: async (__, args) => {
    const criterias = Object.keys(args).filter(args => {
      args = args.replace(/\b(\w*_\w*)\b/, 'date');
      return args != 'date';
    });

    const search = criterias
      .map(criteria => ({
        [criteria]: {
          $in: Array.isArray(args[criteria]) ? args[criteria] : [args[criteria]]
        }
      }))
      .reduce((result, item) => {
        const key = Object.keys(item)[0];
        result[key] = item[key];
        return result;
      }, {});

    const diff = Math.trunc(
      (args.end_date - args.start_date) / 1000 / 60 / 60 / 24
    );
    console.log(diff);
    if (diff <= 31) {
      // args.end_date.setHours(22, 59, 59, 999);
      console.log(args.end_date);

      search.date = {
        $gte: new Date(args.start_date),
        $lte: new Date(args.end_date.setHours(22, 59, 59, 999))
      };
      console.log('search', search);
      const product = await Products.aggregate([
        // First Stage
        {
          $match: search
        },
        // Second Stage
        {
          $group: {
            _id: {
              keyWord: '$keyWord',
              date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
              country: '$country',
              currency: '$currency'
            },
            avg: { $avg: '$price' }
          }
        },
        // Third Stage
        {
          $sort: { '_id.date': -1 }
        }
      ]);
      return product;
    } else if (diff > 30 && diff <= 366) {
      search.date = {
        $gte: new Date(args.start_date),
        $lte: new Date(args.end_date.setHours(22, 59, 59, 999))
      };
      console.log('search', search);
      const product = await Products.aggregate([
        // First Stage
        {
          $match: search
        },
        // Second Stage
        {
          $group: {
            _id: {
              keyWord: '$keyWord',
              date: { $dateToString: { format: '%Y-%m', date: '$date' } },
              country: '$country',
              currency: '$currency'
            },
            avg: { $avg: '$price' }
          }
        },
        // Third Stage
        {
          $sort: { '_id.date': -1 }
        }
      ]);
      return product;
    } else if (diff > 365) {
      search.date = {
        $gte: new Date(args.start_date),
        $lte: new Date(args.end_date.setHours(22, 59, 59, 999))
      };
      console.log('search', search);
      const product = await Products.aggregate([
        // First Stage
        {
          $match: search
        },
        // Second Stage
        {
          $group: {
            _id: {
              keyWord: '$keyWord',
              date: { $dateToString: { format: '%Y', date: '$date' } },
              country: '$country',
              currency: '$currency'
            },
            avg: { $avg: '$price' }
          }
        },
        // Third Stage
        {
          $sort: { '_id.date': -1 }
        }
      ]);
      return product;
    }
  },

  keywords: async (__, args, context, info) => {
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

    const product = await Products.distinct('keyWord', where);
    return product;
  },

  countries: async (__, args, context, info) => {
    const product = await Products.distinct('country');
    return product;
  }
};

export default Query;
