# HyperDrive Backend API

REST API для облачного хранилища файлов. Построен на FastAPI с асинхронной архитектурой и безопасной системой аутентификации.

**Версия:** 0.1.0  
**Python:** 3.11+

## Содержание

- [Архитектура](#архитектура)
- [Установка](#установка)
- [Конфигурация](#конфигурация)
- [Запуск](#запуск)
- [API](#api)
- [Тестирование](#тестирование)
- [Структура проекта](#структура-проекта)
- [Логирование](#логирование)
- [Разработка](#разработка)

## Архитектура

Backend использует **слоистую архитектуру** с четким разделением ответственности:

```
Routes → Services → Repositories → Models/Database
                 ↓
            Schemas (validation)
```

### Компоненты

| Слой | Отвественность |
|------|---|
| **Routes** | HTTP endpoints, валидация запросов, управление ответами |
| **Services** | Бизнес-логика, аутентификация, управление сессиями |
| **Repositories** | Взаимодействие с БД, ORM queries |
| **Models** | SQLAlchemy ORM модели, отражение схемы БД |
| **Schemas** | Pydantic модели для валидации (request/response) |

### Ключевые особенности

- ✓ Асинхронный код (async/await) на всех уровнях
- ✓ Repository pattern для абстракции доступа к данным
- ✓ FastAPI dependency injection для слабой связанности
- ✓ JWT + Refresh Token с безопасным хранением
- ✓ Bcrypt hashing для паролей
- ✓ Логирование через loguru (консоль + файлы)
- ✓ Валидация данных через Pydantic
- ✓ Полная типизация (type hints) на Python 3.11+
- ✓ Comprehensive test suite с 40+ тестами

## Установка

### Требования

- Python 3.11 или выше
- PostgreSQL с поддержкой async (asyncpg)
- pip или uv

### Шаги установки

1. **Клонируйте репозиторий и перейдите в папку backend:**
```bash
cd backend
```

2. **Создайте виртуальное окружение:**
```bash
python3.11 -m venv venv
source venv/bin/activate  # На Windows: venv\Scripts\activate
```

3. **Установите зависимости:**
```bash
pip install -e .
```

4. **Для разработки (включая тесты):**
```bash
pip install -e ".[dev]"
```

## Конфигурация

### Переменные окружения (.env)

Создайте файл `.env` в корне папки backend:

```env
VERSION=0.1.0
DEBUG=True

HOST=127.0.0.1
PORT=1080

DATABASE_URL=postgresql+asyncpg://user:password@localhost:5432/hyperdrive

SECRET_KEY=your-super-secret-key-change-in-production
ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7
MAX_SESSIONS=30
```

### Параметры конфигурации

| Переменная | Тип | Значение по умолчанию | Описание |
|-----------|-----|-----|---------|
| `VERSION` | str | - | Версия приложения (обязательно) |
| `DEBUG` | bool | True | Режим разработки |
| `HOST` | str | 127.0.0.1 | Адрес запуска сервера |
| `PORT` | int | 1080 | Порт запуска |
| `DATABASE_URL` | str | - | URL подключения к БД (обязательно) |
| `SECRET_KEY` | str | - | Ключ для подписи JWT (обязательно) |
| `ALGORITHM` | str | HS256 | Алгоритм JWT |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | int | 30 | Время жизни access token в минутах |
| `REFRESH_TOKEN_EXPIRE_DAYS` | int | 7 | Время жизни refresh token в днях |
| `MAX_SESSIONS` | int | 30 | Максимум активных сессий на пользователя |

## Запуск

### Разработка (с hot reload)

```bash
python src/main.py
```

Сервер запустится на `http://127.0.0.1:1080`

### Production

```bash
uvicorn src.main:app --host 0.0.0.0 --port 8000
```

### Проверка здоровья

```bash
curl http://127.0.0.1:1080/
```

Ответ:
```json
{
  "status": "AVAILABLE",
  "version": "0.1.0"
}
```

## API

### Аутентификация

Все endpoints находятся в `/v1/auth/`

#### 1. Регистрация

```http
POST /v1/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "username": "john_doe",
  "password": "secure_password_123"
}
```

**Ответы:**
- `201 Created` - Успешная регистрация
- `400 Bad Request` - Email/username уже зарегистрирован
- `422 Unprocessable Entity` - Валидационная ошибка

#### 2. Вход

```http
POST /v1/auth/login
Content-Type: application/json

{
  "login_identifier": "john_doe",
  "password": "secure_password_123"
}
```

**Ответ (200 OK):**
```json
{
  "session_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "opaque_token_base64"
}
```

**Cookie:** `refresh_token` устанавливается как httpOnly

#### 3. Обновление токенов

```http
POST /v1/auth/refresh
Cookie: refresh_token=opaque_token_base64
```

**Ответ (200 OK):**
```json
{
  "session_token": "new_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "new_opaque_token_base64"
}
```

#### 4. Выход

```http
POST /v1/auth/logout
Cookie: refresh_token=opaque_token_base64
```

**Ответ:** `204 No Content`

## Тестирование

Полное описание тестирования смотрите в [tests/README.md](tests/README.md)

### Быстрый старт

```bash
# Установить dev зависимости
pip install -e ".[dev]"

# Запустить все тесты
pytest

# Запустить с coverage
pytest --cov=src --cov-report=html

# Запустить только unit тесты
pytest tests/unit/

# Запустить только integration тесты
pytest tests/integration/
```

### Структура тестов

```
tests/
├── conftest.py                    # Fixtures и конфигурация
├── README.md                      # Документация тестирования
├── unit/                          # Unit тесты (с мокированием)
│   ├── test_auth_service.py       # Тесты AuthService
│   └── test_utils.py              # Тесты утилит (хеширование, токены)
└── integration/                   # Integration тесты (с БД)
    └── test_auth_endpoints.py     # Тесты HTTP endpoints
```

### Примеры тестирования

```bash
# Запустить конкретный тест
pytest tests/unit/test_auth_service.py::TestAuthService::test_register_user_success

# Запустить с verbose выводом
pytest -v

# Запустить и остановиться на первом падении
pytest -x

# Показать print statements
pytest -s
```

## Структура проекта

```
backend/
├── src/
│   ├── __init__.py
│   ├── main.py                 # FastAPI app, startup logic
│   ├── config.py               # Configuration, environment variables
│   ├── exceptions.py           # Custom exceptions
│   ├── dependencies/           # Dependency injection providers
│   │   ├── __init__.py
│   │   ├── conection_info.py   # Connection metadata (IP, user-agent)
│   │   └── db_session.py       # Database session provider
│   ├── models/                 # SQLAlchemy ORM models
│   │   ├── __init__.py
│   │   ├── base.py             # Base model with ID, timestamps
│   │   ├── user.py             # User and UserSession models
│   │   └── __pycache__/
│   ├── repositories/           # Data access layer
│   │   ├── __init__.py
│   │   ├── auth.py             # UserRepository
│   │   ├── session.py          # SessionRepository
│   │   └── __pycache__/
│   ├── routes/                 # HTTP endpoints
│   │   ├── __init__.py
│   │   ├── auth.py             # Auth routes (/v1/auth/*)
│   │   └── __pycache__/
│   ├── schemas/                # Pydantic models for validation
│   │   ├── __init__.py
│   │   ├── auth.py             # Auth request/response models
│   │   └── __pycache__/
│   ├── services/               # Business logic layer
│   │   ├── __init__.py
│   │   ├── auth.py             # AuthService
│   │   └── __pycache__/
│   ├── utils/                  # Utility functions
│   │   ├── __init__.py
│   │   ├── hash.py             # Bcrypt hashing functions
│   │   ├── jwt.py              # JWT token creation/validation
│   │   ├── logger.py           # Loguru configuration
│   │   ├── other.py            # Other utilities
│   │   └── __pycache__/
│   └── __pycache__/
├── tests/                      # Test suite
│   ├── conftest.py             # Fixtures and test configuration
│   ├── README.md               # Testing documentation
│   ├── unit/                   # Unit tests with mocking
│   │   ├── test_auth_service.py
│   │   └── test_utils.py
│   └── integration/            # Integration tests with real DB
│       └── test_auth_endpoints.py
├── logs/                       # Generated log files
│   ├── app.log                 # All debug messages
│   └── errors.log              # Only errors
├── .env                        # Environment variables (not in git)
├── pytest.ini                  # Pytest configuration
├── pyproject.toml              # Project dependencies and metadata
├── README.md                   # This file
└── venv/                       # Virtual environment
```

## Логирование

Логирование настраивается при запуске приложения через `setup_logging()` в [src/main.py](src/main.py).

### Каналы вывода

1. **Console (stdout)**
   - Формат: цветной, с временем, уровнем и номером строки
   - Уровень: INFO и выше
   - Для разработки и мониторинга

2. **logs/app.log**
   - Содержит все сообщения (DEBUG+)
   - Ротация по размеру (500 MB)
   - Хранится 7 дней
   - Архивируется (zip)

3. **logs/errors.log**
   - Только ошибки (ERROR+)
   - Ротация по размеру (500 MB)
   - Хранится 30 дней

### Использование логгера

```python
from loguru import logger

logger.info("User registered successfully")
logger.warning("Suspicious login attempt")
logger.error("Database connection failed")
logger.debug("Cache hit for user_id=123")
```

## Разработка

### Добавление новых endpoints

1. Создайте schema в `schemas/module_name.py`
2. Создайте repository в `repositories/module_name.py` (если нужно)
3. Создайте service в `services/module_name.py`
4. Создайте routes в `routes/module_name.py`
5. Включите router в `main.py`
6. Напишите тесты в `tests/`

### Работа с БД

#### SQLAlchemy async запросы

```python
# В repository
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

async def get_user(self, user_id: str) -> User:
    result = await self.session.execute(
        select(User).where(User.id == user_id)
    )
    return result.scalar_one_or_none()
```

### Тестирование новых features

```python
# Unit test с мокированием
@pytest.mark.asyncio
async def test_my_service(self, mock_repo):
    service = MyService(mock_repo)
    mock_repo.get_something.return_value = expected_data
    
    result = await service.do_something()
    assert result == expected
    mock_repo.get_something.assert_called_once()


# Integration test с реальной БД
@pytest.mark.asyncio
async def test_my_endpoint(self, client, db_session):
    response = client.post("/v1/endpoint", json={...})
    assert response.status_code == 200
```

### Тестирование с curl

```bash
# Регистрация
curl -X POST http://localhost:1080/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","username":"testuser","password":"pass123"}'

# Вход
curl -X POST http://localhost:1080/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"login_identifier":"testuser","password":"pass123"}'
```

## Известные проблемы и TODO

- [ ] Добавить input validation (max length for passwords)
- [ ] Реализовать валидацию сессий (проверка expiration перед использованием)
- [ ] Добавить Rate Limiting
- [ ] Настроить CORS для фронтенда
- [ ] Добавить email verification
- [ ] Реализовать password reset
- [ ] Добавить миграции Alembic
- [ ] Настроить HTTPS в production
- [ ] Добавить end-to-end тесты
- [ ] Документировать API через OpenAPI/Swagger

## Лицензия

MIT
