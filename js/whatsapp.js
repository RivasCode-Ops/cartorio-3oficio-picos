const WHATSAPP_NUMBER = '5589999999999';
const WHATSAPP_MESSAGE = 'Olá! Gostaria de solicitar uma certidão.';

function pathPrefix() {
  var path = window.location.pathname || '';
  return path.indexOf('/pages/') !== -1 ? '../' : '';
}

function abrirWhatsApp(mensagemPersonalizada) {
  var texto = mensagemPersonalizada || WHATSAPP_MESSAGE;
  var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(texto);
  window.open(url, '_blank', 'noopener,noreferrer');
}

document.addEventListener('DOMContentLoaded', function () {
  if (document.querySelector('.whatsapp-float')) return;

  var prefix = pathPrefix();
  var btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'whatsapp-float';
  btn.setAttribute('aria-label', 'Fale conosco pelo WhatsApp');

  var img = document.createElement('img');
  img.src = prefix + 'assets/icons/whatsapp.svg';
  img.alt = '';
  img.width = 28;
  img.height = 28;

  var span = document.createElement('span');
  span.textContent = 'Fale conosco';

  btn.appendChild(img);
  btn.appendChild(span);
  btn.addEventListener('click', function () {
    abrirWhatsApp();
  });

  document.body.appendChild(btn);
});

window.abrirWhatsApp = abrirWhatsApp;
