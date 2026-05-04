# Comando: Antes de codar (pré-voo)

Use no início da sessão ou antes de alterar o site. Pode colar isto no chat (Ctrl+I) ou seguir manualmente.

## Instrução para o Cursor

Antes de escrever ou alterar código neste repositório:

1. Confirmar que o workspace é a pasta raiz do projeto (`index.html` e pastas `css/`, `js/`, `pages/` visíveis).
2. Ler `README.md` e, se existir, `.cursor/rules/cartorio-style.mdc`, para respeitar paleta, tipografia e convenções.
3. Executar verificação Git (status + branch); se houver alterações locais não commitadas, avisar o usuário antes de sobrescrever arquivos.
4. Identificar quais HTML/CSS/JS serão tocados; não refatorar arquivos fora do pedido.
5. Lembrar: site estático no GitHub Pages — após mudanças relevantes, sugerir `git add`, `git commit` e `git push` para o cliente ver no ar; incrementar `?v=` nos links de CSS/JS se o cache for problema.

## Checklist manual (você)

- [ ] Pasta do projeto correta aberta no Cursor/VS Code  
- [ ] `git pull` (se trabalha com remoto / equipe)  
- [ ] `git status` — saber o que já está modificado  
- [ ] (Opcional) `git checkout -b nome-da-feature` para isolamento  
- [ ] Saber o escopo do pedido (uma página? só CSS?)  
- [ ] Testar no navegador após editar (e em aba anônima se suspeitar de cache)  

## Opcional no terminal (PowerShell)

Na raiz do projeto:

```powershell
.\scripts\preflight.ps1
```
