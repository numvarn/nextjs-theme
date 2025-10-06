import mongoose, { Schema, Model } from 'mongoose';

export interface IProduct {
  name: string;
  price: number;
  category: string;
  description: string;
  quantity: number;
  images: string[]; // URLs to images in Google Cloud Storage
  createdAt: Date;
  updatedAt: Date;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type ProductModel = Model<IProduct, {}, {}>;

const productSchema = new Schema<IProduct, ProductModel>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be a positive number'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity must be a positive number'],
      default: 0,
    },
    images: {
      type: [String],
      validate: {
        validator: function (v: string[]) {
          return v.length <= 3;
        },
        message: 'Cannot upload more than 3 images',
      },
      default: [],
    },
  },
  {
    timestamps: true, // This will automatically create createdAt and updatedAt
  }
);

const Product =
  mongoose.models.Product || mongoose.model<IProduct, ProductModel>('Product', productSchema);

export default Product;
