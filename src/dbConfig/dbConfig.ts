import mongoose from 'mongoose';

export async function connect(){
    try{
        await mongoose.connect(process.env.MONGO_URI!)
        const connection =mongoose.connection;

        connection.on('connected', () => {
            console.log('Mongo DB connection established')

        })

        connection.on('error', (error : Error) =>{
            console.log('Error connecting to Mongo DB:', error.message)
        })
    } catch (e : unknown) {
        if(e instanceof Error) {
            console.log('error',e.message)
        }else{
            console.log('Uknown error')
        }
    }
}