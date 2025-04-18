document.getElementById("chat-toggle").addEventListener("click", function () {
  const chatContainer = document.getElementById("chat-frame-container");
  chatContainer.style.display = (chatContainer.style.display === "block") ? "none" : "block";
});

document.getElementById("chat-form").addEventListener("submit", async function (e) {
  e.preventDefault(); // ✅ prevents reload
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;

  addMessage("user", message);
  input.value = "";

  try {
    const response = await fetch("https://yancysimplyai.app.n8n.cloud/webhook/27f9f66b-728f-47fa-875a-7dfb9ed46156/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await response.json();
    const output = data.output || data.reply || "🤖 Sorry, I didn't understand that.";
    addMessage("bot", output);
  } catch (error) {
    console.error(error);
    addMessage("bot", "⚠️ Error contacting server.");
  }
});

function addMessage(sender, text) {
  const msgDiv = document.createElement("div");
  msgDiv.className = sender;
  msgDiv.textContent = text;
  document.getElementById("messages").appendChild(msgDiv);
  const container = document.getElementById("messages");
  container.scrollTop = container.scrollHeight;
}
