import chalk from 'chalk';
import pegaArquivo from './index.js'
import fs from 'fs';
import listaValidada from './http-validacao.js';
const caminho = process.argv;

//node src/cli.js arquivos/texto.md
//npm run cli

async function imoprimeLista(valida, resultado, identificador = '') {

    if (valida) {
        console.log(chalk.yellow('Lista de Links'),
            chalk.black.bgGreen(identificador),
            await listaValidada(resultado));
    } else {
        {
            console.log(chalk.yellow('Lista de Links'),
                chalk.black.bgGreen(identificador),
                resultado);
        }
    }

}

async function processaTexto(argumentos) {
    const caminho = argumentos[2];
    const valida = argumentos[3] === '--valida';

    try {
        fs.lstatSync(caminho);
    } catch (erro) {
        if (erro.code === 'ENOENT') {
            console.log('Arquivo ou diretório não existe.')
            return;
        }
    }

    if (fs.lstatSync(caminho).isFile()) {
        const resultado = await pegaArquivo(caminho);
        imoprimeLista(valida, resultado);
    }
    else if (fs.lstatSync(caminho).isDirectory()) {
        const arquivos = await fs.promises.readdir(caminho);
        arquivos.forEach(async nomeDeArquivo => {
            const lista = await pegaArquivo(`${caminho}/${nomeDeArquivo}`);
            imoprimeLista(valida, lista, nomeDeArquivo);
        })
    }
}

processaTexto(caminho);
