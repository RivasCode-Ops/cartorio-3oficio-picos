# Rotina rápida antes de codar — execute na raiz do repositório:
#   .\scripts\preflight.ps1

$ErrorActionPreference = "Continue"
Set-Location (Split-Path -Parent $PSScriptRoot)

Write-Host "=== Git: branch atual ===" -ForegroundColor Cyan
git branch --show-current

Write-Host "`n=== Git: status ===" -ForegroundColor Cyan
git status -sb

Write-Host "`n=== Git: ultimo commit ===" -ForegroundColor Cyan
git log -1 --oneline

Write-Host "`nPronto. Se estiver em equipe, rode: git pull origin main (ou sua branch)" -ForegroundColor DarkGray
