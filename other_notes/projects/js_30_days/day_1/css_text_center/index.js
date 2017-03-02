
(function() {
  var toggle = true, content = document.getElementById("content");
  setInterval(function() {
    if (toggle) {
      content.innerHTML = "Line 1";
    } else {
      content.innerHTML = "<div>Line 1</div><div>Line 2</div>";
    }
    toggle = !toggle;
  }, 1300);
}());




