//essa parte transforma a altura e a largura em constantes.
const larguraJogo = 700;
const alturaJogo = 850;

// usa as constantes definidas para usar na config do game
const config = {
    type: Phaser.AUTO,
    width: larguraJogo,
    height: alturaJogo,

    //add a fisica
    physics: {
        default: 'arcade',
        arcade: {
            gravity:{y : 300},
           //add modo debug(ver hitboxes!)
            debug: true
        }

    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// utiliza a config definida acima para criar o game
const game = new Phaser.Game(config);

//cria as variaveis
var alien;
var teclado;
var fogo;
var plataforma;
var moeda;
var placar;
var pontuacao = 0;
var tanque;
var plataforma2;
var plataforma3;


function preload() {
    //add as imagens
    this.load.image('background', 'assets/bg.png');
    this.load.image('alienigena', 'assets/alienigena.png');
    this.load.image('turbo', "assets/turbo.png");
    this.load.image('tijolos', 'assets/tijolos.png');
    this.load.image('moeda', 'assets/moeda.png');
    //nao usado: this.load.image('tanque', 'assets/tanque-nbg.png');
}

function create() {
    //adiciona a imagem posteriormente carregada no preload no meio da tela, ou seja altura/2 e largura/2
    this.add.image(larguraJogo/2, alturaJogo/2, 'background');
   
    //add o fogo
    fogo = this.add.sprite(0, 0, 'turbo');
   
    //faz o fogo ficar invisivel
    fogo.setVisible(false);
   
    //cria o alien no meio da tela
    alien = this.physics.add.sprite(larguraJogo/2, 0, 'alienigena');
   
    //nao deixa o alien sair das bordas do mundo
    alien.setCollideWorldBounds(true);
    teclado = this.input.keyboard.createCursorKeys();
   
    //cria a plataforma
    plataforma = this.physics.add.staticImage(larguraJogo/2, alturaJogo/2, 'tijolos');
   
    //add colisao no alien e tijolo
    this.physics.add.collider(alien, plataforma);
   
    //add moeda
    moeda = this.physics.add.sprite(larguraJogo/2, 0, 'moeda');
    moeda.setCollideWorldBounds(true);
    this.physics.add.collider(moeda, plataforma);
    moeda.setBounce(0.7);
  
    //add placar
    placar = this.add.text(50, 50, 'moeda:' + pontuacao, {fontSize:'45px', fill:'#495613'});
   
    //quando alien encostar na moeda
    this.physics.add.overlap(alien, moeda, function(){
        moeda.setVisible(false);
        var posicao_moedaY = Phaser.Math.Between(50, 650);
        moeda.setPosition(posicao_moedaY, 100);
        pontuacao += 1;
        placar.setText('moedas: ' + pontuacao);
        moeda.setVisible(true);
    });
//add outros objetos
    plataforma2 = this.physics.add.staticImage(larguraJogo - 50, alturaJogo/2, 'tijolos');
    plataforma3 = this.physics.add.staticImage(larguraJogo-650, alturaJogo/2, 'tijolos');
    
    //cria colisao dos novos objetos
    this.physics.add.collider(moeda, plataforma2);
    this.physics.add.collider(alien, plataforma2);
    this.physics.add.collider(moeda,  plataforma3);
    this.physics.add.collider(alien, plataforma3);
}

function update() {
    //faz a movimentaçao lateral do alien
    if(teclado.left.isDown){
        alien.setVelocityX(-150);
    } 
    else if (teclado.right.isDown){
        alien.setVelocityX(150);
    }
    else {
        alien.setVelocityX(0);
    }
    //faz a movimentaçao cima-baixo do alien
    if(teclado.up.isDown){
        alien.setVelocityY(-150);
        turboOn();
    }
    else if(teclado.down.isDown){
        alien.setVelocityY(150);
    }
    else{
        turboOff();
    }
    fogo.setPosition(alien.x, alien.y + alien.height/2);
}

//funções para ativar/desativar o turbo.      
function turboOn(){
    fogo.setVisible(true);
}
function turboOff(){
    fogo.setVisible(false);
}