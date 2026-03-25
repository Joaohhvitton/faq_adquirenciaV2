const popup = document.getElementById('welcomePopup');
const overlay = document.getElementById('welcomeOverlay');
const closeButton = document.getElementById('closeWelcomePopup');

const playInstallVideo = document.getElementById('playInstallVideo');
const installVideoCard = document.getElementById('installVideoCard');
const installVideoEmbedUrl = 'https://www.youtube.com/embed/wUWJWiLE_sc?autoplay=1';
const playShortsVideo = document.getElementById('playShortsVideo');
const shortsVideoCard = document.getElementById('shortsVideoCard');
const shortsVideoEmbedUrl = 'https://www.youtube.com/embed/nPQlx7qiykM?autoplay=1';

const hidePopup = () => {
  popup.classList.add('welcome-popup--hidden');
  overlay.classList.add('welcome-overlay--hidden');
  popup.setAttribute('aria-hidden', 'true');
  overlay.setAttribute('aria-hidden', 'true');
};

closeButton.addEventListener('click', hidePopup);
overlay.addEventListener('click', hidePopup);
window.setTimeout(hidePopup, 6000);

playInstallVideo.addEventListener('click', () => {
  installVideoCard.innerHTML = `
    <iframe
      class="video-card__iframe"
      src="${installVideoEmbedUrl}"
      title="Instalação do pacote Pen drive"
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  `;
});

playShortsVideo.addEventListener('click', () => {
  shortsVideoCard.innerHTML = `
    <iframe
      class="video-card__iframe"
      src="${shortsVideoEmbedUrl}"
      title="Manual adicional"
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  `;
});


const topicSearchForm = document.getElementById('topicSearchForm');
const topicSearchInput = document.getElementById('topicSearchInput');
const topicSearchFeedback = document.getElementById('topicSearchFeedback');
const helpPanelTags = document.querySelectorAll('.help-panel__tag');

const topicLinks = {
  'credenciamento': 'https://drive.google.com/file/d/1FnTXlzBSLM5AsXTFOuEa-SReBwLMABHI',
  'reativacao': 'https://drive.google.com/file/d/1FnTXlzBSLM5AsXTFOuEa-SReBwLMABHI',
  'terminais': 'https://drive.google.com/file/d/1FnTXlzBSLM5AsXTFOuEa-SReBwLMABHI',
  'comandos pos': 'https://drive.google.com/file/d/1FnTXlzBSLM5AsXTFOuEa-SReBwLMABHI',
  'erros gerais': 'https://drive.google.com/file/d/1nsJyPT6Lpeejj_JiywPoolKk2KxLcclg',
  'erros pix': 'https://drive.google.com/file/d/1nsJyPT6Lpeejj_JiywPoolKk2KxLcclg',
  'erros transacionais': 'https://drive.google.com/file/d/1nsJyPT6Lpeejj_JiywPoolKk2KxLcclg',
  'suporte portal/app': 'https://drive.google.com/file/d/1nsJyPT6Lpeejj_JiywPoolKk2KxLcclg',
  'instalacao do pacote pen drive': 'https://drive.google.com/drive/folders/COLE_AQUI_LINK_INSTALACAO_PEN_DRIVE'
};

const normalizeText = (value) => value
  .trim()
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '');

topicSearchForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const query = normalizeText(topicSearchInput.value);

  if (!query) {
    topicSearchFeedback.textContent = 'Digite um tópico para pesquisar.';
    return;
  }

  const directMatch = topicLinks[query];
  const closeMatchKey = Object.keys(topicLinks).find((topic) => topic.includes(query));
  const destination = directMatch || (closeMatchKey ? topicLinks[closeMatchKey] : null);

  if (destination) {
    topicSearchFeedback.textContent = 'Tópico encontrado. Abrindo o documento...';
    window.open(destination, '_blank', 'noopener');
    return;
  }

  topicSearchFeedback.textContent = 'Não encontramos esse tópico. Tente outro termo ou use os cards abaixo.';
});

helpPanelTags.forEach((tagButton) => {
  tagButton.addEventListener('click', () => {
    topicSearchInput.value = tagButton.dataset.topic || '';
    topicSearchForm.requestSubmit();
  });
});

const faqChatToggle = document.getElementById('faqChatToggle');
const faqChatDrawer = document.getElementById('faqChatDrawer');
const faqChatClose = document.getElementById('faqChatClose');
const faqChatForm = document.getElementById('faqChatForm');
const faqChatInput = document.getElementById('faqChatInput');
const faqChatMessages = document.getElementById('faqChatMessages');
const faqChatSuggestions = document.getElementById('faqChatSuggestions');

const faqItems = [
  {
    question: 'Como faço o credenciamento do terminal?',
    keywords: ['credenciamento', 'credenciar', 'terminal', 'habilitar'],
    answer: 'Para credenciamento, consulte o manual de Dúvidas Gerais e siga o fluxo de habilitação do terminal.',
    link: 'https://drive.google.com/file/d/16tiqZ3iAN8WxIimdH_krgtWOLiWSXOAK'
  },
  {
    question: 'Como reativar um terminal?',
    keywords: ['reativacao', 'reativar', 'ativar novamente', 'terminal'],
    answer: 'A reativação é tratada no documento de Dúvidas Gerais no tópico de Reativação.',
    link: 'https://drive.google.com/file/d/16tiqZ3iAN8WxIimdH_krgtWOLiWSXOAK'
  },
  {
    question: 'Onde vejo erros PIX?',
    keywords: ['erro pix', 'pix', 'codigo pix', 'falha pix'],
    answer: 'Os erros PIX estão no documento Erros POS, no bloco de Erros PIX.',
    link: 'https://drive.google.com/file/d/1eek0hb_b5TSTw1txpCIv47rGqjIQC7k_'
  },
  {
    question: 'Como resolver erros transacionais?',
    keywords: ['erros transacionais', 'transacao negada', 'negativa', 'erro transacao'],
    answer: 'Consulte Erros POS em Erros Transacionais para validação do código e tratativa.',
    link: 'https://drive.google.com/file/d/1eek0hb_b5TSTw1txpCIv47rGqjIQC7k_'
  },
  {
    question: 'Tem manual de instalação via pen drive?',
    keywords: ['pen drive', 'instalacao', 'pacote', 'move5000'],
    answer: 'Sim. O manual em vídeo de instalação do pacote Pen drive (MOVE5000) está disponível na seção Manuais.',
    link: 'https://www.youtube.com/watch?v=wUWJWiLE_sc'
  }
];

const normalizeChatText = (value) => value
  .trim()
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '');

const addChatMessage = (text, from = 'bot') => {
  const message = document.createElement('div');
  message.className = `faq-chat__message faq-chat__message--${from}`;
  message.innerHTML = text;
  faqChatMessages.appendChild(message);
  faqChatMessages.scrollTop = faqChatMessages.scrollHeight;
};

const getKeywordAnswer = (userText) => {
  const query = normalizeChatText(userText);
  let bestItem = null;
  let bestScore = 0;

  faqItems.forEach((item) => {
    const score = item.keywords.reduce((acc, keyword) => {
      return acc + (query.includes(normalizeChatText(keyword)) ? 1 : 0);
    }, 0);

    if (score > bestScore) {
      bestScore = score;
      bestItem = item;
    }
  });

  return bestScore > 0 ? bestItem : null;
};

const renderSuggestionButtons = () => {
  faqItems.forEach((item) => {
    const suggestionButton = document.createElement('button');
    suggestionButton.type = 'button';
    suggestionButton.className = 'faq-chat__suggestion-btn';
    suggestionButton.textContent = item.question;
    suggestionButton.addEventListener('click', () => {
      faqChatInput.value = item.question;
      faqChatForm.requestSubmit();
    });
    faqChatSuggestions.appendChild(suggestionButton);
  });
};

const openFaqChat = () => {
  faqChatDrawer.classList.add('faq-chat-drawer--open');
  faqChatDrawer.setAttribute('aria-hidden', 'false');
  faqChatInput.focus();
};

const closeFaqChat = () => {
  faqChatDrawer.classList.remove('faq-chat-drawer--open');
  faqChatDrawer.setAttribute('aria-hidden', 'true');
};

faqChatToggle.addEventListener('click', openFaqChat);
faqChatClose.addEventListener('click', closeFaqChat);

faqChatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const userMessage = faqChatInput.value.trim();

  if (!userMessage) {
    return;
  }

  addChatMessage(userMessage, 'user');
  faqChatInput.value = '';

  const result = getKeywordAnswer(userMessage);

  if (result) {
    addChatMessage(`${result.answer}<br><a href="${result.link}" target="_blank" rel="noopener noreferrer">Abrir conteúdo relacionado</a>`);
    return;
  }

  addChatMessage('Não encontrei essa dúvida na FAQ. Tente por palavras-chave como: credenciamento, reativação, erros PIX ou pen drive.');
});

addChatMessage('Olá! Posso responder com base na FAQ usando palavras-chave. Escolha uma pergunta sugerida ou digite sua dúvida.');
renderSuggestionButtons();
