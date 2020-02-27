const axios = require("axios");
const { config } = require("../config");

const CountriesService = require("./services/countries");

const countries = async () => {
  try {
    const api = `${config.apiMercadolibre}/sites`;
    const { data } = await axios.get(api);

    const countriesService = new CountriesService();
    return countriesService.createCountries(data);
  } catch (error) {
    console.error(error);
  }
};

const main = async () =>{
  console.time("Import countries");
  await countries();
  console.timeEnd("Import countries");
  process.exit(0)
} 

main()
