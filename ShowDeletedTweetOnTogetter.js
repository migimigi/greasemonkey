// ==UserScript==
// @name       Show deleted tweet on togetter.
// @namespace  https://github.com/migimigi/greasemonkey
// @version    0.1
// @description  enter something useful
// @match      http://togetter.com/li/*
// @copyright  2014+, migimigi
// ==/UserScript==

function showTweet(targetItem){
  var url = targetItem.find("a").attr("href");
  getTweet(url, function(data){
    targetItem.text(data.text);
  })
}

function getTweet(url, callback){
  GM_xmlhttpRequest({
    method: "GET",
    url: url,
    onload: function(response){
      var responseHTML = new DOMParser().parseFromString(response.responseText, "text/html");
      callback({
        text: responseHTML.querySelector(".tweet-text").innerText
      });
    }
  });
}

var deletedTweets = $(".list_box:has(.del_box a)");
deletedTweets.each(function(){
  showTweet($(this));
});
