const { Schema, model } = require("mongoose");

const expenseSchema = new Schema(
  {
    date: {
      type: Date,
      // required: [true, 'Date is required.'],
    },
    description: {
      type: String,
      trim: true
    },
    amount: {
      type: Number,
      required: [true, 'amount is required.'],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    category: {
      // type: Schema.Types.ObjectId,
      type: String,
      enum: ["Comida", "Cuentas y pagos", "Hogar", "Transporte", "Ropa", "Salud y Belleza", "Diversion", "Otros gastos"]
      // ref: 'Category',
    }
    // account: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Account',
    // required: [true, 'account is required.'],
  },
  {
    timestamps: true
  }
);

const Expense = model("Expense", expenseSchema);

module.exports = Expense;
