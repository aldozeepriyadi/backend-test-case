import mongoose, { Document, Schema } from 'mongoose';

export interface IMember extends Document {
  code: string;
  name: string;
  borrowedBooks: mongoose.Types.ObjectId[];
  penalty: {
    status: boolean;
    endDate: Date | null;
  };
}

const MemberSchema: Schema = new Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  borrowedBooks: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
  penalty: {
    status: { type: Boolean, default: false },
    endDate: { type: Date, default: null },
  },
});

export default mongoose.model<IMember>('Member', MemberSchema);
