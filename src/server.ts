import Fastify, { FastifyInstance } from 'fastify';
import multipart, { MultipartFile } from '@fastify/multipart';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import path from 'path';
import { FileSaveResult, saveFile } from './config/saveFile';


const fastify: FastifyInstance = Fastify();

fastify.register(multipart);

const uploadDir: string = path.join(__dirname, 'uploads');

if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir, { recursive: true });
    console.log(`📁 Pasta de uploads criada em: ${uploadDir}`);
}



fastify.post('/upload', async (request, reply) => {
    try {
        console.log('🔹 Recebendo requisição de upload...');

        const file: MultipartFile | null = await request.file();

        if (!file) {
            console.log('❌ Nenhum arquivo foi enviado!');
            return reply.status(400).send({ error: 'Arquivo não enviado' });
        }

        console.log(`📂 Arquivo recebido: ${file.filename}`);

        // Salvar o arquivo usando a função separada
        const savedFile: FileSaveResult = await saveFile(file, uploadDir);

        return reply.send({
            message: 'Upload realizado com sucesso!',
            ...savedFile
        });

    } catch (error) {
        console.error('❌ Erro durante o upload:', error);
        return reply.status(500).send({ error: 'Erro interno no servidor' });
    }
});

// Iniciando o servidor
fastify.listen({ port: 3000 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`🚀 Servidor rodando!`);
});
