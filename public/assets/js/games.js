if (localStorage.getItem("userHash") === null) {
  localStorage.setItem("userHash", Math.floor((Math.random() * 1000000000) + 1));
  localStorage.setItem("userVotes", 3);
}
const userHash = localStorage.getItem("userHash");
let userVotes = localStorage.getItem("userVotes");

$(document).ready(function () {
  if (userVotes == 3) {
    document.getElementById("message").innerHTML = "Please vote for your #1 Game of the Year"
  }
  if (userVotes == 2) {
    document.getElementById("message").innerHTML = "Please vote for your #2 Game of the Year"
  }
  if (userVotes == 1) {
    document.getElementById("message").innerHTML = "Please vote for your #3 Game of the Year"
  }
  if (userVotes == 0) {
    document.getElementById("message").innerHTML = "Thank you for voting!"
    $(".container").empty()
    document.body.style.backgroundImage = "url('assets/imgs/flavortown.jpg')";
  }
  const now = new Date();
  const fullDaysSinceEpoch = Math.floor(now / 8.64e7);
  //18586 is right now, 11/20
  //18611 is 12/15
  //18628 is january 1st
  if (fullDaysSinceEpoch > 18611) {
    document.getElementById("message").innerHTML = "Thank you for voting!"
    $(".container").empty()
    document.body.style.backgroundImage = "url('assets/imgs/flavortown.jpg')";
  }
  if (fullDaysSinceEpoch > 18616) {
    window.location.href = "/winners"
  }
});

$(function () {
  $(".change-vote").on("click", function (event) {
    let id = $(this).data("id");
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
