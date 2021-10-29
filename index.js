const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// middleware:
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.8su0x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        console.log('DB connected');
        const database = client.db("traveller");
        const usersCollection = database.collection("users");
        // create a document to insert
        const doc = {
            name: "Traveller",
            email: "user@mongo.com",
        }
        const result = await usersCollection.insertOne(doc);
        console.log(`A document was inserted with the _id: ${result.insertedId}`);

    }
    finally {
        // await client.close();
    }

}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Running my CRUD server');
});

app.listen(port, () => {
    console.log('Running server on port', port);
});
