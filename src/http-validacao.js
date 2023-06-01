import chalk from "chalk";

function extraiLinks (arrLinks) {
     return arrLinks.map((objetoLink) => 
        Object.values(objetoLink).join())
 }

async function checaStatus(listaURLs) {
    const arrStatus = await Promise.all(
        listaURLs.map(async (url) => {
            try {
                const response = await fetch(url)
                return response.status;
            } catch(erro) {
                return ManejaErros(erro);
            }
           
        })
    )
    return arrStatus;
}

function ManejaErros(erro) {
    if(erro.cause.code === "ENOTFOUND") {
        return 'link não encontrado';
    } else {
        return 'ocorreu algum erro';
    }
}

export default async function listaValidada(listaLinks) {
    const links =  extraiLinks(listaLinks);
    const status = await checaStatus(links);
    return listaLinks.map((objeto, indice) => ({
        ...objeto,
        status: status[indice]
    }));
}
