const { Schema, model } = require("mongoose");

const expenseSchema = new Schema(
  {
    date: {
      type: Date,
      // required: [true, 'Date is required.'],
      trim: true
    },
    description: {
      type: String,
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, 'amount is required.'],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      // required: [true, 'user is required.'],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      // required: [true, 'category is required.'],
    },
    account: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
      // required: [true, 'account is required.'],
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const Expense = model("Expense", expenseSchema);

module.exports = Expense;
