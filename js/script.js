
const cardAdd = document.querySelector(".card-add");
const dialog = document.querySelector("#card-form");
const cancelDialog = document.querySelector("#cancel-dialog");

cardAdd.addEventListener("click", (event) => {
    dialog.showModal();
});

cancelDialog.addEventListener("click", (event) => {
    dialog.close();
});
