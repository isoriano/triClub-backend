import { Schema, model, Document } from 'mongoose';

export interface FilesDocument extends Document {
  chunkSize: number;
  contentType: string;
  filename: string;
  length: number;
  uploadDate: Date
}

const imageSchema = new Schema<FilesDocument>(
  {
    chunkSize: { type: Number },
    contentType: { type: String },
    filename: { type: String },
    length: { type: Number },
    uploadDate: { type: Date },
  }
);

export const FilesModel = model<FilesDocument>('files.files', imageSchema);
