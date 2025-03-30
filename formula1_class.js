class Obj{
    constructor(x,y,w,h,a,){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.a = a
        this.pontuacao = false
    }
    des_obj(){
        des.fillStyle = this.a
        des.fillRect(this.x,this.y,this.w,this.h,this.a)
    }
}

class Carro extends Obj{
    dir = 0
    pts = 0
    vida = 5
    frame = 1
    tempo = 0
    velocidade = 0

    des_car_img(){
        let img = new Image()
        img.src = this.a
        des.drawImage(img, this.x, this.y, this.w, this.h)
    }

    anim(nome){
        this.tempo +=1
        if(this.tempo > 12){
            this.tempo = 0
            this.frame +=1
        }
        if(this.frame>4){
            this.frame=1
        }
        this.a = "assets/"+nome+".png"
    }
    
    des_carro(){
    }
    mov_carro(){
        this.x += this.dir
        if(this.x <=10){
            this.x = 10
        }else if(this.x >= 447){
            this.x = 447
        }
    }

    point(objeto) {
        if (!objeto.pontuacao && objeto.y >= 680 && objeto.y <= 700) {
            objeto.pontuacao = true;
            return true;
        }
        if (objeto.y > 700) {
            objeto.pontuacao = false;
        }
    
        return false;
    }
    
    colid(objeto){
        if((this.x < objeto.x + objeto.w)&&
          (this.x + this.w > objeto.x)&&
          (this.y < objeto.y + objeto.h)&&
          (this.y + this.h > objeto.y)){
            return true
        }else{
          return false
        }
    }
}

class Carro2 extends Carro{
    mov_carro2(){
        this.y += 6 + this.velocidade
        if(this.y >= 1000){
            this.recomeca()
        }
    }
    
    recomeca(){
        this.y = -100
        this.x = Math.floor(Math.random() * ((416 - 2 + 1) + 2));
    }
}
class Carro3 extends Carro{
    mov_carro3(){
        this.y += 0 + this.velocidade
        if(this.y >= 1000){
            this.recomeca()
        }
    }
    
    recomeca(){
        this.y = -100
        this.x = Math.floor(Math.random() * ((416 - 2 + 1) + 2));
    }
}
class Obs1 extends Carro{
    mov_Obs1(){
        this.y += 0 + this.velocidade
        if(this.y >= 1000){
            this.recomeca()
        }
    }
    
    recomeca(){
        this.y = -100
        this.x = Math.floor(Math.random() * ((416 - 2 + 1) + 2));
    }
    anim(nome){
        this.tempo +=1
        if(this.tempo > 12){
            this.tempo = 0
            this.frame +=1
        }
        if(this.frame>4){
            this.frame=1
        }
        this.a = "assets/"+nome+ this.frame + ".png"
    }
}



// class Estrada extends Obj{
//     des_estrada(){
//         des.fillStyle = this.a
//         des.fillRect(this.x,this.y,this.w,this.h)
//     }

//     mov_est(){
//         this.y += 4
//         if(this.y >= 780){
//             this.y = -100
//         }
//     }
// }

class Text{
    des_text(text,x,y,cor,font){
        des.fillStyle = cor
        des.lineWidth = '5'
        des.font = font
        des.fillText(text,x,y)
    }
}


