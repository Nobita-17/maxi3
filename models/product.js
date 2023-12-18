const fs = require('fs');
const path = require('path');

const pathBuilt = path.join(
  path.dirname(require.main.filename),
  'data',
  'products.json'
);

const getProductsFromFile = (callbackFn) => {
  fs.readFile(pathBuilt, (err, fileContent) => {
    if (err) {
      return callbackFn([]);
    }
    callbackFn(JSON.parse(fileContent));
  });
};

module.exports = class Product {
  constructor(_title,_description,_price,_imageUrl) {
    this.title = _title;
    this.description=_description;
    this.price=_price;
    this.imageUrl=_imageUrl;
  }

  save() {
    this.productID=Math.round(Math.round()*1000).toString();
    getProductsFromFile((products) => {
      products.push(this);

      fs.writeFile(pathBuilt, JSON.stringify(products), (err) => {
        console.log('err', err);
      });
    });
  }

  static fetchAll(callbackFn) {
    getProductsFromFile(callbackFn);
  }
  // static findProductById(id,callbackFn){
  //  getProductsFromFile((products)=>{
  //   const product=products.find((product)=>product.productID==id);
  //   callbackFn(product);
  //  })
  // }

  static findProductById(id, callbackFn) {
    getProductsFromFile((products) => {
      console.log('Searching for product with ID:', id);
      console.log('All products:', products);
      const product = products.find((p) => p.productID.toString().trim() == id.toString().trim());
      console.log('Found product:');
      callbackFn(product);
    });
  }
  

};