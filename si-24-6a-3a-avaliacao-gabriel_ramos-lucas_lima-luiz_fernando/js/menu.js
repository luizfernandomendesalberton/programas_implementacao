//Função de alterar página
async function carregarConteudo(pagina) {
    try {
        const response = await fetch(`./${pagina}.html`);
        const conteudoHtml = await response.text();
        document.querySelector('.conteudo').innerHTML = conteudoHtml;
        if (pagina === 'menu') {
            const menuButton = document.getElementById('menuButton');
            if (menuButton) {
                menuButton.style.display = 'none';
            }
        } else {
            const menuButton = document.getElementById('menuButton');
            if (menuButton) {
                menuButton.style.display = 'inline-block';
            }
        }
    } catch (error) {
        console.error("Erro ao carregar o conteúdo:", error);
    }
}

let carroselInterval;

function carrosel(interval) {
    const ids = ["c1", "c2", "c3"];
    const titulos = {
        c1: "Bugatti Centodieci",
        c2: "Toro",
        c3: "Fiat"
    };

    let indiceAtual = 0;

    carroselInterval = setInterval(() => {
        const elementoAtual = document.getElementById(ids[indiceAtual]);
        if (elementoAtual) {
            elementoAtual.style.display = 'none';
        }

        indiceAtual = (indiceAtual + 1) % ids.length;

        const novoElemento = document.getElementById(ids[indiceAtual]);
        if (novoElemento) {
            novoElemento.style.display = 'block';
        }

        const tituloElemento = document.querySelector(".marca h2");
        if (tituloElemento) {
            tituloElemento.textContent = titulos[ids[indiceAtual]] || "";
        }
    }, interval);
}


function pausarInterval() {
    if (carroselInterval) {
        clearInterval(carroselInterval);
        carroselInterval = null;
    }
}

export {
    carregarConteudo,
    carrosel,
    pausarInterval
}
