import mongoose from "mongoose";

export let Users
switch (config.persitence) {
    case "MONGO":
        const connection =mongoose.connect('mongodb+srv://nehuengiannone:Lz7n3cS0vO7ulfvk@cluster0.s1deur4.mongodb.net/?retryWrites=true&w=majority')
        const {default:usersMongo}= await import ('./mongo/user.mongo.js')
        Users = usersMongo
        
        break;

    case "OTRO":
        const {default:usersOtro}= await import ('./mongo/user.mongo.js')
        Users = usersOtro
        break;
}