import { MultipartFile } from "@fastify/multipart/types";
import { createWriteStream } from "fs";
import path from "path";

export interface FileSaveResult {
  filename: string;
  filepath: string;
}

function generateUniqueFilename(originalFilename: string): string {
  const timestamp: number = Date.now(); 
  const uniqueId: string = crypto.randomUUID(); 
  const ext: string = path.extname(originalFilename); 
  return `${timestamp}-${uniqueId}${ext}`; 
}

export async function saveFile(file: MultipartFile, destinationDir: string): Promise<FileSaveResult> {
  return new Promise((resolve, reject) => {
      const newFilename: string = generateUniqueFilename(file.filename);
      const destinationPath: string = path.join(destinationDir, newFilename);

      const stream = createWriteStream(destinationPath);

      file.file.pipe(stream);

      stream.on('finish', () => {
          resolve({
              filename: newFilename,
              filepath: destinationPath
          });
      });

      stream.on('error', (err) => {
          console.error('❌ Erro ao salvar o arquivo:', err);
          reject(err);
      });
  });
}