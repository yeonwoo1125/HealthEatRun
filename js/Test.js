var disc = document.createElement('div');
disc.setAttribute('id','disc');
document.body.appendChild(disc);

const background = new Audio('../music/MP_Waterfall.mp3'); //배경 음악
background.volume = 0.1;
let start = false;

let bottom = document.createElement('div')
bottom.setAttribute('id','bottom');
document.body.appendChild(bottom);

//캔버스 생성
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

//캐릭터 이미지 1 
const img1 = new Image(); //이미지 컴포넌트임을 명시해준다
img1.src = '../img/round1/humanride.png';

//햄버거 이미지
const img2 = new Image(); //이미지 컴포넌트임을 명시해준다
img2.src = '../img/round1/hamburger.png';

//감자튀김 이미지
const img3 = new Image(); //이미지 컴포넌트임을 명시해준다
img3.src = '../img/round1/M.png';
 
//캐릭터 이미지 2
const img4 = new Image();
img4.src = '../img/round1/humanride2.png';

//아이스크림 이미지
const img5 = new Image();
img5.src = '../img/round1/icecream.png';

const bottomFoodList = new Array(img2,img3); //장애물 음식이 여러개
const topFoodList = new Array(img5); //여기서 위에 생성될 장애물 이미지 객체 넣어주기
const runcharacter = new Array(img1,img4); //캐릭터가 달리는 모습을 구현하기 위함

/*
//하트(체력) 구현을 위함
const heart = new Image();
heart.src = "../img/round1/heart.png";
//var heartnum = 3;
*/
let score = 0;

/*var num =3;

$("#S").click(function(){
next();
});

function next(){
    if(num==0){
      $(".S1").hide();
      $(".S2").hide();
      $(".S3").hide();
      $(".S").hide();
    }else{
        $(".S"+num).show();
        num--;
    }
}
*/



function ready(){
    disc.remove();
    document.body.appendChild(canvas);
    start= true;

    background.play();
    progressBar();
    heartBar(); //체력바
    frame();

}

var character = {

    x:500,
    y:300,
    width:80,
    height : 100,
    //run = runcharacter[Math.floor(Math.random()*2)],
    //draw 메소드
    draw(){
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x,this.y,this.width,this.height);
        ctx.drawImage(img1, this.x, this.y, this.width, this.height); //drawImage를 이용하여 이미지임을 적어준다

    }
}


var characterhitbox={
    x:500,
    y:300,
    width:30,
    height:30,
}



//character.draw();
//장애물 
//각각 크기와 위치가 다르므로 아예 class 항목으로 정리한다
class bottomFood{
    constructor(){ 
        //크기는 캐릭터와 동일하지만 위치는 다르게 한다
        this.x = 800; 
        this.y = 550;
        this.width = 70;
        this.height = 70;
        this.bottomFood = bottomFoodList[Math.floor(Math.random()*2)];
    }

    //draw 메소드
    draw(){
        //달리는 캐릭터와 동일하지만 색상은 다르게
        ctx.fillStyle='red';
        ctx.fillRect(this.x,this.y,this.width,this.height);
        ctx.drawImage(this.bottomFood, this.x, this.y, this.width, this.height); //drawImage를 이용하여 이미지임을 적어준다
    }

}

class topFood{
    constructor(){ 
        //크기는 캐릭터와 동일하지만 위치는 다르게 한다
        this.x2 = 850;
        this.y2 = 500;
        this.width2 = 90;
        this.height2 = 70;
        this.topFood = topFoodList[Math.floor(Math.random()*1)]; //이미지 객체 수에 따른 랜덤값 넣어주기(이미지가 3개면 n은 3)
    }

    //draw 메소드
    draw(){
        //달리는 캐릭터와 동일하지만 색상은 다르게
        //ctx.fillStyle='red';
        //ctx.fillRect(this.x,this.y,this.width,this.height);
        ctx.drawImage(this.topFood, this.x2, this.y2, this.width2, this.height2);
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

var Foodhitbox={
    x:500,
    y:300,
    width:20,
    height:20,
}

// var food = new Food();
// food.draw();

class Heart{
    constructor(){ 
        //크기는 캐릭터와 동일하지만 위치는 다르게 한다
        this.x = 400; 
        this.y = 300;
        this.width = 40;
        this.height = 40;
    }

    //draw 메소드
    /*draw(){
       for( var i= 0; i<3; i++){
        ctx.drawImage(heart,this.x2, this.y2, this.width, this.height);
       }
    }*/
}


var timer = 0; //화면마다 움직이는 게 다르니 그것을 방지하기 위해 timer설정
var foodmix=[]; //foodmix 배열
var jumpTime=0; //점프 타이머
var animation; //animation 효과
var progressWidth =0;
var heartWidth=0; //체력바

//진행바
const progress = document.createElement('progress')
function progressBar(){
    progress.setAttribute('id','progress');
    progress.setAttribute('Max',100);
    progress.setAttribute('value',0);
    document.body.appendChild(progress);
}

//체력바
const heart = document.createElement('heart')
function heartBar(){
    heart.setAttribute('id','progress');
    heart.setAttribute('Max',100);
    heart.setAttribute('value',0);
    document.body.appendChild(heart);
}

function frame(){ //프레임마다 실행을 할 함수

    //animation 을 넣어서  requestAnimationFrame(); 를 변수화 시킨다
    animation = requestAnimationFrame(frame); //js의 내장함수(frame을 반복시킨다)
    timer++; 

    if(timer%100===0) progressWidth +=4;
    if(progressWidth <=100) progress.setAttribute('value',progressWidth);
    else endRound();
    
    
    //체력바
    if(timer%100===0) heartWidth +=4;
    if(heartWidth <=100) heart.setAttribute('value',heartWidth);
    else endRound();
    

    if(timer % 100 === 0) score+=1; //100프레임마다 1점씩 추가
    ctx.clearRect(0,0, canvas.width, canvas.height); //canvas의 context안에 존재하는 메소드. x,y를 0으로 설정하면 Canvas 전체 영역을 지우는 것이 됨. 즉, 물체가 남지 않고 이동하게
    if(timer%200==0){ //200프레임마다 한번 움직이게 
        let chk = Math.floor(Math.random()*2);
        let food;
        //console.log(chk)
        if(chk==0){
            food = new bottomFood();
        }else if(chk == 1){
            food = new topFood();
        }
        foodmix.push(food); //foodmix라는 배열에 200 프레임마다 한번씩 food를 푸시.(배열이 점점 차오른다)
    }

    //각각 draw()를 해 주기 위해서 forEach()메소드 사용
    foodmix.forEach((a,i,o)=>{ //forEach에는 두 개의 파라미터 넣기 가능
        if(a.x < (0-a.width) &&  a.x1 < (0-a.width1)){ //오브젝트의 x값이 o보다 작아져 화면에서 나갔을 때 
           o.splice(i,1); //배열에서 (i,1)를 사라지게
           //a.x<0은 장애물의 왼쪽 위 꼭짓점이 x축을 기준으로 하기 때문에 화면밖에 닿을 때 사라진다 
           //따라서 0-a.width로 바꾼다(화면 밖에 완전히 다 나가게 하기 위해서)
        }  
         a.x--;
         collison(character,a); //캐릭터와 모든 장애물들 간에 충돌체크를 해야하므로 foreach 안에 넣기
         a.draw(); 
    });

    //character.y-=2; 를
    if(jump==true){ //jump값이 true가 된다면(space를 누른다면)
        character.y-=3; //y가 쭉 올라가게 한다
        jumpTime+=2; //jumpTime도 증가
    }
    if(jump==false){
        if(character.y<500){  //y축의 위치가 일정높이에 다다랐을때
            character.y+=2; //아래로 내려오게(y값을 늘린다)
        }
    }
    if(jumpTime>100){ //jumpTime이 50프레임을 넘긴다면 
        jump=false; //멈추기(y축의 이동을)
        //여기까지만 하면 멈추기만 하고 다시 jump기능이 작동을 안한다
        jumpTime=0; //그래서 jumptime을 초기화했다
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

//라운드를 클리어 한다면
function clearRound(){

    cancelAnimationFrame(animation);
    let newDiv = document.createElement('div');
    newDiv.setAttribute('id','ClearRound');
    newDiv.innerHTML ="! GAME CLEAR !";
    document.body.appendChild(newDiv);

    let btnDiv = document.createElement('div');
    btnDiv.setAttribute('id','btnDiv');
    document.body.appendChild(btnDiv);

}
//character를 점프시키려면 y축의 위치를 바꾸어야 한다. 
//현재의 위치보다 올리는 것이므로 값은 - 로 가야한다
//1초에 60번 2를 빼주는 것 따라서
//character.y-=2;
var jump = false; //여기에 false로 선언
document.addEventListener('keydown', function(e){ //키를 누를 때(kewdown)
   if(e.code == 'Space'){
    //여기서는 character.y-2를 할 수가 없음
    //그러니 swich 하는 변수를 전역으로 
    jump=true; //space를 누르면 true로
   }
   else if(e.code =='ArrowDown') { //아래화살표 -> 슬라이딩
    img1.src = "../img/round1/slideMan.png"; //키보드 누르면 아래로 가는 이미지 변경
    character.y+=30; //슬라이딩하면 밑으로 가는 것 같은 효과
    setIterval(function(){ //1.5초 후 함수 안에 든 코드 실행함
        img1.src = '../img/round1/humanride.png';
        character.y-=30;

    },1300); //1.3초 후 원상복구
}
});

//충돌 체크
function collison(characterhitbox, food){
    if(food.y>= characterhitbox.y && ((food.x>=characterhitbox.x && food.x<=characterhitbox.x+characterhitbox.width) 
    && (food.x+food.width >=characterhitbox.x && food.x+food.width <= characterhitbox.x+characterhitbox.width)) ){
        console.log("충돌잘됨")
        endRound();
        ctx.clearRect(0,0,canvas.width, canvas.height);
        cancelAnimationFrame(animation); 
        localStorage.setItem("score",score); //디비에 score값을 저장함
        //충돌 시 canvas 클리어 및 애니메이션을 종료한다
    };
}
