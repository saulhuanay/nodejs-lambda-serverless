exports.handler = async (event) => {
    // Implementacion
    const url = 'mongodb://ec2-35-180-100-81.eu-west-3.compute.amazonaws.com:27017';
    const dbName = 'Prueba';
    const mongo = require('mongodb').MongoClient;
    const mongoConnection = new mongo(url);
    
    const client = await mongoConnection.connect();
    const db = client.db(dbName);
    const mongoDocument = {name: event.queryStringParameters.name, lastname: event.queryStringParameters.lastname};
    await db.collection('usuario').insertOne(mongoDocument);
    
    client.close();
    
    const response = {
        statusCode: 200,
        body: JSON.stringify('Bienvenido Usuario Creado')
    };
    return response;
};