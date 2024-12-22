class productController {
    constructor() {
        this.mongoDB = require('mongodb');
        this.mongoClient = this.mongoDB.MongoClient;
    }
     connectToDB() {
        let dbPromise = new Promise((resolve, reject) => {
            let contStr = 'mongodb://localhost:27017/eCommerceDB';
            //الطريقة هذه اللي تحت مش مستخدمه في الاصدارات الحديثة
            // this.mongoClient.connect(contStr, (err, mongoCon) => {
            //     console.log('first');
            //     if (err) {
            //         console.log('Error in connection to DB');
            //         reject(err);
            //     }
            //     else {
            //         console.log('Connection Established');
            //         resolve(mongoCon);
            //     }
            // });
            const database = new this.mongoClient(contStr);
            try {
                client.connect();
                console.log('connection success');
                resolve(client);
            } catch (err) {
                reject(err);
            }
        });
        return dbPromise;
    }
    async insertProduct(prd) {
        //هنا عندما اعمل async , await هنا انا بخليه يتعامل مع الداله على انها برومس
        //==============================
        //ممكن استخدم البرومس بالطريقة
        //let mongoCon = await this.connectToDB();//هنا بيروح ينتظر لوما ترجع ال then ويرجعها للكائن mongoCon وبهذه الطريقة بقع مع ال mongoCon then يعني بقع برومس
        //const dbCon = mongoCon.db('eCommerceDB');
        return await this.connectToDB().then((mongoCon) => {
            const dbCon =  mongoCon.db('eCommerceDB');
            dbCon.collection("products").insertOne(JSON.parse(prd), (err) => {
                if (err)
                    return err;
                else {
                    console.log('product inserted');
                    mongoCon.close();
                    return "product inserted";
                }
            });
        });
    }

    getAllProducts() {
        return new Promise((resolve, reject) => {
            this.connectToDB().then(async (mongoCon) => {
                const dbCon = mongoCon.db('eCommerceDB');
                //هذه الطريقة لم تعد مستخدمة في الاصدار الحديث
                // dbCon.collection('Product').find().toArray((err, result)=>{
                //     console.log('i am in getAllProducts');
                //     if (err) {
                //         console.log("Error in getting data..");
                //         reject(err);
                //     }
                //     else {
                //         console.log('Get Data successfully');
                //         mongoCon.close();
                //         resolve(result);
                //     }
                // });
                try {
                    let result = await dbCon.collection('products').find().toArray();
                    console.log('successfully');
                    resolve(result);
                    mongoCon.close();
                }
                catch (err) {
                    reject(err);
                }
            })
        })
    }
}
module.exports = productController;