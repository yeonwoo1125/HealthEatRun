

//일단 class를 가져와서 card를 누를 때마다 뒤집히는 모션!
//id가 동일하면 점수 올리고, 뒤집은 상태 그대로 두기
//id가 다르면 다시 원상복귀, 몇번 이상 틀리면 라운드 실패

var score=0; //짝을 맞춘 갯수
var selCnt = 0; //현재 뒤집힌 카드 갯수
var clickCnt = 0; //카드 선택 횟수
var selCard = new Array(false,false);

 //무식하게 하기 1 - 아이디 다 가져와서 온클릭 하나하나 넣기
 // div 클릭시 selcnt++하고 만약 2가 되면 아이디 체크해서 동일하면 오케이~ 아니면 다시 뒤집어~
// if문 함수로 만들기(두개 정도? 리턴 받으면 될듯)
const salad1 = document.getElementById('salad1');
const salad2 = document.getElementById('salad2');
salad1.addEventListener('click',()=>{
    alert("1카드");
    selCnt++;
    if(selCard[0] == true) selCard[1] = true;
    else selCard[0] = true;

    if(selCnt==2 || selCard[0] == true && selCard[1] == true){
        alert("짝 맞춤");
        selCnt=0;
        selCard[0] = false;
        selCard[1] = false;
    }
});
salad2.addEventListener('click',()=>{
    alert("2카드");
    selCnt++;
    if(selCard[0] == true) selCard[1] = true;
    else selCard[0] = true;

    if(selCnt==2 || selCard[0] == true && selCard[1] == true){
        alert("짝 맞춤");
        selCnt=0;
        selCard[0] = false;
        selCard[1] = false;
    }
});

