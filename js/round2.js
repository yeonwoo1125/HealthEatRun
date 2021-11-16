//메인 부분 
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

//달리는 객체
var user={
    x :100,
    y:500,
    width:50,
    height:50,

}

//장애물 객체
class food{
    constructor(x,y,height, width) {
        this.x=x;
        this.y=y;
        this.height = height;
        this.width = width;
      }
}

function drawFood(){

}
//10밀리초 마다 함수 실행
setInterval(drawFood,10);