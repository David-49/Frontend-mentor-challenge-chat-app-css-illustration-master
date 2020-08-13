window.onload = function () {
  const temps = ["500", "1000", "1500", "2000", "2500", "3000", "3500", "4000"];

  for (let i = 1; i <= 8; i++) {
    setTimeout(function () {
      document.getElementById("msg-" + i).style.opacity = 1;
      document
        .getElementById("msg-" + i)
        .classList.toggle("transition-opacity");
    }, temps[i - 1]);
    console.log(temps[i - 1]);
  }
};
