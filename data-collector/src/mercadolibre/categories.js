const axios = require("axios");
const { config } = require("../config");

var ArrayUtils = require("../utils/arrayUtils");

const CountriesService = require("./services/countries");
const CategoriesService = require("./services/categories");

const categoriesByCountry = async (country_id) => {
  try {
    const url = `${config.apiMercadolibre}/sites/${country_id}/categories`;
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error(error);
    return {};
  }
};

const categoryDetail = async (category_id) => {
  try {
    const url = `${config.apiMercadolibre}/categories/${category_id}`;
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error(error);
    return {};
  }
};

const categoriesDetail = async (categories) => {
  return Promise.all(categories.map((category) => categoryDetail(category.id)));
};

const categories = async () => {
  try {
    const countriesService = new CountriesService();
    let countries = await countriesService.getCountries();
    countries = countries.filter((country) => country._id !== "MPT");
    return Promise.all(
      countries.map((country) => categoriesByCountry(country._id))
    );
  } catch (error) {
    console.log(error);
  }
};

const f2 = async () => {
  try {
    let data = await categories();
    data = ArrayUtils.flat(data);
    data = await categoriesDetail(data);
    data = ArrayUtils.flat(data);
    const categoriesService = new CategoriesService();
    return categoriesService.createCategories(data);
  } catch (error) {
    console.error(error);
  }
};

const main = async () => {
  try {
    console.time("Import categories");
    await f2();
    console.timeEnd("Import categories");
    process.exit(0);
  } catch (error) {
    console.error(error);
    console.error(error.message);
    process.exit(1);
  }
};

main();
