// URL da API para obter a lista de raças de cães
const breedUrl = 'https://api.thedogapi.com/v1/breeds';
// URL da API para buscar imagens de cães, limitando a 6 imagens e usando um ID de raça
const searchUrl = 'https://api.thedogapi.com/v1/images/search?limit=6&breed_ids=';
// URL da API para obter um fato curioso sobre cães
const factUrl = 'https://dog-api.kinduff.com/api/facts?number=1';

// Função assíncrona para obter a lista de raças de cães
async function getRaça() {
    try {
        // Faz uma requisição para a URL das raças
        const response = await fetch(breedUrl);
        // Converte a resposta da requisição em JSON (um formato de dados)
        const raças = await response.json();
        // Seleciona o elemento HTML onde as opções de raças serão colocadas
        const raçaSelect = document.getElementById('raçaSelect');

        // Para cada raça recebida da API
        raças.forEach(raça => {
            // Cria um novo elemento de opção
            const option = document.createElement('option');
            // Define o valor da opção como o ID da raça
            option.value = raça.id;
            // Define o texto que será mostrado na opção como o nome da raça
            option.textContent = raça.name;
            // Adiciona a nova opção ao seletor de raças
            raçaSelect.appendChild(option);
        });
    } catch (error) {
        // Se houver um erro, ele será exibido no console
        console.error('Erro ao obter a lista de raças:', error);
    }
}

// Função assíncrona para obter imagens de cães da raça selecionada
async function getDogImage() {
    // Obtém o ID da raça selecionada na lista
    const raçaId = document.getElementById('raçaSelect').value;

    // Verifica se uma raça foi selecionada
    if (!raçaId) {
        // Se não, exibe um alerta pedindo para selecionar uma raça
        alert('Selecione uma raça.');
        return; // Para a execução da função aqui
    }

    try {
        // Faz uma requisição para obter um fato curioso sobre cães
        const factResponse = await fetch(factUrl);
        // Converte a resposta em JSON
        const factData = await factResponse.json();
        // Obtém o primeiro fato curioso
        const factText = factData.facts[0];

        // Seleciona o elemento onde o fato será exibido
        const factTextElement = document.getElementById('factText');
        // Atualiza o conteúdo do elemento com o fato curioso
        factTextElement.textContent = factText;

        // Faz uma requisição para obter imagens da raça selecionada
        const response = await fetch(searchUrl + raçaId);
        // Converte a resposta em JSON
        const data = await response.json();

        // Seleciona o contêiner onde as imagens dos cães serão mostradas
        const imagesContainer = document.getElementById('imagesContainer');
        // Limpa qualquer conteúdo anterior que possa estar lá
        imagesContainer.innerHTML = '';

        // Verifica se foram retornadas imagens
        if (data.length > 0) {
            // Para cada cachorro na resposta
            data.forEach(dog => {
                // Cria um novo contêiner para a imagem
                const imgContainer = document.createElement('div');
                // Adiciona uma classe CSS para estilizar o contêiner
                imgContainer.classList.add('imageItem');

                // Cria um novo elemento de imagem
                const img = document.createElement('img');
                // Define a fonte da imagem como a URL do cachorro
                img.src = dog.url;
                // Define um texto alternativo para a imagem
                img.alt = "Imagem de cachorro";

                // Adiciona a imagem ao contêiner de imagens
                imgContainer.appendChild(img);
                // Adiciona o contêiner da imagem ao contêiner principal
                imagesContainer.appendChild(imgContainer);
            });
        } else {
            // Se não houver imagens, cria uma mensagem informando isso
            const noDogsMessage = document.createElement('p');
            // Define o texto da mensagem
            noDogsMessage.textContent = "Nenhuma imagem encontrada.";
            // Adiciona a mensagem ao contêiner de imagens
            imagesContainer.appendChild(noDogsMessage);
        }
    } catch (error) {
        // Se houver um erro, ele será exibido no console
        console.error('Erro na requisição:', error);
    }
}

// Aguarda o carregamento do documento HTML antes de executar o código abaixo
document.addEventListener('DOMContentLoaded', () => {
    // Chama a função para obter a lista de raças assim que a página é carregada
    getRaça();
    // Adiciona um ouvinte de evento que chama a função getDogImage quando o botão é clicado
    document.getElementById('fetchDog').addEventListener('click', getDogImage);
});
