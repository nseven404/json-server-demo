const { faker } = require('@faker-js/faker');
faker.locale = 'vi';
const fs = require('fs');

const randomCategoryList = (n) => {
    if(n <= 0) return [];
    const categoryList = [];
    // loop and push category
    Array.from(new Array(n)).forEach(() => {
        const category = {
            id: faker.datatype.uuid(),
            name: faker.commerce.department(),
            createdAt: Date.now(),
            updatedAt: Date.now()
        };
        categoryList.push(category);
    });
    return categoryList;
}

const randomProductList = (categoryList, numberOfProducts) => {
    if(numberOfProducts <= 0) return;
    const productList = [];
    // random data
    for (const category of categoryList) {
        Array.from(new Array(numberOfProducts)).forEach(() => {
            const product = {
                categoryId: category.id,
                id: faker.datatype.uuid(),
                name: faker.commerce.productName(),
                color: faker.commerce.color(),
                price: Number.parseFloat(faker.commerce.price()),
                description: faker.commerce.productDescription(),
                createdAt: Date.now(),
                updatedAt: Date.now(),
                thumnailUrl: faker.image.imageUrl(400,400)
            };
            productList.push(product);
        });
    }
    return productList;
}

const randomImportList = (n) => {
    if (n <=0) return;
    const importList = [];
    // random data
    Array.from(new Array(n)).forEach(() => {
        const importItem = {
            id: faker.datatype.uuid(),
            lotNumber: faker.datatype.hexadecimal(),
            sealingNumber: faker.datatype.hexadecimal(),
            amount: faker.datatype.number(),
            dateAdded: Date.now(),
            createdAt: Date.now(),
            updatedAt: Date.now(),
            refId: faker.datatype.uuid()
        };
        importList.push(importItem);
    });
    return importList;
}

const randomDetailImport = (importList, numberOfProducts) => {
    if(numberOfProducts <= 0) return;
    const detailList = [];
    // random data
    for (const _import of importList) {
        Array.from(new Array(numberOfProducts)).forEach(() => {
            const detail = {
                id: _import.id,
                importQuantity: faker.datatype.number(),
                quantityInStock: faker.datatype.number(),
                exportQuantity: faker.datatype.number(),
                usedQuantity: faker.datatype.number(),
                cancelQuantity: faker.datatype.number(),
                createdAt: Date.now(),
                updatedAt: Date.now(),
            };
            detailList.push(detail);
        });
    }
    return detailList;
}

// const randomProduct = (n) => {
//     if (n <=0) return;
//     const productList = [];
//     Array.from(new Array(numberOfProducts)).forEach(() => {
//         const product = {
//             categoryId: category.id,
//             id: faker.datatype.uuid(),
//             name: faker.commerce.productName(),
//             color: faker.commerce.color(),
//             price: Number.parseFloat(faker.commerce.price()),
//             description: faker.commerce.productDescription(),
//             createdAt: Date.now(),
//             updatedAt: Date.now(),
//             thumnailUrl: faker.image.imageUrl(400,400)
//         };
//         productList.push(product);
//     });
//     return productList;
// }

// IFFE
(() => {
    // random data
    const categoryList = randomCategoryList(4);
    const productList = randomProductList(categoryList, 5);
    const importList = randomImportList(20);
    const detailImport = randomDetailImport(importList,5);
    // prepare db object
    const db = {
        // categories: categoryList,
        // products: productList,
        imports: importList,
        detailImport: detailImport,
        profile: {
            name: "Po"
        }
    }

    // write db object to db.json
    fs.writeFile('db.json', JSON.stringify(db), () => {
        console.log('Generate data successfully =))');
    });
})();