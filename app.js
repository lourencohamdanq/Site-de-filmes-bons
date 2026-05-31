const dados = {
  "filmes": [
    {
      "id": 1,
      "nome": "circulo de fogo",
      "descricao": "em um futuro distante humanos e E.Ts vivem em guerra, ate os humanos desenvolverem maquinas que batem de frente com essa ameaça a vida na terra.",
      "conteudo": "Para combatê-los, os humanos criam os Jaegers: robôs gigantescos controlados simultaneamente por dois pilotos, que conectam suas mentes através de uma ponte neural. O conteúdo principal da história foca no esforço desesperado de pilotos improváveis para salvar o planeta usando modelos de robôs já considerados obsoletos.",
      "categoria": "Ficção Científica / Ação",
      "destaque": true,
      "imagem_principal": "public/img/circulo.png",
      "robos": [
        { "id": 1, "nome": "transformers 1", "descricao": "O destino da humanidade está em jogo quando duas raças de robôs, os Autobots e os vilões Decepticons, chegam à Terra. Os robôs possuem a capacidade de se transformarem em diferentes objetos mecânicos enquanto buscam a chave do poder supremo com a ajuda do jovem Sam.", "imagem": "public/img/transformers1.png" },
        { "id": 2, "nome": "chappie", "descricao": "Em um futuro próximo, policiais humanos são substituídos por robôs ultrarresistentes, dotados de inteligência artificial. Deon, o cientista criador das máquinas, rouba um modelo defeituoso e consegue fazer com que ele tenha a capacidade de sentir e pensar por si próprio. Porém, as autoridades começam a ver Chappie como um perigo para a humanidade e ordem e vão fazer de tudo para garantir que ele seja o último de sua espécie.", "imagem": "public/img/chappie.png" },
        { "id": 3, "nome": "eu, robo", "descricao": "Estrelado por Will Smith esse filme futuristico que se passa em 2035, é comum robôs serem usados como empregados e assistentes dos humanos. Para manter a ordem, esses robôs possuem um código que impede a violência contra humanos, a chamada Lei dos Robóticos. Quando Dr. Miles aparece morto e o principal suspeito é justamente um robô, acredita-se na possibilidade de que eles tenham encontrado um meio de desativar essa programação.", "imagem": "public/img/eu,robo.png" }
      ]
    },
    {
      "id": 2,
      "nome": "Transformers",
      "descricao": "O destino da Terra em jogo na guerra secular entre Autobots e Decepticons.",
      "conteudo": "Robôs alienígenas que conseguem se disfarçar como veículos normais trazem sua guerra para o nosso planeta. O jovem Sam Witwicky se torna a última esperança de salvar a humanidade ao lado de Optimus Prime.",
      "categoria": "Ação / Sci-Fi",
      "destaque": true,
      "imagem_principal": "public/img/transformers1.png",
      "robos": [
        { "id": 1, "nome": "Optimus Prime", "descricao": "Líder heróico dos Autobots, transforma-se em um poderoso caminhão.", "imagem": "" },
        { "id": 2, "nome": "Bumblebee", "descricao": "O batedor amarelo que se comunica através de frequências de rádio.", "imagem": "" }
      ]
    },
    {
      "id": 3,
      "nome": "Círculo de Fogo",
      "descricao": "Humanos pilotam robôs colossais para combater monstros que surgem do oceano.",
      "conteudo": "Quando monsters gigantes chamados Kaijus surgem das profundezas do mar, a humanidade cria os Jaegers: robôs gigantescos do tamanho de prédios, controlados por dois pilotos conectados mentalmente por uma ponte neural.",
      "categoria": "Ação / Mecha",
      "destaque": false,
      "imagem_principal": "",
      "robos": [
        { "id": 1, "nome": "Gipsy Danger", "descricao": "O Jaeger americano movido a reator nuclear, um verdadeiro guerreiro analógico das antigas.", "imagem": "" }
      ]
    }
  ]
};

document.addEventListener("DOMContentLoaded", () => {
  const carrosselContainer = document.querySelector("#carrossel-destaques .carousel-inner");
  const gridFilmesContainer = document.getElementById("grid-filmes");
  const detalheContainer = document.getElementById("detalhe-filme-container");

  if (gridFilmesContainer) {
    let primeiroDestaque = true;
    
    if(carrosselContainer) carrosselContainer.innerHTML = "";
    gridFilmesContainer.innerHTML = "";

    dados.filmes.forEach(filme => {
      if (filme.destaque && carrosselContainer) {
        const activeClass = primeiroDestaque ? "active" : "";
        primeiroDestaque = false;

        carrosselContainer.innerHTML += `
          <div class="carousel-item ${activeClass}">
            <a href="detalhe.html?id=${filme.id}">
              <img src="${filme.imagem_principal}" class="d-block w-100" style="height: 400px; object-fit: cover; cursor: pointer;" alt="${filme.nome}">
            </a>
            <div class="carousel-caption d-none d-md-block" style="background: rgba(0,0,0,0.75); border-radius: 8px; padding: 15px;">
              <h5>${filme.nome}</h5>
              <p>${filme.descricao}</p>
              <a href="detalhe.html?id=${filme.id}" class="btn btn-danger btn-sm">Ver Detalhes</a>
            </div>
          </div>
        `;
      }

      gridFilmesContainer.innerHTML += `
        <div class="col-md-4 mb-4">
          <a href="detalhe.html?id=${filme.id}" class="text-decoration-none card-clicavel-link">
            <div class="card h-100 bg-dark text-white border-secondary shadow">
              <img src="${filme.imagem_principal}" class="card-img-top" style="height: 230px; object-fit: cover;" alt="${filme.nome}">
              <div class="card-body">
                <h5 class="card-title fw-bold text-white">${filme.nome}</h5>
                <span class="badge bg-danger mb-2">${filme.categoria}</span>
                <p class="card-text small text-secondary">${filme.descricao}</p>
              </div>
              <div class="card-footer bg-transparent border-secondary text-center">
                <span class="text-danger small fw-bold">Clique para ver detalhes →</span>
              </div>
            </div>
          </a>
        </div>
      `;
    });
  }

  if (detalheContainer) {
    const params = new URLSearchParams(window.location.search);
    let idFilme = parseInt(params.get("id"));

    if (isNaN(idFilme)) {
      idFilme = 1; 
    }

    const filme = dados.filmes.find(f => f.id === idFilme);
    const gridRobos = document.getElementById("grid-robos");

    if (!filme) {
      detalheContainer.innerHTML = `<div class="alert alert-danger text-center my-4">❌ Erro: Filme não cadastrado no banco de dados.</div>`;
      return;
    }

    detalheContainer.innerHTML = `
      <div class="row align-items-center">
        <div class="col-md-5 mb-4 mb-md-0">
          <img src="${filme.imagem_principal}" class="img-fluid rounded border border-secondary shadow" alt="${filme.nome}">
        </div>
        <div class="col-md-7">
          <span class="text-danger fw-bold text-uppercase small">${filme.categoria}</span>
          <h1 class="display-5 text-white fw-bold mb-3">${filme.nome}</h1>
          <p class="lead text-secondary"><em>"${filme.descricao}"</em></p>
          <hr class="border-secondary">
          <h5 class="text-white">Sinopse Completa:</h5>
          <p class="text-light" style="text-align: justify; line-height: 1.6;">${filme.conteudo}</p>
          <a href="index.html" class="btn btn-danger mt-3 btn-sm">⬅ Voltar para a Home</a>
        </div>
      </div>
    `;

    if (gridRobos) {
      gridRobos.innerHTML = ""; 
      filme.robos.forEach(robo => {
        gridRobos.innerHTML += `
          <div class="col-md-4 mb-4">
            <div class="card bg-dark text-white border-secondary h-100 shadow-sm">
              <img src="${robo.imagem}" class="card-img-top" style="height: 220px; object-fit: cover;" alt="${robo.nome}">
              <div class="card-body">
                <h5 class="card-title text-danger fw-bold">${robo.nome}</h5>
                <p class="card-text small text-secondary">${robo.descricao}</p>
              </div>
            </div>
          </div>
        `;
      });
    }
  }
});