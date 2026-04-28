import mongoose from 'mongoose';

const settlementSchema = new mongoose.Schema(
  {
    fromUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    toUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Group',
      required: true,
      index: true,
    },
    amount: {
      type: Number,
      required: [true, 'Settlement amount is required'],
      min: [0.01, 'Amount must be greater than 0'],
    },
    status: {
      type: String,
      enum: ['pending', 'completed'],
      default: 'completed',
    },
  },
  { timestamps: true }
);

const Settlement = mongoose.model('Settlement', settlementSchema);
export default Settlement;
