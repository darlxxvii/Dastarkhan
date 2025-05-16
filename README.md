🍽 Dastarkhan – Restaurant Reservation System

Dastarkhan — это веб-приложение для бронирования столов, просмотра меню, отзывов и планирования посещений ресторанов. Пользователи могут регистрироваться, бронировать столы, оставлять отзывы и выбирать блюда заранее. Интерфейс интуитивно понятен, а весь функционал интегрирован с картой и системой планирования.

---

## 💖 Команда проекта

Nazerke Zheken - Aruna Karagulova - Dariya Kapuzaeva  

---

## ✨ Основные функции

### **Frontend (Angular)**

- Регистрация, вход и выход пользователей (JWT).  
- Просмотр ресторанов, меню, отзывов, бронирование столов.  
- Фильтрация столов по дате, количеству мест и доступности.  
- Интерактивные компоненты с использованием ngFor, ngIf.  
- Отображение ресторанов на карте (Leaflet).  
- Сервис для работы с API (HttpClient) и перехватчиком токенов.  
- Роутинг по ключевым страницам (меню, отзывы, бронирование).  

---

### **Backend (Django + DRF)**

- **Модели:**
  - **User:** JWT-аутентификация и профили.  
  - **Restaurant:** Информация о ресторанах.  
  - **Table:** Столы с указанием количества мест.  
  - **Booking:** Записи о бронированиях.  
  - **MenuItem:** Пункты меню, привязанные к ресторанам.  
  - **Review:** Отзывы пользователей.  
- CRUD-операции через ModelViewSet.  
- Аутентификация через SimpleJWT.  
- Два FBV (например, регистрация и создание брони) и два CBV (например, список ресторанов и деталей).  
- ForeignKey, ManyToMany, reverse relations.  

---

## 🗂 Структура API

| Метод | URL                                          | Описание                         |
|-------|----------------------------------------------|----------------------------------|
| POST  | /api/register/                               | Регистрация пользователя         |
| POST  | /api/token/                                  | Получение JWT                   |
| GET   | /api/restaurants/                            | Список ресторанов               |
| GET   | /api/restaurants/<id>/menu/                  | Меню ресторана                   |
| POST  | /api/create_booking/                         | Создание бронирования            |
| GET   | /api/restaurants/<id>/available_tables/      | Получить доступные столы         |
| POST  | /api/reviews/                                | Оставить отзыв                   |
| GET   | /api/reviews/<restaurant_id>/                | Список отзывов для ресторана     |

---

## 🌐 Установка

### Backend (Django)

```bash
cd backend
python -m venv env
source env/bin/activate  # Windows: env\Scripts\activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

### Frontend (Angular)

```bash
cd frontend
npm install
ng serve
```

---

## 📌 Дополнительно

- Все компоненты Angular реализованы как standalone.  
- Интерфейс адаптивный и минималистичный.  
- Возможность расширения для подключения оплаты и интеграции с Google Maps.  
- Leaflet-иконки не обязательны, но улучшают отображение карт.  


