import { Request, Response } from 'express';
import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';

import { GetChunksByFileId, GetFileById, GetFiles } from '../services';
import { getDBConnection, log as logger } from '../utils';

export const storeFile = () => {
  const storage = new GridFsStorage({
    url: getDBConnection(),
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        const filename = file.originalname;
        const fileInfo = {
          filename: filename,
          bucketName: 'files',
        };
        resolve(fileInfo);
      });
    },
  });

  return multer({ storage: storage });
};

export const getFilesHandler = async (req: Request, res: Response) => {
  try {
    const cursor = await GetFiles();

    if ((await cursor.length) === 0) {
      return res.status(500).send({
        message: 'No files found!',
      });
    }

    const fileInfos: any[] = [];
    await cursor.forEach((doc) => {
      fileInfos.push({
        id: doc.id,
        name: doc.filename,
        size: doc.length,
      });
    });

    const chunks = await GetChunksByFileId(cursor[0].id);
    if (!chunks || chunks.length === 0) {
      throw new Error('No data found');
    }

    const fileData = [];
    for (let i = 0; i < chunks.length; i++) {
      //This is in Binary JSON or BSON format, which is stored
      //in fileData array in base64 endocoded string format

      fileData.push(chunks[i].data.toString());
    }

    //Display the chunks using the data URI format
    const finalFile =
      'data:' + cursor[0].contentType + ';base64,' + fileData.join('');
    fileInfos[0].data = finalFile;
    // res.render('imageView', {
    //   title: 'Image File',
    //   message: 'Image loaded from MongoDB GridFS',
    //   imgurl: finalFile,
    // });

    return res.status(200).send(fileInfos[0]);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
};

export const getFileHandler = async (
  req: Request<{ uid: string }, unknown, unknown>,
  res: Response
) => {
  try {
    const uid = req.params.uid;
    const fileInfo = await GetFileById(uid);

    return res.status(200).send(fileInfo);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
};
