var postIssue = document.getElementById('postissue');

var userName;
var password;

postIssue.addEventListener('click', function() {
  userName = document.getElementById('username').value;
  password = document.getElementById('password').value;
  sendUserNamePassWord();
});

function sendUserNamePassWord(){

  var requestOnPost = new XMLHttpRequest();
  requestOnPost.onreadystatechange = function() {
    if (requestOnPost.readyState === 4 && requestOnPost.status == 200) {

    }
  }
  requestOnPost.open("GET", "/username/" +userName+ "/" +password, true);
  requestOnPost.send();

}
