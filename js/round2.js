//카드 클래스를 가진 엘리먼트 모두 가져오기
const card = document.querySelectorAll(".card");

var score=0; //짝을 맞춘 갯수
var selCnt = 0; //현재 뒤집힌 카드 갯수
var clickCnt = 0; //카드 총선택 횟수
var cardLen = card.length; //카드의 수
var clickId; //클릭한 카드의 아이디값을 가져옴
var clickList =['','']; //클릭한 아이디 두개 저장
var foodList=['salad1','steak1','shake1','oatmeal1','chickenBreast1','tofu1','milk1', 
            'salad2','steak2','shake2','oatmeal2','chickenBreast2','tofu2','milk2']; //음식 이름 저장
var ranArr = new Array(); //랜덤 수 

ran(); //랜덤 수 중복 제거 후 저장
setId();  //div 요소에 id 생성
setImg();

for(var i =0; i<cardLen; i++){
    card[i].addEventListener("click",()=>{ //card 클래스를 가진 div에 클릭 이벤트 부여
        
        selCnt++;
        alert('카드 클릭');
        if(selCnt == 1) clickList[0] = clickId; //클릭한 카드의 아이디를 배열에 저장
        else if(selCnt == 2) clickList[1] = clickId;

        if(selCnt == 2 && clickList[0] == clickList[1]){
            reset();
            alert("짝 맞춤");
        } 
        else if(selCnt==2){
            reset();
            alert("짝 아님");
        } 
    });
};
//값들 초기화
function reset(){
    selCnt=0;
    clickList[0] ='';
    clickList[1] ='';
};
function sendId(click_id){
    console.log(click_id);
    clickId = click_id.slice(0,-1);

}

//div에 아이디 부여
function setId(){
    for(var i=0; i<14; i++){
        var ran = ranArr[i];
        card[i].setAttribute('id', foodList[ran]);
    }
};

//랜덤 수 중복제거
function ran(){
    var tmp;
    var n;
   
    //전달받은 매개변수 n만큼 배열 생성 ( 1~n )
    for(var i=0; i<14; i++){
        ranArr.push(i);
    }

    //값을 서로 섞기
    for(var i=0; i< ranArr.length ; i++){
        n = Math.floor(Math.random() *14); //난수발생
        tmp = ranArr[i];
        ranArr[i] = ranArr[n];
        ranArr[n] = tmp;
    }
};

//id에 맞는 이미지 부여하기
function setImg(){
    //div의 id를 가져와서 if문으로 이미지 주기
    document.getElementById('salad1').style.background = "url('../img/round2/salad.png') no-repeat center center";
    document.getElementById('salad1').style.backgroundSize = "230px 230px";
    document.getElementById('salad2').style.background = "url('../img/round2/salad.png') no-repeat center center";
    document.getElementById('salad2').style.backgroundSize = "230px 230px";

    document.getElementById('steak1').style.background = "url('../img/round2/steak.png') no-repeat center center";
    document.getElementById('steak2').style.background = "url('../img/round2/steak.png') no-repeat center center";

    document.getElementById('oatmeal1').style.background = "url('../img/round2/oatmeal.png') no-repeat center center";
    document.getElementById('oatmeal2').style.background = "url('../img/round2/oatmeal.png') no-repeat center center";

    document.getElementById('tofu1').style.background = "url('../img/round2/tofu.png') no-repeat center center";
    document.getElementById('tofu2').style.background = "url('../img/round2/tofu.png') no-repeat center center";

    document.getElementById('milk1').style.background = "url('../img/round2/milk.png') no-repeat center center";
    document.getElementById('milk1').style.backgroundSize = "200px 230px";
    document.getElementById('milk2').style.background = "url('../img/round2/milk.png') no-repeat center center";
    document.getElementById('milk2').style.backgroundSize = "200px 230px";

    document.getElementById('chickenBreast1').style.background = "url('../img/round2/chikenBreast.png') no-repeat center center";
    document.getElementById('chickenBreast1').style.backgroundSize = "200px 100px";
    document.getElementById('chickenBreast2').style.background = "url('../img/round2/chikenBreast.png') no-repeat center center";
    document.getElementById('chickenBreast2').style.backgroundSize = "200px 100px";

    document.getElementById('shake1').style.background = "url('../img/round2/shake.png') no-repeat center center";
    document.getElementById('shake1').style.backgroundSize = "100px 200px";
    document.getElementById('shake2').style.background = "url('../img/round2/shake.png') no-repeat center center";
    document.getElementById('shake2').style.backgroundSize = "100px 200px";
};