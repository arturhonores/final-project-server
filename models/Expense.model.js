const { Schema, model } = require("mongoose");

const expenseSchema = new Schema(
  {
    date: {
      type: Date,
      required: [true, 'Selecciona una fecha'],
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'Escribe una descripción'],
    },
    amount: {
      type: Number,
      required: [true, 'Ingresa el importe del gasto'],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    category: {
      type: String,
      enum: ["Alimentación", "Cuentas y pagos", "Hogar", "Transporte", "Ropa", "Salud y Belleza", "Diversión", "Otros gastos"],
      required: [true, 'Elige una categoría'],
    }
  },
  {
    timestamps: true
  }
);

const Expense = model("Expense", expenseSchema);

module.exports = Expense;
