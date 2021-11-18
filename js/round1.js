//캔버스 생성
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

ctx.fillStyle = 'green';
ctx.fillRect(10,10,100,100);

//달리는 캐릭터 
var character = {
    x:10,
    y:200,
    width: 50,
    heigth : 100,
    //draw 메소드
    draw(){
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.heigth);
    }
}

character.draw();
