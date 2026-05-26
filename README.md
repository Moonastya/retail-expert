# Retail Expert — сайт компании

Vue 3 + Vite. Демо на GitHub Pages:

**https://moonastya.github.io/retail-expert/**

## Локально

```bash
npm install
npm run dev
```

## Публикация на GitHub (аккаунт [Moonastya](https://github.com/Moonastya))

### 1. Создайте репозиторий

1. Откройте https://github.com/new  
2. Имя репозитория: **`retail-expert`** (обязательно это имя — от него зависит ссылка)  
3. Public → **Create repository**

### 2. Загрузите код (первый раз)

В PowerShell из папки проекта:

```powershell
cd "d:\dorogo sait"
git init
git branch -M main
git add .
git commit -m "Initial commit: Retail Expert site"
git remote add origin https://github.com/Moonastya/retail-expert.git
git push -u origin main
```

При запросе войдите в GitHub (логин + [Personal Access Token](https://github.com/settings/tokens) вместо пароля).

### 3. Включите GitHub Pages

1. Репозиторий → **Settings** → **Pages**  
2. **Build and deployment** → Source: **GitHub Actions**  
3. После успешного workflow **Deploy to GitHub Pages** (вкладка Actions) сайт откроется по ссылке выше.

### Обновление сайта

```powershell
git add .
git commit -m "Описание изменений"
git push
```

Через 1–2 минуты обновится публичная версия.
