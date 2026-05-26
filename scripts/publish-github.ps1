# Публикация на https://github.com/Moonastya/retail-expert
# Запуск: powershell -ExecutionPolicy Bypass -File "d:\dorogo sait\scripts\publish-github.ps1"

$ErrorActionPreference = "Stop"
$RepoOwner = "Moonastya"
$RepoName = "retail-expert"
$Root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path

Set-Location $Root

function Get-GhExe {
  $local = "$env:TEMP\gh-cli\bin\gh.exe"
  if (Test-Path $local) { return $local }
  $onPath = Get-Command gh -ErrorAction SilentlyContinue
  if ($onPath) { return $onPath.Source }
  $zip = "$env:TEMP\gh.zip"
  $dir = "$env:TEMP\gh-cli"
  Write-Host "Скачиваю GitHub CLI..."
  Invoke-WebRequest -Uri "https://github.com/cli/cli/releases/download/v2.63.2/gh_2.63.2_windows_amd64.zip" -OutFile $zip -UseBasicParsing
  Expand-Archive -Path $zip -DestinationPath $dir -Force
  return $local
}

$gh = Get-GhExe

$authed = $false
try {
  & $gh auth status 2>&1 | Out-Null
  $authed = $true
} catch {
  $authed = $false
}

if (-not $authed) {
  $token = $env:GITHUB_TOKEN
  if (-not $token) {
    Write-Host ""
    Write-Host "=== Вход в GitHub ===" -ForegroundColor Cyan
    Write-Host "Вариант 1: откроется браузер — войдите как Moonastya"
    Write-Host "Вариант 2: токен https://github.com/settings/tokens (права: repo, workflow)"
    Write-Host ""
    $useWeb = Read-Host "Открыть браузер для входа? (Y/n)"
    if ($useWeb -eq "" -or $useWeb -eq "Y" -or $useWeb -eq "y") {
      & $gh auth login --hostname github.com --git-protocol https --web
    } else {
      $secure = Read-Host "Вставьте токен (ghp_...)" -AsSecureString
      $ptr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
      $token = [Runtime.InteropServices.Marshal]::PtrToStringAuto($ptr)
      [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ptr)
      $token | & $gh auth login --hostname github.com --with-token
    }
  } else {
    $token | & $gh auth login --hostname github.com --with-token
  }
}

Write-Host "Аккаунт:" -ForegroundColor Green
& $gh auth status

$repoSlug = "${RepoOwner}/${RepoName}"
$hasRepo = $false
& $gh repo view $repoSlug 2>$null
if ($LASTEXITCODE -eq 0) { $hasRepo = $true }

if (-not $hasRepo) {
  Write-Host "Создаю репозиторий и загружаю код..."
  & $gh repo create $repoSlug --public --description "Retail Expert — сайт компании" --source . --remote origin --push
} else {
  $remotes = @(git remote)
  if ($remotes -notcontains "origin") {
    git remote add origin "https://github.com/${repoSlug}.git"
  } else {
    git remote set-url origin "https://github.com/${repoSlug}.git"
  }
  Write-Host "Отправка обновлений..."
  git push -u origin main
}

Write-Host ""
Write-Host "Готово. Включите Pages: Settings → Pages → Source: GitHub Actions" -ForegroundColor Yellow
Write-Host "Сайт: https://${RepoOwner}.github.io/${RepoName}/" -ForegroundColor Green
