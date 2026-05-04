/**
 * Formulário de agendamento + tema claro/escuro.
 */
(function () {
  'use strict';

  var THEME_KEY = 'cartorio3-theme';

  function initTheme() {
    var btn = document.getElementById('btn-theme');
    var root = document.documentElement;
    var stored = localStorage.getItem(THEME_KEY);
    if (stored === 'dark' || stored === 'light') {
      root.setAttribute('data-theme', stored);
    }
    if (!btn) return;
    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem(THEME_KEY, next);
    });
  }

  function pad(n) {
    return n < 10 ? '0' + n : String(n);
  }

  function todayISODate() {
    var d = new Date();
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }

  function initAgendamento() {
    var form = document.getElementById('form-agendamento');
    var feedback = document.getElementById('ag-feedback');
    var dataInput = document.getElementById('ag-data');
    if (!form || !feedback) return;

    if (dataInput) {
      dataInput.min = todayISODate();
      dataInput.value = '';
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      feedback.textContent = '';
      feedback.classList.remove('is-error', 'is-ok');

      var nome = (document.getElementById('ag-nome') || {}).value.trim();
      var tel = (document.getElementById('ag-tel') || {}).value.trim();
      var servico = (document.getElementById('ag-servico') || {}).value;
      var data = (document.getElementById('ag-data') || {}).value;
      var hora = (document.getElementById('ag-hora') || {}).value;

      if (!nome || nome.length < 3) {
        feedback.textContent = 'Informe um nome completo válido.';
        feedback.classList.add('is-error');
        return;
      }
      if (!tel || tel.replace(/\D/g, '').length < 10) {
        feedback.textContent = 'Informe um telefone com DDD (mínimo 10 dígitos).';
        feedback.classList.add('is-error');
        return;
      }
      if (!servico) {
        feedback.textContent = 'Selecione o serviço.';
        feedback.classList.add('is-error');
        return;
      }
      if (!data) {
        feedback.textContent = 'Escolha a data.';
        feedback.classList.add('is-error');
        return;
      }
      if (data < todayISODate()) {
        feedback.textContent = 'A data não pode ser no passado.';
        feedback.classList.add('is-error');
        return;
      }
      if (!hora) {
        feedback.textContent = 'Informe o horário desejado.';
        feedback.classList.add('is-error');
        return;
      }
      if (hora < '07:00' || hora > '17:00') {
        feedback.textContent = 'Escolha um horário entre 7h e 17h (horário de atendimento).';
        feedback.classList.add('is-error');
        return;
      }

      var payload = {
        nome: nome,
        telefone: tel,
        servico: servico,
        data: data,
        hora: hora,
        criadoEm: new Date().toISOString(),
      };

      try {
        var list = JSON.parse(localStorage.getItem('cartorio3-agendamentos') || '[]');
        if (!Array.isArray(list)) list = [];
        list.push(payload);
        localStorage.setItem('cartorio3-agendamentos', JSON.stringify(list));
      } catch (err) {
        /* ignore quota */
      }

      feedback.textContent =
        'Recebemos seu pedido de agendamento (demonstração). Em produção, encaminhe estes dados por e-mail ou sistema interno. Você pode repetir o envio após recarregar a página.';
      feedback.classList.add('is-ok');
      form.reset();
      if (dataInput) dataInput.min = todayISODate();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initTheme();
      initAgendamento();
    });
  } else {
    initTheme();
    initAgendamento();
  }
})();
