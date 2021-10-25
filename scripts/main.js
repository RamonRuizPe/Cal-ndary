
const btnEdit = document.querySelectorAll(".btn-contact");
      btnEdit.forEach((btn) => {
        btn.addEventListener("click", async (e) => {

          document.getElementById("name").scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
          document.getElementById("name").focus({
            preventScroll: true
        });
    });
});

