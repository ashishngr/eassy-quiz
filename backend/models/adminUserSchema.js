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
            enum: ["ADMIN", "VISITOR"], 
            default: "ADMIN", 
            required: true
        }, 
        user_profile: {
            type: String
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

// AdminUserSchema.virtual("password")
// .set(function (password){
//         this._password = password; 
//         this.salt = process.env.PASSWORD_SALT; 
//         this.encrypted_password = this.securePassword(password)
// })
// .get(function(){
//     return this._password; 
// }); 
// AdminUserSchema.methods = {
//     authenticate: function(plainpassword){
//         return this.securePassword(plainpassword) === this.encrypted_password;
//     }, 
//     securePassword: function(plainpassword){
//         console.log("Plain password", plainpassword);
//         if(!plainpassword) return "No plain passoword"; 
//         try {
//             return crypto
//             .createHmac("sha256", this.salt)
//             .update(plainpassword)
//             .digest("hex")
//         } catch (error) {
//             console.log(error);
//             return error
//         }
//     }
// }; 

const AdminUser = mongoose.model("AdminUser", AdminUserSchema); 
module.exports = {
    AdminUser
}; 