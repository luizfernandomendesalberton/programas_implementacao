let carList = [
    {
        id: 1,
        model: 'Honda Civic',
        brand: 'Honda',
        ano: '2018',
        price: 'R$ 45.000,00',
        cor: 'Vermelho',
        quilo: '75,000',
        image: 'hondacivic.jpg'
    },
    {
        id: 2,
        model: 'Toyota Corolla',
        brand: 'Toyota',
        ano: '2020',
        price: 'R$ 50.000,00',
        cor: 'Prata',
        quilo: '45,000',
        image: 'corola.jpg'
    },
    {
        id: 3,
        model: 'Bugatti Centodieci',
        brand: 'Bugatti',
        ano: '2024',
        price: 'R$ 750.000,00',
        cor: 'Branco',
        quilo: '95,000',
        image: 'Bugatti-Centodieci.png'
    }
];

function renderCars(cars, carContainer) {
    carContainer.innerHTML = '';
    cars.forEach(car => {
        const carDiv = document.createElement('div');
        carDiv.classList.add('car-card');
        carDiv.innerHTML = `
          <img src="img/${car.image}" alt="${car.model}" class="car-image">
          <h2>${car.model}</h2>
          <p>Marca: ${car.brand}</p>
          <p>Ano: ${car.ano}</p>
          <p>Preço: ${car.price}</p>
          <p>Cor: ${car.cor}</p>
          <p>Quilometragem: ${car.quilo} km</p>
        `;
        carDiv.addEventListener('click', () => openModal(car));
        carContainer.appendChild(carDiv);
    });
}

function openModal(car) {
    const carModal = document.getElementById('car-modal');
    const carDetails = document.getElementById('car-details');
    carDetails.innerHTML = `
        <img src="img/${car.image}" alt="${car.model}" class="modal-car-image">
        <h2>${car.model}</h2>
        <p>Marca: ${car.brand}</p>
        <p>Ano: ${car.ano}</p>
        <p>Preço: ${car.price}</p>
        <p>Cor: ${car.cor}</p>
        <p>Quilometragem: ${car.quilo} km</p>
    `;
    carModal.style.display = 'block';
}

function adicionarCarro(model, brand, ano, price, cor, quilo) {
    const newCar = {
        id: carList.length + 1,
        model,
        brand,
        ano,
        price,
        cor,
        quilo,
        image: 'default.png'
    };
    carList.push(newCar);
}

function gerarCarros() {
    const carContainer = document.getElementById('car-list');
    const carModal = document.getElementById('car-modal');
    const carDetails = document.getElementById('car-details');
    const closeModal = document.querySelector('.close');
    const carForm = document.getElementById('car-form');

    if (carContainer && carModal && carDetails && closeModal && carForm) {
        renderCars(carList, carContainer);

        closeModal.addEventListener('click', () => carModal.style.display = 'none');
        carModal.addEventListener('click', (e) => {
            if (e.target === carModal) carModal.style.display = 'none';
        });

        const addCarButton = document.getElementById('addCar');

        addCarButton.addEventListener('click', () => {
            const model = document.getElementById('car-model').value;
            const brand = document.getElementById('car-brand').value;
            const ano = document.getElementById('car-ano').value;
            const price = document.getElementById('car-price').value;
            const cor = document.getElementById('car-cor').value;
            const quilo = document.getElementById('car-quilo').value;

            if (!model || !brand || !ano || !price || !cor || !quilo) {
                alert("Por favor, preencha todos os campos.");
                return;
            }

            adicionarCarro(model, brand, ano, price, cor, quilo);

            renderCars(carList, carContainer);

            document.getElementById('car-form').reset();
        });
    }
}

export {
    renderCars,
    openModal,
    gerarCarros,
    adicionarCarro,
    carList
}