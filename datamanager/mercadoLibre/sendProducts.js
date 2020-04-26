const ProductsService = require('./services/productsService');


async function insertLinks() {
  console.log('executing insettLinks');
    const productsService = new ProductsService();
    try{
        console.log(`entrando a insertLinks From Criteria`);
        const data = await productsService.insertLinksFromCriteria();
        if(data){
              console.log('Links saved');
            }
          else {
           console.error('error getting products')
            }
          }
    catch(error){
        console.error(`Se ha encontrado un error: ${error} `);
    }
    console.log('Se ha terminado la tarea de cargar los Links ... ');
}
async function executeLinks(){
    const productsService = new ProductsService();
    try{
        const data = await productsService.executeURLsCreated();
        if(data){
              console.log('Products saved');
            }
          else {
           console.error('error getting products');
            }
          }
    catch(error){
        console.error(`Se ha encontrado un error: ${error} `);
    }
    console.log('Se ha terminado de cargar los productos ... ');

}
async function sendToNormalization(){
  const productsService = new ProductsService();
  try{
      const data = await productsService.executeURLsToNormalization();
      if(data){
            console.log('Products sent');
          }
        else {
         console.error('error getting products');
          }
        }
  catch(error){
      console.error(`Se ha encontrado un error: ${error} `);
  }
  console.log('Se ha terminado de enviar los productos ... ');
}

async function main(){
  const insert = await insertLinks();

  setTimeout(async () => {
    const execute = await executeLinks();
  }, 3000);
  
}
main();


