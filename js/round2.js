//카드 클래스를 가진 엘리먼트 모두 가져오기
const card = document.querySelectorAll(".card");

var score = 0; //짝을 맞춘 갯수
var selCnt = 0; //현재 뒤집힌 카드 갯수
var clickCnt = 0; //카드 총선택 횟수
var cardLen = card.length; //카드의 수
var clickId; //클릭한 카드의 아이디값을 가져옴
var clickList = ['','']; //클릭한 아이디 두개 저장
var foodList = ['salad1','steak1','shake1','oatmeal1','chickenBreast1','tofu1','milk1', 
            'salad2','steak2','shake2','oatmeal2','chickenBreast2','tofu2','milk2']; //음식 이름 저장
var ranArr = new Array(); //랜덤 수 
var chk = new Array(); //가져온 아이디를 2개 저장

//createDiv();
setId();
for(var i = 0; i < cardLen; i++){
    card[i].addEventListener("click",()=>{ //card 클래스를 가진 div에 클릭 이벤트 부여
        nextRound();
        endRound();

        selCnt++;

        if(selCnt == 1) {
            clickList[0] = clickId; //클릭한 카드의 아이디를 배열에 저장
        }
        else if(selCnt == 2) {
            clickList[1] = clickId;
        }

        if(selCnt == 2 && clickList[0] == clickList[1]){
            score++;
            //createNextBtn();
            reset();
            document.getElementById(chk[0]).style.backgroundColor = '#D12F2C';
            document.getElementById(chk[1]).style.backgroundColor = '#D12F2C';
            chk.splice(0,2);
            nextRound();
        } 
        else if(selCnt == 2){
            clickCnt++;
            reset();
            setTimeout(function(){
                document.getElementById(chk[0]).style.background = "url('')";
                document.getElementById(chk[1]).style.background = "url('')";
                document.getElementById(chk[0]).style.backgroundColor = '#734434';
                document.getElementById(chk[1]).style.backgroundColor = '#734434';
                chk.splice(0,2);
            },1000);
        } 
    });
};

//게임이 끝난 후 다음 라운드로 이동
function nextRound(){
    if(score == 7){
        var newDiv = document.createElement('div');
        newDiv.setAttribute('id','completeRound');
        newDiv.innerHTML ="GO NEXT ROUND!";

        document.body.appendChild(newDiv);

        setTimeout(function(){ //2초 후 페이지 이동
            location.href = "../html/round3.html";
        } ,2000);
    }
};

//게임 실패 후 띄워지는 버튼
function endRound(){
    if(clickCnt == 20){
        var newDiv = document.createElement('div');
        newDiv.setAttribute('id','failRound');
        newDiv.innerHTML ="GAME OVER";
        document.body.appendChild(newDiv);

        var btnDiv = document.createElement('div');
        btnDiv.setAttribute('id','btnDiv');
        document.body.appendChild(btnDiv);

        var mainBtn = document.createElement('button');
        mainBtn.setAttribute('id','goMainBtn');
        mainBtn.innerHTML = "Main";
        mainBtn.addEventListener('click',()=>{
            location.href = "../html/main.html";
        });
        btnDiv.appendChild(mainBtn);

        var retryBtn = document.createElement('button');
        retryBtn.setAttribute('id','retryBtn');
        retryBtn.addEventListener('click',()=>{
            location.href = "../html/round1.html";
        });
        retryBtn.innerHTML = "Retry";
        btnDiv.appendChild(retryBtn);

    }
}

//카드에 아이디 부여
function setId(){
    ran();
    for(var i=0; i<14; i++){
        card[i].setAttribute('id',foodList[ranArr[i]]);
    }
}
//값들 초기화
function reset(){
    selCnt = 0;
    clickList[0] ='';
    clickList[1] ='';
};

function clickCard(click_id){
    chk.push(click_id);
    clickId = click_id.slice(0,-1);

    //document.getElementById(click_id).style.background = `url('../img/round2/'${clickId}'.png') no-repeat center center`;
   
    if(click_id =="salad1"){
        document.getElementById('salad1').style.background = "url('../img/round2/salad.png') no-repeat center center";
        document.getElementById('salad1').style.backgroundSize = "230px 230px";
    }
    else if(click_id =="salad2"){
        document.getElementById('salad2').style.background = "url('../img/round2/salad.png') no-repeat center center";
        document.getElementById('salad2').style.backgroundSize = "230px 230px";
    }
    else if(click_id =="steak1"){
        document.getElementById('steak1').style.background = "url('../img/round2/steak.png') no-repeat center center";
    }
    else if(click_id =="steak2"){
        document.getElementById('steak2').style.background = "url('../img/round2/steak.png') no-repeat center center";
    }
    else if(click_id =="oatmeal1"){
        document.getElementById('oatmeal1').style.background = "url('../img/round2/oatmeal.png') no-repeat center center";
    }
    else if(click_id =="oatmeal2"){
        document.getElementById('oatmeal2').style.background = "url('../img/round2/oatmeal.png') no-repeat center center";
    }
    else if(click_id =="tofu1"){
        document.getElementById('tofu1').style.background = "url('../img/round2/tofu.png') no-repeat center center";
    }
    else if(click_id =="tofu2"){
        document.getElementById('tofu2').style.background = "url('../img/round2/tofu.png') no-repeat center center";
    }
    else if(click_id =="milk1"){
        document.getElementById('milk1').style.background = "url('../img/round2/milk.png') no-repeat center center";
        document.getElementById('milk1').style.backgroundSize = "200px 230px";
    }
    else if(click_id =="milk2"){
        document.getElementById('milk2').style.background = "url('../img/round2/milk.png') no-repeat center center";
        document.getElementById('milk2').style.backgroundSize = "200px 230px";
    }
    else if(click_id == "chickenBreast1"){
        document.getElementById('chickenBreast1').style.background = "url('../img/round2/chikenBreast.png') no-repeat center center";
        document.getElementById('chickenBreast1').style.backgroundSize = "200px 100px";
    }
    else if(click_id == "chickenBreast2"){
        document.getElementById('chickenBreast2').style.background = "url('../img/round2/chikenBreast.png') no-repeat center center";
        document.getElementById('chickenBreast2').style.backgroundSize = "200px 100px";
    }
    else if(click_id == "shake1"){
        document.getElementById('shake1').style.background = "url('../img/round2/shake.png') no-repeat center center";
        document.getElementById('shake1').style.backgroundSize = "100px 200px";
    }
    else if(click_id == "shake2"){
        document.getElementById('shake2').style.background = "url('../img/round2/shake.png') no-repeat center center";
        document.getElementById('shake2').style.backgroundSize = "100px 200px";
    } 
};

// function createDiv(){
//     var cardDiv = document.getElementById('card_div');
//     ran();
//     for(var i=0; i<14; i++){
//         var newDiv = document.createElement('div');
//         newDiv.setAttribute('class','card');
//         newDiv.setAttribute('id',foodList[ranArr[i]]);
//         newDiv.onclick = clickCard;
//         //console.log(newDiv, clickCardFunc);
        
//         cardDiv.appendChild(newDiv);
//     }
// }

//카드 선택 시 이미지 나타남

//랜덤 수 중복제거
function ran(){
    var tmp;
    var n;
   
    //전달받은 매개변수 n만큼 배열  
    for(var i=0; i<14; i++){
        ranArr.push(i);
    }

    //값을 서로 섞기
    for(var i=0; i< ranArr.length ; i++){
        n = Math.floor(Math.random() *14); 
        tmp = ranArr[i];
        ranArr[i] = ranArr[n];
        ranArr[n] = tmp; 
    }
};
 