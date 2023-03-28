import "../css/styles.css";

document.addEventListener("DOMContentLoaded", function () {
  if (this.querySelector("#kc-social-providers")) {
    this.querySelector("#kc-social-providers hr").remove();
    const e = this.querySelector("#kc-social-providers h4"),
      t = this.createElement("div");
    t.classList.add("custom-divider"),
      (t.innerText = e.innerText),
      this.getElementById("kc-social-providers").insertBefore(
        t,
        this.getElementsByTagName("ul")[0]
      ),
      this.querySelector("#kc-social-providers h4").remove();
  }
});
