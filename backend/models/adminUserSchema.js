const mongoose = require('mongoose'); 
const {Schema} = mongoose; 
const crypto = require("crypto");
const bcrypt = require('bcrypt');
const uuidv4 = require("uuid"); 

const AdminUserSchema = new Schema(
    {
        first_name: {
            type: String, 
            required: true, 
            maxlength: 32
        }, 
        last_name: {
            type: String, 
            maxlength: 32
        }, 
        email: {
            type: String, 
            trim: true, 
            required: true, 
            unique: true, 
        }, 
        profilePick: {
          type: String, 
          optional: true
        },
        encrypted_password: {
            type: String, 
            required: true
        }, 
        salt: String, 
        status: {
            type: String, 
            enum: ["Active", "Draft", "Deleted"], 
            default: "Active"
        },
        role: {
            type: String, 
            enum: ["ADMIN", "VISITOR", "SUPERADMIN"], 
            default: "ADMIN", 
        },  
    }, 
    {
        collection: "adminUser", 
        timestamps: {
            createdAt: "created_at", 
            updatedAt: "updated_at", 
        }, 
    } 
)

// Virtual property for password handling
AdminUserSchema.virtual("password")
  .set(function (password) {
    this.salt = this.salt || crypto.randomBytes(16).toString("hex"); // Generate salt if missing
    this.encrypted_password = bcrypt.hashSync(password, 10); // Hash using bcrypt
  })
  .get(function () {
    throw new Error("Password cannot be retrieved");
  });

// Pre-save middleware to ensure password hashing
AdminUserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  next(); // Hashing already done in the setter
});

// Authenticate method for password comparison
AdminUserSchema.methods = {
  authenticate(plainpassword) {
    return bcrypt.compareSync(plainpassword, this.encrypted_password); // Use bcrypt for comparison
  },
};
const AdminUser = mongoose.model("AdminUser", AdminUserSchema); 
module.exports = {
    AdminUser
}; 