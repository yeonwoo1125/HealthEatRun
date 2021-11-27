let score = 0;
if(localStorage.getItem("score")){
    score = Number(localStorage.getItem("score"));
}

let disc = document.createElement('div');
disc.setAttribute('id','disc');
disc.innerHTML = "Space를 눌러 게임을 시작하세요!";
document.body.appendChild(disc);

const background = new Audio('../music/SnakeontheBeach.mp3'); //배경 음악
background.volume = 0.1;
let start = false;

let bottom = document.createElement('div')
bottom.setAttribute('id','bottom');
document.body.appendChild(bottom);

const canvas = document.createElement('canvas');
canvas.setAttribute('id','canvas');
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');

//canvas 크기
canvas.width = window.innerWidth;
canvas.height = window.innerHeight-105;

let runningman = new Image();
runningman.src="../img/round3/man_right.png";

//배열에 넣어서 랜덤으로 나오게 하기
const fishBread = new Image();
fishBread.src = "../img/round3/fishBread.png";
const eggBread = new Image();
eggBread.src = "../img/round3/eggBread.png";
const chikenSkewers = new Image();
chikenSkewers.src = "../img/round3/chikenSkewers.png";
const fishCake = new Image();
fishCake.src = "../img/round3/fishCake.png";
const icecream = new Image();
icecream.src = "../img/round3/icecream.png";
//이미지 객체 배열에 넣기
const dropFoodList = new Array(fishBread,eggBread,chikenSkewers,fishCake,icecream);

function ready(){
    disc.remove();
    start = true;
    setTimeout(function(){
        background.play();
        progressBar();
        startGame(); //space를 한번 눌러야 시작
    },2000)

}

//움직이는 player obj
let player = {
    x : canvas.width/2-75,
    y : 669,
    width : 150,
    height : 150,
    draw(){
        //ctx.fillStyle="blue";
        //ctx.fillRect(this.x, this.y, this.width, this.height); //히트박스 개념
        ctx.drawImage(runningman, this.x, this.y, this.width, this.height);
    }
};

//하늘에서 떨어지는 음식
class Food{
    constructor(){
        this.x = Math.floor(Math.random()*1200); 
        this.y = 0;
        this.width = 80;
        this.height = 70;
        this.speed = Math.floor(Math.random()*15+3); //떨어지는 속도
        this.foodImg= dropFoodList[Math.floor(Math.random()*5)]; //떨어지는 음식 
    }
    draw(){   //이미지 그림
        ctx.drawImage(this.foodImg, this.x, this.y, this.width, this.height)
    }
}

let esc = false;
//키보드 이벤트
document.addEventListener('keydown',(e)=>{
    if(e.code === "Space"){
        if(start === false)
         ready();
    } 
    if(e.code === "Escape") {
        //let pause = document.createElement('')
        if(esc === true) {
            startGame(); //esc 누른 후 다시 눌렀을 때 애니메이션 시작
            esc = false;
        }
        else {
            cancelAnimationFrame(animation); //esc를 누르면 애니메이션 정지
            esc = true;
        }
    }
    if(e.code === "ArrowRight") {
        if(esc === false){
            runningman.src = "../img/round3/man_right.png";
            player.x += 20;
            if(player.x > window.innerWidth) player.x = window.innerWidth;
        }

    }
    if(e.code === "ArrowLeft") {
        if(esc === false){
            runningman.src="../img/round3/man_left.png";
            player.x -= 20;
            if(player.x < 0) player.x = 0
        }
    }
});

//음식과 player의 충돌체크
function chkCollison(player, food) {
    localStorage.setItem("score",score);
    console.log(score);
}

let animation;
let foodList=[]; //food들을 가지고 있음
let frameCnt = 0; //프레임 실행 횟수

//게임 시작
function startGame() {
    animation = requestAnimationFrame(startGame)
    frameCnt++;

    ctx.clearRect(0,0, canvas.width, canvas.height); //canvas 초기화
    if(frameCnt % 100 === 0) score++;
    if(frameCnt % 30 === 0){ //180프레임 마다 장애물 그림
        let food = new Food();
        foodList.push(food);
    }

    foodList.forEach((f,i,fl)=>{
        //장애물의 y좌표가 0보다 작을 시 제거함
        if(f.y < 0) fl.splice(i,1);

        //좌표 생성 위치는 랜덤, 랜덤한 속도로 바닥에 닿음
        f.y += f.speed;

        chkCollison(player,f); //모든 장애물에 대해 충돌체크
        f.draw();
    });

    player.draw();
}

//게임의 진행도를 나타냄
function progressBar(){
    const progress = document.createElement('progress')
    progress.setAttribute('id','progress');
    progress.setAttribute('Max',100);
    progress.setAttribute('value',50);
    document.body.appendChild(progress);
}
