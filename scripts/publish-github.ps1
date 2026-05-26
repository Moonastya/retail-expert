# Publish to https://github.com/Moonastya/retail-expert
# Run: powershell -ExecutionPolicy Bypass -File "d:\dorogo sait\scripts\publish-github.ps1"

$ErrorActionPreference = "Stop"
$RepoOwner = "Moonastya"
$RepoName = "retail-expert"
$Root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path

Set-Location $Root

# Clear invalid GITHUB_TOKEN from previous runs
Remove-Item Env:GITHUB_TOKEN -ErrorAction SilentlyContinue

function Get-GhExe {
  $local = "$env:TEMP\gh-cli\bin\gh.exe"
  if (Test-Path $local) { return $local }
  $onPath = Get-Command gh -ErrorAction SilentlyContinue
  if ($onPath) { return $onPath.Source }
  $zip = "$env:TEMP\gh.zip"
  $dir = "$env:TEMP\gh-cli"
  Write-Host "Downloading GitHub CLI..."
  Invoke-WebRequest -Uri "https://github.com/cli/cli/releases/download/v2.63.2/gh_2.63.2_windows_amd64.zip" -OutFile $zip -UseBasicParsing
  Expand-Archive -Path $zip -DestinationPath $dir -Force
  return $local
}

$gh = Get-GhExe

$authed = $false
try {
  & $gh auth status 2>&1 | Out-Null
  if ($LASTEXITCODE -eq 0) { $authed = $true }
} catch {
  $authed = $false
}

if (-not $authed) {
  $token = $env:GITHUB_TOKEN
  if (-not $token) {
    Write-Host ""
    Write-Host "=== GitHub login ===" -ForegroundColor Cyan
    Write-Host "Option 1: browser opens - sign in as Moonastya"
    Write-Host "Option 2: token at https://github.com/settings/tokens (scopes: repo, workflow)"
    Write-Host ""
    $useWeb = Read-Host "Open browser for login? (Y/n)"
    if ($useWeb -eq "" -or $useWeb -eq "Y" -or $useWeb -eq "y") {
      & $gh auth login --hostname github.com --git-protocol https --web
    } else {
      $secure = Read-Host "Paste token (ghp_...)" -AsSecureString
      $ptr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
      $token = [Runtime.InteropServices.Marshal]::PtrToStringAuto($ptr)
      [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ptr)
      $token | & $gh auth login --hostname github.com --with-token
    }
  } else {
    $token | & $gh auth login --hostname github.com --with-token
  }
}

Write-Host "Account:" -ForegroundColor Green
& $gh auth status

$repoSlug = "$RepoOwner/$RepoName"
$hasRepo = $false
$prevErrorAction = $ErrorActionPreference
$ErrorActionPreference = "Continue"
& $gh repo view $repoSlug 2>&1 | Out-Null
if ($LASTEXITCODE -eq 0) { $hasRepo = $true }
$ErrorActionPreference = $prevErrorAction

if (-not $hasRepo) {
  Write-Host "Repository not found. Creating and uploading..." -ForegroundColor Cyan
  & $gh repo create $repoSlug --public --description "Retail Expert company site" --source . --remote origin --push
  if ($LASTEXITCODE -ne 0) { throw "Failed to create repository $repoSlug" }
} else {
  $remotes = @(git remote)
  if ($remotes -notcontains "origin") {
    git remote add origin "https://github.com/$repoSlug.git"
  } else {
    git remote set-url origin "https://github.com/$repoSlug.git"
  }
  Write-Host "Pushing updates..."
  git push -u origin main
}

$siteUrl = "https://$RepoOwner.github.io/$RepoName/"
Write-Host ""
Write-Host "Done. Enable Pages: Settings - Pages - Source: GitHub Actions" -ForegroundColor Yellow
Write-Host "Site URL: $siteUrl" -ForegroundColor Green
