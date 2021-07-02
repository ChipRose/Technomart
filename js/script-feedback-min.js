/* feedback modal window */
const buttonFeedBack = document.querySelector(".button-contacts");
const body = document.querySelector(".page-body");
const feedBackWindow = document.querySelector(".feed-back-window");
const closeFeedBack = feedBackWindow.querySelector(".close-feedback");
const feedBackForm = feedBackWindow.querySelector(".feed-back-form");
const feedBackNameInput = feedBackWindow.querySelector(".name-input");
const feedBackEmailInput = feedBackWindow.querySelector(".email-input");
const feedBackTextInput = feedBackWindow.querySelector(".text-area");
const alert = feedBackWindow.querySelector(".alert");
let isStorageSupport = true;
let storageName = "";
let storageEmail = "";
try {
	storageName = localStorage.getItem("name");
	storageEmail = localStorage.getItem("email");
} catch (err) {
	isStorageSupport = false;
}
buttonFeedBack.addEventListener("click", function (evt) {
	evt.preventDefault();
	feedBackWindow.classList.add("active");
	if (storageName || storageEmail) {
		feedBackNameInput.value = storageName;
		feedBackEmailInput.value = storageEmail;
		feedBackTextInput.focus();
	} else {
		feedBackNameInput.focus();
	}
	body.classList.add("body-blocked");
});
closeFeedBack.addEventListener("click", function () {
	feedBackWindow.classList.remove("active");
	body.classList.remove("body-blocked");
	feedBackWindow.classList.remove("modal-error");
	alert.classList.remove("active-block");
});
feedBackForm.addEventListener("submit", function (evt) {
	if (!feedBackNameInput.value || !feedBackEmailInput.value) {
		evt.preventDefault();
		alert.classList.add("active-block");
		feedBackWindow.classList.remove("modal-error");
		feedBackWindow.offsetWidth = feedBackWindow.offsetWidth;
		feedBackWindow.classList.add("modal-error");
		feedBackNameInput.addEventListener("focus", function () {
			alert.classList.remove("active-block");
		});
		feedBackEmailInput.addEventListener("focus", function () {
			alert.classList.remove("active-block");
		});
	} else {
		if (isStorageSupport) {
			localStorage.setItem("name", feedBackNameInput.value);
			localStorage.setItem("email", feedBackEmailInput.value);
		}
	}
});
window.addEventListener("keydown", function (evt) {
	if (evt.code === "Escape") {
		if (feedBackWindow.classList.contains("active")) {
			evt.preventDefault();
			feedBackWindow.classList.remove("active");
			body.classList.remove("body-blocked");
			feedBackWindow.classList.remove("modal-error");
		}
	}
});
