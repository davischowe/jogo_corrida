let des = document.getElementById('des').getContext('2d');

let bg = new Image();
bg.src = './assets/pista.jpg';

let gameOverImg = new Image();
gameOverImg.src = './assets/gameover.jpg';

let telaInicioImg = new Image();
telaInicioImg.src = './assets/bg.jpeg';

let c1 = new Carro(225, 450, 50, 80, 'darkblue');
let carro = new Carro(225, 600, 45, 100, './assets/carroprincipal.png');
let c2 = new Carro2(400, -40, 45, 100, './assets/carro_02.png');
let c3 = new Carro2(200, -280, 45, 100, './assets/carro_03.png');

let t1 = new Text();
let t2 = new Text();
let t3 = new Text();
let t4 = new Text();
let t5 = new Text();

let motor = new Audio('./assets/motor.wav');
let batida = new Audio('./assets/batida.mp3');
motor.volume = 0.8;
motor.loop = true;
batida.volume = 0.8;

let jogar = false;
let gameOver = false;

document.addEventListener('keydown', (e) => {
    if (e.key === 'a') {
        carro.dir -= 5;
    } else if (e.key === 'd') {
        carro.dir += 5;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'a' || e.key === 'd') {
        carro.dir = 0;
    } else if (e.key === 'g' && !jogar && !gameOver) {
        jogar = true;
        gameOver = false;
        carro.vida = 5;
        carro.pts = 0;
    }
});

function game_over() {
    if (carro.vida <= 0) {
        jogar = false;
        gameOver = true;
        motor.pause();
    }
}

function pontos() {
    if (carro.point(c2)) {
        carro.pts += 2;
    } else if (carro.point(c3)) {
        carro.pts += 2;
    }
}

function colisao() {
    if (carro.colid(c2)) {
        carro.vida -= 1;
        c2.recomeca();
        batida.play();
    } else if (carro.colid(c3)) {
        carro.vida -= 1;
        c3.recomeca();
        batida.play();
    } 
}

function desenharInicio() {
    des.drawImage(telaInicioImg, 0, 0, 500, 700);
}

function desenharGameOver() {
    des.drawImage(gameOverImg, 0, 0, 500, 700);
}

function desenha() {
    if (!jogar && !gameOver) {
        desenharInicio();
        return;
    }
    
    if (gameOver) {
        desenharGameOver();
        return;
    }

    des.drawImage(bg, 0, 0, 500, 700);
    t1.des_text('Pontos: ', 380, 24, 'yellow', '26px Times');
    t2.des_text(carro.pts, 470, 24, 'yellow', '26px Times');
    t3.des_text('Vida: ', 10, 24, 'pink', '26px Times');
    t4.des_text(carro.vida, 76, 24, 'pink', '26px Times');

    c2.des_car_img();
    c3.des_car_img();
    carro.des_car_img();
}

function atualiza() {
    if (jogar) {
        motor.play();
        c2.mov_carro2();
        c3.mov_carro2();
        carro.mov_carro();
        carro.anim('carroprincipal');
        pontos();
        colisao();
        game_over();  
    }
}

function main() {
    des.clearRect(0, 0, 500, 700);
    desenha();
    atualiza();
    requestAnimationFrame(main);
}

main();
