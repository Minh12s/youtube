document.addEventListener("DOMContentLoaded", function(event) {
    var inputSearch = document.getElementById("keyword");
    inputSearch.onkeydown = function(event){
        if (event.keyCode ==13){
            loadVideo(this.value);
        }
    }
    loadVideo("Đen vâu");
});


var modal = document.getElementById('myModal');


var videoFrame = document.getElementsByClassName("close")[0];

var videoFrame = document.getElementById("video-frame");


span.onclick = function() {
    closeVideo();
}


window.onclick = function(event) {
    if (event.target == modal) {
        closeVideo();
    }
}

function loadVideo(keyword){
    var YOUTUBE_API = "https://content.googleapis.com/youtube/v3/search?q" + keyword +
    "&type=video&maxResults=9&part=snippet&key=AIzaSyAwUjk3CwtXCiB_W6Xi0colfOKPgm90hHc";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", YOUTUBE_API, true);
    xhr.onreadystatechange = function(){
        if(this.readyState == 4 && this.status ==200){
        
        var responseJson = Json.parse(this.responseText);
        var htmlContent = "";

        for (var i = 0; i < responseJson.items.length; i++){
            if(responseJson.items[i].id.kind == 'youtube#channel'){
                continue;
            }
            var videoId = responseJson.items[i].videoId;
            var videoTitle = responseJson.items[i].snippet.title;
            var videoDescription = responseJson.items[i].snippet.description;
            var videoThumnail = responseJson.items[i].snippet.thumnails.medium.url;
            htmlContent +='<div class="video" onclick="showVideo"(\'' + videoId + '\')">'
            htmlContent +='<img src="' + videoThumnail + '">'
            htmlContent +='<div class="title">' + videoTitle + '</div>'
            htmlContent +='</div>'        
        }

        document.getElementById("list-video").innerHTML = htmlContent;
    } else if(this.readyState == 4){
        console.log("Fails");
    }
};
xhr.send();
}

function closeVideo(){
    modal.style.display = "none";
    videoFrame.src = "";
}

function showVideo(videoId) {
    videoFrame.src = "https://www.youtube.com/embed" + videoId + "?autoplay=1";
    setTimeout(function(){
        modal.style.display = "block";
    },300);
}