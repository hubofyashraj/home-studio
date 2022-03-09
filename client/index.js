const main = document.getElementsByClassName('list')[0];
const body = document.getElementsByTagName('body')[0];
const item = document.getElementsByClassName('content');
var bodyStyle = getComputedStyle(body)
var mainStyle = getComputedStyle(main)
var video = document.getElementById("now-playing");
var playtitle = document.getElementsByClassName('title')[0];
var episode = document.getElementsByClassName('episode')[0];
var name = "";
function gridup(){
    var wid = parseInt((main.clientWidth - 2*(parseFloat(bodyStyle.paddingLeft) + parseFloat(mainStyle.paddingLeft)))/item[0].offsetWidth) ;
    // console.log(wid)
    main.style.gridTemplateColumns = `repeat(${wid}, 1fr)`;
    // console.log(wid, main.style.gridTemplateColumns)

}

window.addEventListener('resize', gridup)

function init(){
    postMessage()
}

gridup();


var close = document.getElementById("close");
close.addEventListener("click", function(){
    var player = document.getElementsByClassName("player")[0];
    video.setAttribute("src","")
    player.style.display="none"
    gridup();
})

var list = document.getElementsByClassName("onhoverplay");

for (let i = 0; i < list.length; i++) {
    var btn = list[i];
    btn.addEventListener("click",function (){
        playtitle.innerText=btn.parentElement.firstElementChild.innerText;
        name = btn.parentElement.parentElement.firstElementChild.value;

        $.ajax({
            url: `/play?play=${name}`,
            type: "GET",
            dataType: 'json',
            success: [
                function (result){
                    if(result.exist==true){
                        const count = result.count;
                        const nowPlaying = episode.innerText.split('Episode ')[1];

                        let next = document.getElementById('list');
                        while (next.firstChild) {
                            next.removeChild(next.firstChild);
                        }
                        for(let i=1; i<count+1; i++){
                            let btn1 = document.createElement('button');
                            btn1.innerText=i;
                            if(i==nowPlaying){
                                btn1.setAttribute('class','btn next-btns selected');
                            }else{
                                btn1.setAttribute('class','btn next-btns');
                            }
                            next.appendChild(btn1);
                        }
                    }

                }
            ]
        })

        var player = document.getElementsByClassName("player")[0];
        player.style.display="block"
        gridup();
    })
}

function play(num){

}

var next = document.getElementsByClassName("next-btns");

for (let i = 0; i < next.length; i++) {
    var nextbtn = list[i];
    nextbtn.addEventListener("click",function (){
        var num = nextbtn.innerText;

    })
}