//html에서 선언한 아이디 가지고 와서 사용할 때 사용
const buy_btn = document.getElementById("buy_btn");
const item = document.getElementById("item");

var pocket_money=200;
var sel_food=100;

//버튼 클릭시 해야할 일 여기서 구현
buy_btn.addEventListener("click",()=>{
    //예를 들어 버튼 클릭 후 돈계산을 해야한다면 현재 내가 가진 돈과 가격을 비교!
    //아마 디비에서 내 돈 불러와서 계산해야하니까 그 부분 빼고! 

    if(sel_food>pocket_money) alert("구매 불가능");
    else {
        alert("구매 성공");
        pocket_money-=sel_food;
    }
    //이런 느낌이지만 sel_food 같은 경우도 목록들 누르면 돈이 +되어야 하니까 그것도 온클릭 해줘야 함 
    //pocket_money는 현재 내가 가진돈! 이게 디비에서 끌고 올거
    //이건 진짜 간단한 예시ㅠㅠ
});

//이런식으로 박스 누르면 최종 가격에 추가되도록 할 수 있음! addEventListener 좀 공부하면 좋을 것 같아 나도 모르거든..
item.addEventListener("click",()=>{
    sel_food+=30;
})



