const foodList = ['salad1','steak1','shake1','oatmeal1','chickenBreast1','tofu1','milk1', 
            'salad2','steak2','shake2','oatmeal2','chickenBreast2','tofu2','milk2']; //음식 아이디 저장
let clickCount = 0; //클릭한 횟수 체크
let clickId; //클릭한 아이디
let clickIdList = new Array(); //클릭한 아이디를 담아둠
let score = 0; //카드를 맞출 때마다 ++

//card div 생성
function createDiv(){
    shuffle(foodList);
    let card_div = document.createElement('div');
    card_div.setAttribute('id','card_div');
    document.body.appendChild(card_div);

    for(let i=0;i<14; i++){
        let newDiv = document.createElement('div');
        newDiv.setAttribute('class','card');
        newDiv.setAttribute('id',foodList[i]);
        card_div.appendChild(newDiv);
    }

    let bottom = document.createElement('div');
    bottom.setAttribute('id','bottom');
    document.body.appendChild(bottom);

    clickEvent();
}

//아이디 클릭이벤트
function clickEvent(){
    let card = document.querySelectorAll('.card');
    
    for(let i=0; i<14; i++){
        card[i].addEventListener('click',(e)=>{
            clickCount++;
            nextRound();
            endRound();

            clickId = card[i].id;
            document.getElementById(clickId).style.backgroundColor ="blue";

            clickIdList.push(clickId);
            let timer;
            if(clickCount % 2 === 0){ //카드를 두개 선택한 경우
               // if(clickIdList[0] === clickIdList[1]){ //똑같은 카드를 두번 누를 시
                  //  clickCount--;
                  //  console.log(clickCount);
                //}
                
                 if(clickIdList[0].slice(0, -1) === clickIdList[1].slice(0, -1)){ //아이디는 맨끝 글자에 숫자가 붙고 앞은 같음.
                    score++;
                    document.getElementById(clickIdList[0]).style.backgroundColor="#D12F2C";
                    document.getElementById(clickIdList[1]).style.backgroundColor="#D12F2C";
                }
                clickIdList.splice(0);
            }
            else { //카드를 한개 선택한 경우
                timer = setInterval(function(){
                    document.getElementById(clickId).style.backgroundColor ="#734434";
                },3000);
            }
        });
    }
}

//배열 요소를 섞음 - foodList
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
}

function endRound(){
    if(clickCount == 20){
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
}

//게임이 끝난 후 다음 라운드로 이동
function nextRound(){
    if(score == 7){
        let newDiv = document.createElement('div');
        newDiv.setAttribute('id','completeRound');
        newDiv.innerHTML ="GO NEXT ROUND!";

        document.body.appendChild(newDiv);

        setTimeout(function(){ //2초 후 페이지 이동
            location.href = "../html/round3.html";
        } ,2000);
    }
};

function main(){
    createDiv();
}

main();