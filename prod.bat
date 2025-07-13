chcp 65001
@echo off
setlocal enabledelayedexpansion

rem Запускаем контейнеры в фоне
docker-compose -f docker-compose.prod.yml up -d

rem Ждём, пока PostgreSQL запустится (таймаут 30 секунд)
echo Ожидание запуска PostgreSQL...
for /L %%i in (1,1,30) do (
  docker exec dbPg pg_isready -U postgres >nul 2>&1
  if !errorlevel! equ 0 (
    echo PostgreSQL готов.
    goto check_db
  )
  timeout /t 1 >nul
)
echo Ошибка: PostgreSQL не запустился за 30 секунд!
exit /b 1

:check_db
rem Проверяем, существует ли база данных
docker exec dbPg psql -U postgres -tAc "SELECT 1 FROM pg_database WHERE datname='pastgregre'" | findstr /C:"1" >nul
if !errorlevel! equ 0 (
  echo База данных "pastgregre" уже существует.
) else (
  echo Создаём базу данных "pastgregre"...
  docker exec dbPg psql -U postgres -c "CREATE DATABASE \"pastgregre\""
  if !errorlevel! equ 0 (
    echo База успешно создана.
  ) else (
    echo Ошибка при создании базы данных!
    exit /b 1
  )
)

echo Готово! База существует, приложение может работать.
endlocal

pause