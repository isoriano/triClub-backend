import { Schema, model, Document, ObjectId } from 'mongoose';

export interface ChunkDocument extends Document {
  data: Buffer;
  files_id: ObjectId;
  n: number;
}

const chunkSchema = new Schema<ChunkDocument>(
  {
    data: Buffer ,
    files_id: Schema.Types.ObjectId,
    n: Number
  }
);

export const ChunkModel = model<ChunkDocument>('files.chunks', chunkSchema);
