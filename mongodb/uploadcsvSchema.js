const mongoose=require('mongoose');

const csvSchema=mongoose.Schema({
    csvdoc:{
        type:[Object]
    }
    
})

const csvs=mongoose.model('csvs',csvSchema);
module.exports =csvs;