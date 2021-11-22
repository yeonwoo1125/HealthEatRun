//캔버스 생성
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var img1 = new Image(); //이미지 컴포넌트임을 명시해준다
img1.src = '../img/round1/humanride.png';

var img2 = new Image(); //이미지 컴포넌트임을 명시해준다
img2.src = '../img/round1/hamburger.png';

function background(assetObj, canvasElement){ //배경 이미지를 표현하는 에셋 인스턴스와 Canvas 요서를 전달받기
   this.assetObj = assetObj;
   this.canvasSize = {width: canvasElement.width , height: canvasElement.height};
   this.canvasContext = canvasElement.getContext("2d"); //canvasElement로부터 렌더링 컨텍스트를 얻음 -> 변수canvasContext에 저장(2d로(2차원))
   this.moveX = 0; //배경이미지의 이동을 처리하기 위하여 원본 이미지에서 이동할 크기를 저장할 변수이다.
}

//실제 애니메이션 처리가 이루어지는 startAnimation 메서드
background.prototype.startAnimation = function(){
    //캔버스를 다 지우면서 시작
    this.canvasContext.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);

    //drawX 변수 = 원본 이미지 크기에서 moveX를 곱한 값(원본 이미지에서 원하는 부분을 자르게 될 X좌표)
    var drawX = this.moveX * this.assetObj.backgroundImage.width;
    
    //drawWidth 변수 = 원본 이미지에서 drawX를 뺀 값(drawX로부터 이미지 나머지 부분)
    var drawWidth = this.assetObj.backgroundImage.width - drawX;

    //첫번째 그리기 작업
    this.canvasContext.drawImage(this.assetObj.backgroundImage, drawX, 0, drawWidth, this.assetObj.background.height, 0,0, drawWidth, this.assetObj.background.height);
    
    //두번째 그리기 작업
    if(drawWidth < this.assetObj.backgroundImage.width){
        //fillDrawWidth 변수에는 비워진 공간의 너비를 계산하여 그 값을 저장하게 됨
        //그리고 비워진 공간의 X좌표에 두번째 그리기 작업을 수행하면 두 개의 그리기 작업이 자연스럽게 연결된다.
        //그리하여 애니메이션 효과가 구현되는 것
        var fillDrawWidth = this.assetObj.backgroundImage.width- drawWidth;
        this.canvasContext.drawImage(this.assetObj.backgroundImage, 0,0, fillDrawWidth, this.assetObj.backgroundImage.height, drawWidth, 0, fillDrawWidth, this.drawWidth, this.assetObj.backgroundImage.height);
    }

    //drawX의 갓을 drawRate만큼 계속 더해가는데, 최대 크기 비율인 1이 될 시점에 다시 0으로 만들어준다
    //이미지가 처음부터 다시 그려지도록
    this.moveX = (this.moveX + this.assetObj.moveRate)%1;
}

var fps = 60; //fps값을 60, 즉 1초에 60번 프레임을 교체하도록 한다
var background;
var canvasElement;
var asset;

function init(){

    canvasElement = document.getElementById("GameCanvas");

    asset = newImage();
    asset.src = '/img/health.jpg';

    asset.onload = onAssetLoadComplete;
}

function onAssetLoadComplete(){
    var assetObj = {backgroundImage: asset, moveRate:0.01}; //drawRate는 이미지의 이동 간격을 나타낸다 0.01의 의미는 프레임이 이동할 때마다 원본 이미지에서 0.01px 이동한다는 의미
    background = new background(assetObj, canvasElement);
    setInterval(animationLoop, 1000/fps);
}

function animationLoop(){
    background.startAnimation();
}

window.addEventListener("load", init, false);

//달리는 캐릭터 
var character = {
    x:500,
    y:300,
    width:80,
    height : 100, 

    //draw 메소드
    draw(){
        ctx.fillStyle = 'green';
        //ctx.fillRect(this.x, this.y, this.width, this.heigth);
        ctx.drawImage(img1, this.x, this.y, this.width, this.height); //drawImage를 이용하여 이미지임을 적어준다
    }
}
//character.draw();

//장애물 
//각각 크기와 위치가 다르므로 아예 class 항목으로 정리한다
class Food{
    constructor(){ 
        //크기는 캐릭터와 동일하지만 위치는 다르게 한다
        this.x = 800; 
        this.y = 550;
        this.width = 70;
        this.height = 70;
    }
    //draw 메소드
    draw(){
        //달리는 캐릭터와 동일하지만 색상은 다르게
        ctx.fillStyle='red';
        //ctx.fillRect(this.x,this.y,this.width,this.height);
        ctx.drawImage(img2, this.x, this.y, this.width, this.height); //drawImage를 이용하여 이미지임을 적어준다
    }
}

var food = new Food();
food.draw();

var timer = 0; //화면마다 움직이는 게 다르니 그것을 방지하기 위해 timer설정
var foodmix=[]; //foodmix 배열
var jumpTime=0; //점프 타이머
var animation; //animation 효과

function frame(){ //프레임마다 실행을 할 함수
    //animation 을 넣어서  requestAnimationFrame(); 를 변수화 시킨다
    animation = requestAnimationFrame(frame); //js의 내장함수(frame을 반복시킨다)
    timer++; 

    ctx.clearRect(0,0, canvas.width, canvas.height); //canvas의 context안에 존재하는 메소드. x,y를 0으로 설정하면 Canvas 전체 영역을 지우는 것이 됨. 즉, 물체가 남지 않고 이동하게

    if(timer%200==0){ //200프레임마다 한번 움직이게 하기
        var food = new Food();
        foodmix.push(food); //foodmix라는 배열에 200 프레임마다 한번씩 food를 푸시.(배열이 점점 차오른다)
    }
    //food.draw(); 대신

    //각각 draw()를 해 주기 위해서 forEach()메소드 사용
    foodmix.forEach((a,i,o)=>{ //forEach에는 두 개의 파라미터 넣기 가능
       if(a.x < (0-a.width)){ //오브젝트의 x값이 o보다 작아져 화면에서 나갔을 때 
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
        character.y-=4; //y가 쭉 올라가게 한다
        jumpTime+=2; //jumpTime도 증가
    }

    if(jump==false){
        if(character.y<500){  //y축의 위치가 일정높이에 다다랐을때
            character.y+=5; //아래로 내려오게(y값을 늘린다)
        }
    }

    if(jumpTime>50){ //jumpTime이 50프레임을 넘긴다면 
        jump=false; //멈추기(y축의 이동을)
        //여기까지만 하면 멈추기만 하고 다시 jump기능이 작동을 안한다
        jumpTime=0; //그래서 jumptime을 초기화했다
    }
    character.draw();
}

frame();

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
})

//충돌체크
function collison(character, food){
    var xCheck = food.x - (character.x + character.width);
    var yCheck = food.y - (character.y + character.height);

    if(xCheck < 0 && yCheck < 0){

        ctx.clearRect(0,0,canvas.width, canvas.height);
        cancelAnimationFrame(animation); 
        //충돌 시 canvas 클리어 및 애니메이션을 종료한다

    };
}
