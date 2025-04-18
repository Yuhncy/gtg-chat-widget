
document.getElementById("chat-toggle").addEventListener("click", function () {
  const chatContainer = document.getElementById("chat-frame-container");
  if (chatContainer.style.display === "none" || chatContainer.style.display === "") {
    chatContainer.style.display = "block";
  } else {
    chatContainer.style.display = "none";
  }
});
