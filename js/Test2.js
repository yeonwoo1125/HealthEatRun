var disc = document.createElement('div');
disc.setAttribute('id','disc');
document.body.appendChild(disc);

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

const background = new Audio('../music/MP_Waterfall.mp3'); //배경 음악
background.volume = 0.1;
let start = false;

//캔버스 생성
let bottom = document.createElement('div')
bottom.setAttribute('id','bottom');
document.body.appendChild(bottom);

canvas.width = window.innerWidth-100;
canvas.height = window.innerHeight-100;

//캐릭터 이미지 1 
let human = new Image();
human.src = '../img/round1/humanride.png';

//햄버거 이미지
let hamburger = new Image(); //이미지 컴포넌트임을 명시해준다
hamburger.src = '../img/round1/hamburger.png';

//감자튀김 이미지
let potato = new Image(); //이미지 컴포넌트임을 명시해준다
potato.src = '../img/round1/M.png';
 
//캐릭터 이미지 2
let human2 = new Image();
human2.src = '../img/round1/humanride2.png';

//아이스크림 이미지
let icecream = new Image();
icecream.src = '../img/round1/icecream.png';

let bottomFoodList = new Array(hamburger,potato); //점프할 장애물
let topFoodList = new Array(icecream);

let score = 0;

function ready(){
    disc.remove();
    document.body.appendChild(canvas);
    start= true;

    background.play();
    progressBar();
    //heartBar(); //체력바
    frame();
}

let character = {
    x:120,
    y:380,
    width:70,
    height:70,

    draw(){
        //ctx.fillStyle = 'green';
        //ctx.fillRect(this.x,this.y,this.width, this.height);
        ctx.drawImage(human, this.x, this.y, this.width,this.height);
    }
}

character.draw();

class Food{
    constructor(){
        this.x=600; //왼쪽부터 600px
        this.y=400; //위에서부터 400px
        this.width=50;
        this.height=50;
        this.bottomFood = bottomFoodList[Math.floor(Math.random()*2)];
    }
    draw(){
        //ctx.fillStyle= 'green';
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.bottomFood, this.x, this.y, this.width,this.height);
    }
}

//슬라이드를 위한 음식
class topFood{
    constructor(){
        this.x=600; //왼쪽부터 500px
        this.y=400; //위에서부터 200px
        this.width=50;
        this.height=50;
        this.topFood = topFoodList[Math.floor(Math.random()*1)];
    }
    draw(){
        //ctx.fillStyle= 'green';
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.topFood, this.x, this.y, this.width,this.height);
    }
}

let esc = false; //esc 초기설정
//키보드 이벤트
document.addEventListener('keydown',(e)=>{

    if(e.code === "Space"){
        if(start === false)
         ready();
    } 
    if(e.code === "Escape") {
        //let pause = document.createElement('')
        if(esc === true) {
            frame(); //esc를 누른 후 다시 눌렀을 때 애니메이션 시작
            background.play();
            esc = false;
        }
        else {
            cancelAnimationFrame(animation); //esc를 누르면 애니메이션 정지
            background.pause();
            esc = true;
        }
    }
});

let food = new Food();
food.draw();

let timer = 0;
let lotfood = [];
let jumptimer=0;
let progressWidth=0;

//진행바
const progress = document.createElement('progress')
function progressBar(){
    progress.setAttribute('id','progress');
    progress.setAttribute('Max',100);
    progress.setAttribute('value',0);
    document.body.appendChild(progress);
}
function frame(){
    requestAnimationFrame(frame) //기본 자바스크립트 함수
    timer++;
    ctx.clearRect(0,0, canvas.width, canvas.height);

    if(timer%100===0) progressWidth +=4;
    if(progressWidth <=100) progress.setAttribute('value',progressWidth);
    else endRound();

    
    
    if(timer%110 ==0 ){ //110프레임이 지나고 나서 장애물이 생긴다
        ctx.clearRect(0,0, canvas.width, canvas.height); //캔버스를 지우고 그리고 지우고 그리고
        /*if(timer%200==0){
            let chk = Math.floor(Math.random()*2);
            let food;
            if(chk==0){
                food=new bottomFoodList();
            }
        }*/
        
        let food = new Food();
        lotfood.push(food);
       // food.draw();
    }
    
    //forEach문에는 2개의 파라미터를 이용할 수 있음
    lotfood.forEach((a,i,o) => { //food를 하나씩 생성할 때마다 배열에 담는다(60프레임마다 한번씩 생긴 것을 하나씩 담아둔다)
        
        if(a.x<0){ //왼쪽으로 끝까지 간 장애물을 제거한다
            o.splice(i,1);
        }
        //a.x--; //x좌표를 1씩 뺀다면 왼쪽으로 쫄쫄 움직임
        collison(character,a);
        a.x = a.x-2;
        a.draw()
    });

    if(jumping == true){
        character.y-=2; //캐릭터를 위로 올린다
        jumptimer+=2;
      }

      if(jumping == false){ //점프중이 아니라면 다시 내려오게한다
          if(character.y<220){
          character.y+=2;
          } 
      }
      if(jumptimer >100){ //100프레임이 넘어간다면 점프를 멈추게 
          jumping=false;
          jumptimer=0;
      }
      character.draw();
}

frame();

//라운드 끝
function endRound(){

    cancelAnimationFrame(animation);
    let newDiv = document.createElement('div');
    newDiv.setAttribute('id','failRound');
    newDiv.innerHTML ="GAME OVER";
    document.body.appendChild(newDiv);

    let btnDiv = document.createElement('div');
    btnDiv.setAttribute('id','btnDiv');
    document.body.appendChild(btnDiv);

    let mainBtn = document.createElement('button');
    mainBtn.setAttribute('id','goMainBtn');
    mainBtn.innerHTML = "Main";
    mainBtn.addEventListener('click',()=>{
        location.href = "../html/main.html";
    });
     btnDiv.appendChild(mainBtn);

    let retryBtn = document.createElement('button');
    retryBtn.setAttribute('id','retryBtn');
    retryBtn.addEventListener('click',()=>{
        location.href = "../html/round1.html";
    });
    retryBtn.innerHTML = "Retry";
    btnDiv.appendChild(retryBtn);

}



var jumping= false;
//키보드 이벤트
document.addEventListener('keydown',function(e){ //스페이스바로 동작하려면 addEventListener 함수를 이용해야 함
    if(e.code === 'Space'){
        jumping = true; //스페이스가 눌린다면 점프중인 변수를 true로
    }
    else if(e.code =='ArrowDown') { //아래화살표 -> 슬라이딩
        human.src = "../img/round1/slideMan.png"; //키보드 누르면 아래로 가는 이미지 변경
        character.y+=30; //슬라이딩하면 밑으로 가는 것 같은 효과
        setIterval(function(){ //1.5초 후 함수 안에 든 코드 실행함
            human.src = '../img/round1/humanride.png';
            character.y-=30;
    
        },1300); //1.3초 후 원상복구
      }
});

function collison(character,food){
    let x = food.x - (character.x + character.width);
    let y = food.y - (character.y + character.height);
    if(x<0 && y<0){
        ctx.clearRect(0,0, canvas.width, canvas.height);
        cancelAnimationFrame(animation);
    }
}



