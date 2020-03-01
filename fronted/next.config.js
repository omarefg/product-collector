const withStylus = require('@zeit/next-stylus')
module.exports = withStylus({
	poweredByHeader: false,
	cssModules: true,
	cssLoaderOptions: {
		importLoaders: 1,
		localIdentName: "[local]___[hash:base64:5]",
	  }
});
