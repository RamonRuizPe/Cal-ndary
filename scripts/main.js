
const btnEdit = document.querySelectorAll(".btn-contact");
      btnEdit.forEach((btn) => {
        btn.addEventListener("click", async (e) => {

          document.getElementById("message").scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
          document.getElementById("name").focus({
            preventScroll: true
        });
    });
});

var cleave = new Cleave('#phone', {
  phone: true,
  phoneRegionCode: 'MX'
});

window.addEventListener('scroll', this.handleScroll, true);

handleScroll = (e) => {
  if (e.target.classList.contains("on-scrollbar") === false) {
      e.target.classList.add("on-scrollbar");
  }
}