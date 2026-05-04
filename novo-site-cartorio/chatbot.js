/**
 * Chatbot simples: respostas fixas para perguntas frequentes.
 */
(function () {
  'use strict';

  var QA = [
    {
      label: 'Preços e taxas',
      match: /preço|preco|valor|custo|taxa|quanto custa|tabela/i,
      answer:
        'Valores de emolumentos e taxas seguem tabelas oficiais (FENAJU / estado) e variam por tipo de ato. Para um orçamento orientativo, ligue ao cartório ou use o WhatsApp (89) 99999-9999 informando o serviço desejado.',
    },
    {
      label: 'Documentos necessários',
      match: /documento|papel|o que levar|preciso levar|levar o que/i,
      answer:
        'Os documentos mudam conforme o serviço (certidão, escritura, protesto, etc.). Em geral: documento de identificação com foto e dados do ato. Confirme a checklist exata pelo telefone ou WhatsApp antes de ir.',
    },
    {
      label: 'Horário de atendimento',
      match: /hor[aá]rio|funciona|abre|fecha|que horas|atendimento/i,
      answer:
        'Atendimento de segunda a sexta, das 7h às 17h, conforme divulgação no site institucional. Feriados seguem o calendário local.',
    },
    {
      label: 'Certificado digital grátis',
      match: /certificado|digital|e-notariado|e notariado|gratuito|grátis|assinatura digital/i,
      answer:
        'Conforme o site oficial: você pode solicitar a emissão do certificado digital e-Notariado gratuitamente para assinar documentos com segurança. No balcão ou pelos canais oficiais do cartório orientamos o passo a passo.',
    },
    {
      label: 'Endereço e localização',
      match: /onde|endereço|endereco|localiza|mapa|picos|rua/i,
      answer:
        'Estamos na Rua Santo Antônio, 148 A — Centro, Picos-PI (site oficial). Há estacionamento em frente. Use o mapa nesta página ou o Google Maps para traçar rota até o Centro de Picos.',
    },
  ];

  var toggle = document.getElementById('chatbot-toggle');
  var panel = document.getElementById('chatbot-panel');
  var closeBtn = document.getElementById('chatbot-close');
  var messagesEl = document.getElementById('chatbot-messages');
  var chipsEl = document.getElementById('chatbot-chips');
  var form = document.getElementById('chatbot-form');
  var input = document.getElementById('chatbot-input');

  if (!toggle || !panel || !messagesEl || !chipsEl) return;

  function addBubble(text, who) {
    var div = document.createElement('div');
    div.className = 'chatbot__bubble chatbot__bubble--' + (who === 'user' ? 'user' : 'bot');
    div.textContent = text;
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function openPanel(open) {
    panel.hidden = !open;
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open && messagesEl.childElementCount === 0) {
      addBubble(
        'Olá! Sou o assistente virtual. Escolha um tema abaixo ou digite palavras como preço, documentos ou horário.',
        'bot'
      );
    }
  }

  function answerForText(text) {
    var t = text.trim();
    if (!t) return null;
    for (var i = 0; i < QA.length; i++) {
      if (QA[i].match.test(t)) return QA[i].answer;
    }
    return 'Não tenho uma resposta automática para isso. Por favor, fale com a equipe pelo WhatsApp (89) 99999-9999 ou ligue ao cartório no horário de atendimento.';
  }

  QA.forEach(function (item) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'chatbot__chip';
    b.textContent = item.label;
    b.addEventListener('click', function () {
      addBubble(item.label, 'user');
      addBubble(item.answer, 'bot');
    });
    chipsEl.appendChild(b);
  });

  toggle.addEventListener('click', function () {
    openPanel(panel.hidden);
  });

  closeBtn.addEventListener('click', function () {
    openPanel(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') openPanel(false);
  });

  if (form && input) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var t = input.value;
      if (!t.trim()) return;
      addBubble(t, 'user');
      addBubble(answerForText(t), 'bot');
      input.value = '';
    });
  }
})();

