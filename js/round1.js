const canvas=document.getElementById('canvas');
const ctx = document.getElementById('2d');

const horizontal = 5; //가로
const vertical = 4; //세로

//사용할 캔버스 크기 지정
canvas.width = window.innerWidth ;
canvas.height = window.innerHeight-105 ;

//player객체, 라운드마다 달라질 수 있음
class player{
    constructor(){
        this.x = 50;
        this.y = canvas.height;
        this.width = 100;
        this.height = 100;
    }
    draw(){
        ctx.fillStyle="red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

//장애물 객체
class food{
    constructor() {
        this.x = canvas.width - 50;
        this.y = 520;
        this.width = 60;
        this.height = 70;
      }
      draw(){
        ctx.fillStyle="blue";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

var jumping=false;
//점프 방향키 이벤트
document.addEventListener('keydown',function(e){ //이벤트리스너 : 특정 이벤트가 발생하면 실행하는 함수
    if(e.code==='Space' || e.code === 'ArrowUp'){ //스페이스 또는 위쪽 방향키를 누르면 점프함
        jumping = true;
    }
})

var sliding=false;
document.addEventListener('keydown',function(e){ //이벤트리스너 : 특정 이벤트가 발생하면 실행하는 함수
    if(e.code==='ArrowDown'){ //스페이스 또는 위쪽 방향키를 누르면 점프함
        sliding = true;
    }
})

//.document.querySelector()는 css선택자. container를 검색(요소를 검색하는것)
const container = document.querySelector(".container"); 


