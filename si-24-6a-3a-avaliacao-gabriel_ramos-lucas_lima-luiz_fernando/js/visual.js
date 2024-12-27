import { renderCars, carList } from "./revenda.js";
//import { consultarPlaca } from "../node_modules/placa-fipe-api/index.js";

//a função consulta não está funcionando devido ao caminho relativo do pacote

function buscarPlaca() {
  const placa = document.getElementById('pesquisarPlaca').value.trim();
  const placaInfo = document.getElementById('placa-info');

  if (!placa) {
    placaInfo.innerHTML = '<p style="color: red;">Por favor, insira uma placa válida.</p>';
    return;
  }

  placaInfo.innerHTML = '<p>Buscando informações...</p>';

  consultarPlaca({ placa })
    .then((resultado) => {
      if (resultado && Object.keys(resultado).length > 0) {
        const detalhes = `
          <h3>Informações da Placa</h3>
          <p><b>Modelo:</b> ${resultado.modelo || 'Não informado'}</p>
          <p><b>Marca:</b> ${resultado.marca || 'Não informado'}</p>
          <p><b>Ano:</b> ${resultado.ano || 'Não informado'}</p>
          <p><b>Valor:</b> ${resultado.valor || 'Não informado'}</p>
        `;
        placaInfo.innerHTML = detalhes;
      } else {
        placaInfo.innerHTML = '<p style="color: red;">Nenhuma informação encontrada para esta placa.</p>';
      }
    })
    .catch((error) => {
      console.error(error);
      placaInfo.innerHTML = '<p style="color: red;">Ocorreu um erro ao buscar as informações. Tente novamente.</p>';
    });
}

function filtrarCarros() {
  let marca = document.getElementById('marca').value.toLowerCase();
  let modelo = document.getElementById('modelo').value.toLowerCase();
  let ano = document.getElementById('ano').value;
  let cor = document.getElementById('cor').value.toLowerCase();
  let quiloMaximo = document.getElementById('qMaximo').value.replace(' km', '').replace('.', '');
  let quiloMinimo = document.getElementById('qMinimo').value.replace(' km', '').replace('.', '');

  let carrosFiltrados = carList.filter(car => {
    return (
      (marca === '' || car.brand.toLowerCase().includes(marca)) &&
      (modelo === '' || car.model.toLowerCase().includes(modelo)) &&
      (ano === '' || car.ano === ano) &&
      (cor === '' || car.cor.toLowerCase().includes(cor)) &&
      (quiloMaximo === '' || parseInt(car.quilo.replace('.', '')) <= parseInt(quiloMaximo)) &&
      (quiloMinimo === '' || parseInt(car.quilo.replace('.', '')) >= parseInt(quiloMinimo))
    );
  });

  const carContainer = document.getElementById('car-list');
  renderCars(carrosFiltrados, carContainer);
}

function resetarFiltros() {
  document.getElementById('marca').value = '';
  document.getElementById('modelo').value = '';
  document.getElementById('ano').value = '';
  document.getElementById('cor').value = '';
  document.getElementById('qMaximo').value = '';
  document.getElementById('qMinimo').value = '';
  document.getElementById('vlMaximo').value = '';
  document.getElementById('vlMinimo').value = '';
  document.getElementById('finalPlaca').value = '';
  document.getElementById('dataInicio').value = '';
  document.getElementById('dataFim').value = '';
  document.getElementById('pesquisarPlaca').value = '';

  document.getElementById('desc').checked = false;
  document.getElementById('used').checked = false;
  document.getElementById('novo').checked = false;
  document.getElementById('maxVenda').checked = false;
  document.getElementById('lancamento').checked = false;

  const carContainer = document.getElementById('car-list');
  renderCars(carList, carContainer);
}

export {
  buscarPlaca,
  filtrarCarros,
  resetarFiltros
}