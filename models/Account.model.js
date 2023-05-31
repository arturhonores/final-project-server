const { Schema, model } = require("mongoose");

const accountSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            minLength: [3, 'name must have at least 3 characters'],
            required: [true, 'account is required.'],
        },
        icon: {
            type: String,
            trim: true,
            required: [true, 'icon is required.'],
        }
    },
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`    
        timestamps: true
    }
);

const Account = model("Account", accountSchema);

module.exports = Account;
