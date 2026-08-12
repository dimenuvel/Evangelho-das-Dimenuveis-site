(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#site-nav');

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    });

    nav.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Abrir menu');
      });
    });
  }

  const tarotData = [
    { name: 'O Silêncio', layer: 'Silêncio', text: 'Você não precisa acrescentar nada a este momento.', practice: 'Pare por três respirações. Antes de interpretar, perceba o que já está presente.' },
    { name: 'A Visionária', layer: 'Visão', text: 'Há uma imagem tentando nascer antes de virar explicação.', practice: 'Observe uma coisa ao seu redor sem nomeá-la por alguns segundos.' },
    { name: 'A Mente', layer: 'Mente', text: 'O pensamento é uma ferramenta; não precisa ser o motorista.', practice: 'Note o próximo pensamento e deixe-o passar sem segui-lo.' },
    { name: 'O Coração', layer: 'Coração', text: 'Aquilo que você sente também faz parte do Padrão.', practice: 'Reconheça uma emoção sem corrigir, justificar ou expulsar.' },
    { name: 'A Vontade', layer: 'Vontade', text: 'Escolher sem lutar contra o mundo também é agir.', practice: 'Faça hoje uma pequena ação deliberada e depois solte o resultado.' },
    { name: 'A Energia', layer: 'Energia', text: 'Perceba o movimento antes de chamá-lo de problema ou solução.', practice: 'Sinta o corpo por dez segundos e encontre onde a energia está mais evidente.' },
    { name: 'A Matéria', layer: 'Matéria', text: 'O sagrado também tem peso, textura, contas e pinos de boliche.', practice: 'Toque conscientemente um objeto comum e permaneça com a sensação.' },
    { name: 'O Espelho', layer: 'Ogdoade', text: 'O que você procura também está olhando de volta.', practice: 'Pergunte silenciosamente: “Quem está percebendo isto?” Não responda.' }
  ];

  const card = document.querySelector('.tarot-card');
  const modal = document.querySelector('#tarot-modal');
  const title = document.querySelector('#tarot-reading-title');
  const text = document.querySelector('#tarot-reading-text');
  const practice = document.querySelector('#tarot-reading-practice');
  const close = document.querySelector('.tarot-close');
  const again = document.querySelector('.tarot-again');

  function drawTarot() {
    if (!modal) return;
    const picked = tarotData[Math.floor(Math.random() * tarotData.length)];
    title.textContent = `${picked.name} — ${picked.layer}`;
    text.textContent = picked.text;
    practice.textContent = picked.practice;
    modal.hidden = false;
    document.body.classList.add('modal-open');
    close?.focus();
  }

  function closeTarot() {
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    card?.focus();
  }

  card?.addEventListener('click', drawTarot);
  card?.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      drawTarot();
    }
  });
  close?.addEventListener('click', closeTarot);
  again?.addEventListener('click', drawTarot);
  modal?.addEventListener('click', event => {
    if (event.target === modal) closeTarot();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && modal && !modal.hidden) closeTarot();
  });
})();
