"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const db_1 = __importDefault(require("./config/db"));
const port = process.env.PORT || 3000;
async function startServer() {
    try {
        await db_1.default.authenticate();
        console.log('conexion a la base de datos establecida');
        await db_1.default.sync();
        console.log('base de datos y modelos sincornizados');
        server_1.default.listen(port, () => {
            console.log(`Servidor escuchando en el puerto http://localhost:3000`);
        });
    }
    catch (error) {
        console.log('error durante la inicializacion', error);
    }
}
startServer();
//# sourceMappingURL=index.js.map