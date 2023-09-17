let gifs = ['./imagens/bobrossparrot.gif', './imagens/explodyparrot.gif',
    './imagens/fiestaparrot.gif', './imagens/metalparrot.gif',
    './imagens/revertitparrot.gif', './imagens/tripletsparrot.gif', './imagens/unicornparrot.gif'];
let arrGif = [];
let primeiraCarta, segundaCarta;
let acertos = 0;
let qtde;
let contadorDeJogadas = 0;

function iniciaJogo() {
    qtde = Number(prompt('Com quantas cartas voce quer jogar?'));

    if (qtde % 2 === 0 && qtde >= 4 && qtde <= 14) {
        geraBaralho (qtde);
    } else {
        iniciaJogo();
    }
}
iniciaJogo();

function comparador() {
    return Math.random() - 0.5;
}

function geraBaralho (qtde) {
    for (let i = 0; qtde / 2 > i; i++) {
        arrGif.push(gifs[i]);
        arrGif.push(gifs[i]);
    }

    arrGif.sort(comparador)

    renderizaBaralho ()
}

function renderizaBaralho () {
    const carta = document.querySelector('.cartas');

    for (let i = 0; qtde > i; i++) {
        carta.innerHTML += `
        <li onclick="virar(this)"class="carta">
            <div class="front-face"><img src="./imagens/front.png"></div>
            <div class="back-face"><img class="image" src="${arrGif[i]}"></div>
        </li>`;
    }
}

function resetaCartas() {
    primeiraCarta = undefined;
    segundaCarta = undefined;
}

function desvirarCartas() {
    primeiraCarta.classList.remove('virada')
    segundaCarta.classList.remove('virada')

    resetaCartas()
}

function virar(card) {
    if (card.classList.contains('virada')) {
        return
    }

    if (primeiraCarta !== undefined && segundaCarta !== undefined) {
        return
    }

    if (primeiraCarta === undefined) {
        primeiraCarta = card;
        primeiraCarta.classList.add('virada');
    } else {
        if (segundaCarta === undefined) {
            segundaCarta = card
            segundaCarta.classList.add('virada')
            contadorDeJogadas++

            if (primeiraCarta.innerHTML === segundaCarta.innerHTML) {
                acertos++;
                resetaCartas();
                finalizaJogo()
            } else {
                setTimeout( desvirarCartas, 1000 );
            }
        }
    }
}

function verificarCartas() {
    if (primeiraCarta.innerHTML !== segundaCarta.innerHTML) {
        setTimeout(() => {
            primeiraCarta.classList.remove('virada');
            segundaCarta.classList.remove('virada');
        }, 2000);

    } else {
        finalizaJogo();
    }
    resetaCartas();
}

function finalizaJogo() {
    if (acertos === qtde / 2) {
        alert(`terminou o jogo com ${contadorDeJogadas} jogadas`);
        const resposta = confirm('Deseja jogar novamente?');
        if (resposta){
            window.location.reload(true);
        } else {
            alert('Obrigado por Jogar!');
        }
    }
}