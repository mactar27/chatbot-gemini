(function() {
  const cfg = window.CHATBOT_CONFIG || {};
  const apiBase = cfg.apiBaseUrl || "";
  const projectName = cfg.projectName || "Projet";
  const companyName = cfg.companyName || "Entreprise";
  const enableAI = !!cfg.enableAI;

  // Création du launcher
  const launcher = document.createElement('button');
  launcher.id = 'cb-launcher';
  launcher.title = 'Ouvrir le chatbot';
  launcher.textContent = '💬';
  document.body.appendChild(launcher);

  // Création du panel
  const panel = document.createElement('div');
  panel.id = 'cb-panel';
  panel.innerHTML = `
    <div id="cb-header">
      <div class="title"><div class="cb-avatar"></div> <div>${companyName} • Assistant</div></div>
      <button id="cb-close" title="Fermer">✕</button>
    </div>
    <div id="cb-messages"></div>
    <div id="cb-input" class="cb-input">
      <input id="cb-text" type="text" placeholder="Écrire un message..." />
      <button id="cb-send">Envoyer</button>
    </div>
  `;
  document.body.appendChild(panel);

  const btnClose = panel.querySelector('#cb-close');
  const messages = panel.querySelector('#cb-messages');
  const inputText = panel.querySelector('#cb-text');
  const btnSend = panel.querySelector('#cb-send');

  function addMsg(text, sender='bot') {
    const row = document.createElement('div');
    row.className = 'cb-msg ' + sender;
    const avatar = document.createElement('div');
    avatar.className = 'cb-avatar';
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.textContent = text;
    if (sender === 'bot') row.appendChild(avatar);
    row.appendChild(bubble);
    if (sender === 'user') row.appendChild(avatar);
    messages.appendChild(row);
    messages.scrollTop = messages.scrollHeight;
  }

  async function sendMessage() {
    const text = inputText.value.trim();
    if (!text) return;
    inputText.value = '';
    addMsg(text, 'user');

    try {
      const res = await fetch(apiBase + '/api/chatbot/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });
      const data = await res.json();
      addMsg(data.botResponse || "Désolé, je n'ai pas compris.");
    } catch (e) {
      console.error(e);
      addMsg("Oups, une erreur est survenue. Réessayez plus tard.");
    }
  }

  launcher.addEventListener('click', () => {
    panel.style.display = 'flex';
    messages.innerHTML = '';
    addMsg(`Bienvenue sur ${projectName} ! Écrivez votre message pour commencer.`);
  });

  btnClose.addEventListener('click', () => panel.style.display = 'none');
  btnSend.addEventListener('click', sendMessage);
  inputText.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
})();
