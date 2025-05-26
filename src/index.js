
import dotenv from 'dotenv';
import connectDB from './db/index.js';
import { app } from './app.js';

dotenv.config({
    path: './env'
})


connectDB().then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log("Your app is running on port : ", process.env.PORT || 8000 );
    })
}
    
).catch((err) => {
    console.log("MongoDB connection error in index file !! :", err );
})





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