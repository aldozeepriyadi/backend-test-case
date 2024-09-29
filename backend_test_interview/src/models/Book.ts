import mongoose, { Document, Schema } from 'mongoose';

export interface IBook extends Document {
  code: string;
  title: string;
  author: string;
  stock: number;
  borrowedBy?: mongoose.Types.ObjectId | null;
  borrowedAt?: Date | null;
}

const BookSchema: Schema = new Schema({
  code: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  stock: { type: Number, required: true },
  borrowedBy: { type: Schema.Types.ObjectId, ref: 'Member', default: null },
  borrowedAt: { type: Date, default: null },
});

export default mongoose.model<IBook>('Book', BookSchema);
