import { carregarConteudo, carrosel, pausarInterval } from "./menu.js";
import { gerarCarros } from "./revenda.js";
import { buscarPlaca, filtrarCarros, resetarFiltros } from "./visual.js";

document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.getElementById('menuButton');
    const visualButton = document.getElementById('visualButton');
    const revendaButton = document.getElementById('revendaButton');
    let secaoAtiva = 'menu';

    async function trocarConteudo(secao) {
        pausarInterval();
        if (secao === 'menu') {
            carrosel(10000);
        }
        secaoAtiva = secao;
        await carregarConteudo(secao);
    }
    trocarConteudo('menu');

    if (menuButton) menuButton.addEventListener('click', () => carregarConteudo('menu'));

    if (visualButton) {
        visualButton.addEventListener('click', async () => {
            await carregarConteudo('visual');

            const buscarPlacaButton = document.getElementById('buscarPlaca');
            if (buscarPlacaButton) {
                buscarPlacaButton.addEventListener('click', buscarPlaca);
            } else {
                console.error('Elemento buscarPlaca não encontrado!');
            }
            document.getElementById('applyFilters').addEventListener('click', filtrarCarros);
            document.getElementById('resetFilters').addEventListener('click', resetarFiltros);
            gerarCarros();
        });
    }

    if (revendaButton) {
        revendaButton.addEventListener('click', async () => {
            await carregarConteudo('revenda');
            gerarCarros();
        });
    }
});
