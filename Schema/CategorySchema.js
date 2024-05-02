const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const DetailsSchema = new Schema ({
    
title: {
    type: String,
   
},

description: {
    type: String,
    
},

created_at: {
    type: Date,
    default: Date.now
},

blog_category : {
type: String,
default: "Personal"
},


status: {
    type: String,
    default: "Pending"
},

slug: {
    type: String,
    unique: true
}

})

const Details = mongoose.model('details', DetailsSchema);
module.exports = Details