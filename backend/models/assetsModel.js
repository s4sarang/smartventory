import mongoose from 'mongoose';

const assetsSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
      unique: false,
    },
    link: {
      type: String,
      required: true,
      unique: true,
    },
    count: {
      type: Number,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    launch: {
      type: Number,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Assets = mongoose.model('Assets', assetsSchema);

export default Assets;
