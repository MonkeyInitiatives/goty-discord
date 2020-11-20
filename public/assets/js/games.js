// Make sure we wait to attach our handlers until the DOM is fully loaded.
if (localStorage.getItem("userHash") === null) {
  localStorage.setItem("userHash", Math.floor((Math.random() * 1000000000) + 1));
  localStorage.setItem("userVotes", 3);
}
var userHash = localStorage.getItem("userHash");
var userVotes = localStorage.getItem("userVotes");

$(document).ready(function () {
  if (userVotes == 3) {
    document.getElementById("myTitle").innerHTML = "Please vote for your #1 Game of the Year"
  }
  if (userVotes == 2) {
    document.getElementById("myTitle").innerHTML = "Please vote for your #2 Game of the Year"
  }
  if (userVotes == 1) {
    document.getElementById("myTitle").innerHTML = "Please vote for your #3 Game of the Year"
  }
  if (userVotes == 0) {
    document.getElementById("myTitle").innerHTML = "Thank you for voting!"
    $("#gameList").empty()
  }
  var now = new Date();
  var fullDaysSinceEpoch = Math.floor(now / 8.64e7);
  // console.log(fullDaysSinceEpoch);
  //18586 is right now, 11/20
  //18611 is 12/15
  //18628 is january 1st
  if (fullDaysSinceEpoch > 18586) {
    document.getElementById("myTitle").innerHTML = "Thank you for voting!"
    $("#gameList").empty()
  }
  if (fullDaysSinceEpoch > 18628) {
    window.location.href = "/winners"
  }
});

$(function () {
  $(".change-vote").on("click", function (event) {
    var id = $(this).data("id");
    if (userVotes > 0) {
      userVotes--;
      let offset = 0;
      if (userVotes == 2) {
        offset = 4
      }
      if (userVotes == 1) {
        offset = 2
      }
      localStorage.setItem("userVotes", userVotes);
      $.ajax("/api/games/" + id, {
        type: "PUT",
        data: {
          votes: 1 + offset
        }
      }).then(
        function () {
          console.log("added a vote");
          $.ajax("/api/users/" + userHash, {
            type: "PUT",
            data: {
              userVotes: userVotes
            }
          }).then(
            function () {
              location.reload();
            }
          );
        }
      );
    }
  });
});
