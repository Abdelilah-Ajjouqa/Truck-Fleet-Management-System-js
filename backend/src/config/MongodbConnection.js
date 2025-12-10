import mongoose from 'mongoose';

class MongodbConnection {
    isConnected;

    constructor(uri) {
        this.uri = uri;
        this.isConnected = false;
    }

    async connect() {
        try {
            await mongoose.connect(this.uri);
            this.isConnected = true;

            console.log("Mongodb connected");
        } catch (error) {
            this.isConnected = false;
            console.log("error: ", error.message);
        }
    }

    async disconnect() {
        try {
            await mongoose.disconnect();
            this.isConnected = false;

            console.log("disconneted");
        } catch (error) {
            console.log("error: ", error.message);
        }
    }
}

export default MongodbConnection;