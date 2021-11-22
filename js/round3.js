const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

//var runningman = document.getElementById("runman");

//canvas 크기
canvas.width = window.innerWidth;
canvas.height = window.innerHeight-105;

var runningman = new Image();
runningman.src="../img/round3/man_right.png";

//배열에 넣어서 랜덤으로 나오게 하기
var fishBread = new Image();
fishBread.src = "../img/round3/fishBread.png"
var eggBread = new Image();
eggBread.src = "../img/round3/eggBread.png"
var chikenSkewers = new Image();
chikenSkewers.src = "../img/round3/chikenSkewers.png";

//움직이는 player obj
var player = {
    x : canvas.width/2,
    y : 600,
    width : 300,
    height : 220,
    draw(){
        //ctx.fillStyle="blue";
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(runningman, this.x, this.y, this.width, this.height);
    }
};
//player.draw();

class Food{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.width = 100;
        this.height = 70;
        this.speed = 12; //떨어지는 속도
    }
    draw(){
        ctx.drawImage(fishBread, this.x, this.y, this.width, this.height)
    }
}

//키보드 이벤트
document.addEventListener('keydown',function(e){
    if(e.code == "ArrowRight") {
        runningman.src = "../img/round3/man_right.png";
        player.x += 20;
        if(player.x > canvas.width) player.x = canvas.width;
    }
    if(e.code == "ArrowLeft") {
        runningman.src="../img/round3/man_left.png";
        player.x -= 20;
        if(player.x < 0) player.x = 0
    }
});

//음식과 player의 충돌체크
function chkCollison(player, food) {
    
}

//여러개의 food 중 그려질 food 선택
function selFood(){

}

var foodList=[]; //food들을 가지고 있음
var timer = 0; //프레임 실행 횟수
//게임 시작
function startGame() {
    requestAnimationFrame(startGame);
    timer++;

    ctx.clearRect(0,0, canvas.width, canvas.height); //canvas 초기화

    var cnt=0;
    if(timer % 144 === 0){ //180프레임 마다 장애물 그림
        var food = new Food();
        
        foodList.push(food); //배열에 장애물 넣음
        cnt++;
    }

    foodList.forEach((f,i,fl)=>{
        //장애물의 y좌표가 0보다 작을 시 제거함
        if(f.y < 0) fl.splice(i,1);

        //var ran_y = Math.floor(Math.random() * 10);

        //좌표 생성 위치는 랜덤, 랜덤한 속도로 바닥에 닿음
        //f.x = Math.floor(Math.random() *200);
        f.y += f.speed;

        chkCollison(player,f); //모든 장애물에 대해 충돌체크
        f.draw();
    });
    player.draw();
}

startGame();