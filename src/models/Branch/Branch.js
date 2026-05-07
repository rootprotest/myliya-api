// models/Branch.js

const mongoose = require("mongoose");

const BranchSchema = new mongoose.Schema({
  name: { 
    type: String, 
    
  },

  address: { 
    type: String, 
   
  },

  phone: { 
    type: String, 
   
  },

  googleMapsUrl: { 
    type: String, 
    default: "" 
  },

  image: { 
    type: String, 
    default: "" 
  },

  description: {
    type: String,
    default: ""
  },

  isActive: { 
    type: Boolean, 
    default: true 
  },

  createdBy: { 
    type: String, 
   
  },


  createdAt: { 
    type: Date, 
    default: Date.now 
  }

});

const Branch = mongoose.model("Branch", BranchSchema);

module.exports = Branch;