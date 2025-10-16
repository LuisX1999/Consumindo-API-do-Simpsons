const galeria = document.getElementById("galeria");
const btn = document.getElementById("btn");

async function carregarPersonagens() {
    galeria.innerHTML = "<p>Carregando Personagens...</p>";
    
    try{
        const resposta = await fetch("https://thesimpsonsapi.com/api/characters");

        if (!resposta.ok){
            throw new Error("Erro na requisição: " + resposta.status);
        }
        const dados = await resposta.json();
        const personagens = dados.results.slice(0, 10);

        galeria.innerHTML = "";

        personagens.forEach(p => {
            const card = document.createElement("div");
            card.className = "card";

            const img = document.createElement("img");
            img.src = `https://cdn.thesimpsonsapi.com/500${p.portrait_path}`;
            img.alt = p.name;

            const nome = document.createElement("h3");
            nome.textContent = p.name;

            const vivo = document.createElement("p");
            vivo.textContent = `Status: ${p.status}`;
            

            card.appendChild(img);
            card.appendChild(nome);
            card.appendChild(vivo);
            galeria.appendChild(card);
        });
    }
    catch(erro){
        console.error("Erro na requisição da API.");
        galeria.innerHTML("<p>Erro ao carregar personagem.</p>")
    }
}

btn.addEventListener("click", carregarPersonagens);
