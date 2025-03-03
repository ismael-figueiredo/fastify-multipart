# FASTIFY MULTIPART UPLOAD EXAMPLE

Exemplo prático de upload de arquivos usando Fastify e @fastify/multipart.

---

## TECNOLOGIAS  
- [Fastify](https://www.fastify.io/)  
- [@fastify/multipart](https://github.com/fastify/fastify-multipart)  
- [TypeScript](https://www.typescriptlang.org/)  

---

## ESTRUTURA DO PROJETO  

```
fastify-multipart-example/  
├── uploads/              # Pasta para armazenar arquivos  
├── src/  
│   ├── config/  
│   │   └── saveFile.ts   # Lógica de salvamento de arquivos  
│   └── server.ts         # Configuração do servidor  
├── package.json  
├── tsconfig.json  
└── README.md  
```

---

## COMO USAR  

### 1. INSTALAÇÃO  
Execute no terminal:  
```sh
npm install
```

### 2. INICIAR SERVIDOR  
Execute no terminal:  
```sh
npm run dev
```

### 3. TESTAR UPLOAD (VIA CURL)  
Comando:  
```sh
curl -X POST http://localhost:3000/upload -F "file=@CAMINHO_DO_SEU_ARQUIVO"
```

---

## ENDPOINT  

- **Método:** POST  
- **Rota:** `/upload`  
- **Content-Type:** `multipart/form-data`  

**Resposta de sucesso (Exemplo):**  
```json
{
  "message": "Upload realizado com sucesso!",
  "filename": "1710000000000-uuid.ext",
  "filepath": "caminho/absoluto/do/arquivo"
}
```

---

## OBSERVAÇÕES  
- Nomes de arquivos são gerados com timestamp + UUID para evitar conflitos.  
- A pasta `uploads/` é criada automaticamente se não existir.  
- Este projeto é um exemplo educativo. Não utilize em produção sem adaptações.  

---

## LICENÇA  
MIT License - Disponível gratuitamente para uso e modificação.
