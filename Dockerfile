# Этап сборки (builder)
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
# Копируем из папки, где Dockerfile, в workdir контейнера (/app):
COPY . .
RUN npm run build

# Этап запуска (используем только необходимые файлы)
FROM node:18-alpine
WORKDIR /app

# Копируем package.json и зависимости
COPY package*.json ./
RUN npm install --production

# Копируем скомпилированный JavaScript из builder
COPY --from=builder /app/dist ./dist

# Запускаем приложение (входной файл приложения):
CMD ["node", "dist/app.js"]