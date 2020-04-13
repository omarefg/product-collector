const ProductsService = require('./services/productsService');

async function executeLinks(){
    const productsService = new ProductsService();
    try{
        const data = await productsService.executeURLsCreated();
        if(data){
            console.log(data);
              console.log('Products saved');
              Promise.all(data).then(item =>{
                console.log('Se ha terminado de cargar los productos ... ');
              });
            }
          else {
           console.error('error getting products');
            }
          }
    catch(error){
        console.error(`Se ha encontrado un error: ${error} `);
    }
}
executeLinks();

