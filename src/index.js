
import dotenv from 'dotenv';
import express from "express";
import connectDB from './db/index.js';

dotenv.config({
    path: './env'
})


const app = express();

connectDB();





// we can also do like this but it is not a good practice always connect mongodb in its specific file 

// ;(async() => {
//     try {
//       const response =  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//       console.log(response, 'response from mongodb');
      
//         app.on("errror", (error) => {
//             console.log("error:",error);
            
//         })
//         app.listen(process.env.PORT, () => (
//             console.log
//         ))
//     } catch (error) {
//         console.error(error);
//         throw error
//     }
    
// })()   // IIFE always use ; before IIFE