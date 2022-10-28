import { ChunkModel } from '../models/chunk.model';
import { FilesModel } from '../models/files.model';

export const GetFiles = async () => {
  try {
    return await FilesModel.find({});
  } catch (error: any) {
    throw new Error(error);
  }
};

export const GetFileById = async (uid: string) => {
  try {
    const file = await FilesModel.findById(uid);

    if (!file) {
      throw new Error('File not found');
    }

    const chunks = await GetChunksByFileId(file.id);
    if (!chunks || chunks.length === 0) {
      throw new Error('No data found');
    }

    const fileData = chunks.map(chunk => Buffer.from(chunk.data).toString('base64')).join('');

    return {
      id: file.id,
      name: file.filename,
      size: file.length,
      data: 'data:' + file.contentType + ';base64,' + fileData
    };
  } catch (error: any) {
    throw new Error(error);
  }
};

export const GetChunksByFileId = async (fileId: string) => {
  try {
    return await ChunkModel.find({ files_id: fileId });
  } catch (error: any) {
    throw new Error(error);
  }
};
