let des = document.getElementById('des').getContext('2d');

let bg = new Image();
bg.src = './assets/pista.jpg';

let gameOverImg = new Image();
gameOverImg.src = './assets/gameover.jpg';

let winImg = new Image();
winImg.src = './assets/vencer.png'

let Winimg2 = new Image();
Winimg2.src = './assets/bg_vitoria.jpg'


let carro = new Carro(225, 590, 45, 100, './assets/carroprincipal.png');

let c2 = new Carro2(400, -40, 50, 100, './assets/carro_02.png');
let c3 = new Carro2(200, -280, 50, 100, './assets/carro_03.png');
let c4 = new Carro3(200, -280, 50, 100, './assets/carro_04.png')
let obs = new Obs1(200, -280, 45,100, './assets/jv.png')

let t1 = new Text();
let t2 = new Text();
let t3 = new Text();
let t4 = new Text();
let t5 = new Text();
let t6 = new Text();

let musica = new Audio('./assets/musica_de_fundo.mp3')
let motor = new Audio('./assets/motor.wav');
let audio = new Audio('./assets/risada.mp3')
let vencer = new Audio('./assets/aplausos.mp3')
let batida = new Audio('./assets/batida_carro.mp3')
motor.volume = 0.8;
motor.loop = true;
batida.volume = 0.5;
musica.volume = 0.4
audio.loop = false
audio.volume = 0.2

let vencedor = false
let pause = false
let jogar = true;
let gameOver = false;

document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase(); 

    if (key === 'a' || e.key === 'ArrowLeft') {
        carro.dir = -10;  
    } else if (key === 'd' || e.key === 'ArrowRight') {
        carro.dir = 10;   
    }
});

document.addEventListener('keyup', (e) => {
    const key = e.key.toLowerCase(); 

    if (key === 'a' || key === 'd' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        carro.dir = 0;  
    }
});

document.addEventListener('keyup', (e)=> {
    if (e.key === 'g'){
        jogar = true
        pause = false
    }else if (e.key === 'p') {
        jogar = false
        pause = true
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
    }else if(carro.point(c4)){
        carro.pts += 4;
    }

    if(carro.pts >= 10){
        c2.velocidade = 6
        c3.velocidade = 4
        c4.velocidade = 10
    } 
    if(carro.pts >= 50) {
        c2.velocidade = 10
        c3.velocidade = 10
        c4.velocidade = 10
        obs.velocidade = 15
    }
    if(carro.pts >= 100){
        c2.velocidade = 15
        c3.velocidade = 15
        c4.velocidade = 15
        
    }
    if(carro.pts >= 230){
        vencedor = true
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
    } else if (carro.colid(c4)) {
        carro.vida -= 1;
        c4.recomeca();
        batida.play();
    } else if (carro.colid(obs)) {
        carro.vida -= 1;
        obs.recomeca();
        batida.play();
    }
}

function desenharVitoria2(){
    des.drawImage(Winimg2,0,0,500,700);
}

function desenharVitoria(){
    des.drawImage(winImg,0,0,500,700);
}

function desenharGameOver() {
    des.drawImage(gameOverImg, 0, 0, 500, 700);
}

function desenha() { 
    if (gameOver) {
        desenharGameOver();
        return;
    }
    
    if (jogar){
    des.drawImage(bg, 0, 0, 500, 700);
    t1.des_text('Pontos: ', 350, 24, 'yellow', '26px Times');
    t2.des_text(carro.pts, 450, 24, 'yellow', '26px Times');
    t3.des_text('Vida: ', 10, 24, 'pink', '26px Times');
    t4.des_text(carro.vida, 76, 24, 'pink', '26px Times');

    c2.des_car_img();
    c3.des_car_img();
    c4.des_car_img();
    obs.des_car_img();
    carro.des_car_img();
}
    
}

function atualiza() {
    if (jogar) {
        musica.play();
        motor.play();
        c2.mov_carro2();
        c3.mov_carro2();
        c4.mov_carro3();
        obs.mov_Obs1();
        carro.mov_carro();
        carro.anim('carroprincipal');
        pontos();
        colisao();
        game_over();
    }
}

function main() {

    if(jogar === false){
        des.clearRect(0, 0, 500, 700);
        desenha();
        requestAnimationFrame(main);
    } else if(jogar === true){
        des.clearRect(0, 0, 500, 700);
        atualiza();
        desenha();
        requestAnimationFrame(main);
    }
    
    if(pause === true){
        t6.des_text('Aperte "g" para despausar o jogo ', 150, 380, 'Red', '26px Impact');
        motor.pause();
        musica.pause();
    } else if (pause === false){
    }

    if(gameOver === true){
        desenharGameOver();
        motor.pause();
        musica.pause();
        audio.play();
    }
    if(vencedor === true){
        desenharVitoria2();
        desenharVitoria();
        t6.des_text('VOCE VENCEUUUU!!!!!!! ', 100, 670, 'YELLOW', '36px Impact');
        vencer.play();
        motor.pause();
        musica.pause();
        audio.pause();
        jogar = false
    }
}

main();
