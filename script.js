let currentSlide = 0;

function changeSlide(direction) {
    const slides = document.querySelectorAll('.carousel-slide');
    slides[currentSlide].classList.remove('active');

    currentSlide += direction;

    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    } else if (currentSlide >= slides.length) {
        currentSlide = 0;
    }

    slides[currentSlide].classList.add('active');
    updateCarousel();
}

function updateCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const offset = -currentSlide * 100; // Slide width is 100%
    document.querySelector('.carousel-container').style.transform = `translateX(${offset}%)`;
}

// Inicializa o carrossel
updateCarousel();

function escolherCasa() {
    const casas = ["Grifinória", "Sonserina", "Lufa-Lufa", "Corvinal"];
    const mensagens = {
        "Grifinória": "Coragem e bravura! Você é um verdadeiro herói!",
        "Sonserina": "Astúcia e ambição! Você sabe como conseguir o que quer.",
        "Lufa-Lufa": "Lealdade e amizade! Você valoriza seus amigos acima de tudo.",
        "Corvinal": "Inteligência e sabedoria! O conhecimento é seu maior poder."
    };

    const randomIndex = Math.floor(Math.random() * casas.length);
    const casaSelecionada = casas[randomIndex];

    // Atualiza o resultado na seção
    const resultContainer = document.getElementById('result-container');
    const houseResult = document.getElementById('house-result');
    houseResult.textContent = `Você pertence à casa: ${casaSelecionada}. ${mensagens[casaSelecionada]}`;

    // Exibe o Chapéu Seletor e o contêiner de resultados
    document.getElementById("sorting-hat").style.display = "block";
    resultContainer.style.display = "flex";

    // Esconde o botão
    document.getElementById("discover-button").style.display = "none";

    // Rola a página até o resultado
    resultContainer.scrollIntoView({ behavior: 'smooth' });
}

// --------------

const urlToFetch = "https://harry-potter-api-en.onrender.com/db"
const livroImagens = {
    "Harry Potter and the Sorcerer's Stone": "images/books-images/philosopher's-stone.png",
    "Harry Potter and the chamber of secrets": "images/books-images/chamber-of-secrets.png",
    "Harry Potter and the Prisoner of Azkaban": "images/books-images/azkaban.png",
    "Harry Potter and the Goblet of Fire": "images/books-images/goblet-of-fire.png",
    "Harry Potter and the Order of the Phoenix": "images/books-images/phoenix-order.png",
    "Harry Potter and the Half-Blood Prince": "images/books-images/half-blood.png",
    "Harry Potter and the Deathly Hallows": "images/books-images/deathly-hallows.png",
    "Harry Potter and the Cursed Child": "images/books-images/cursed-child.png"
};


fetch(urlToFetch)
	.then((res) => res.json())
	.then((data) => {
        data.books.forEach(element => {
            const imageUrl = livroImagens[element.title] || 'images/placeholder.png'; 
            document.getElementById("livros").innerHTML +=
            `
            <div class="livro">
                <h3>${element.title}</h3>  
                <img src="${imageUrl}" alt="Capa de ${element.title}" class="livro-imagem" />
                <p><strong>Autor:</strong> ${element.author}</p>
                <p><strong>Data de Publicação:</strong> ${element.releaseDay}</p>
                <p>${element.description}</p>
            </div>
`            
        });
	})
	.catch((e) => console.log(e));



