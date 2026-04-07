Yêu cầu
- Node.js
- Docker
- MySQL

### 1. Clone project

```
git clone https://github.com/Nht2004/SNA-Project.git
```
### 2. Tạo .env trong backend
```
PORT=
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=
```
### 3. Docker
Build
```
docker-compose build
```

Check docker create success
```
docker ps
```

### 4. Run

 a. chạy docker thui
```
docker-compose up mysql
docker-compose up backend
docker-compose up frontend
xong truy cập http://localhost:8080
```
 b. chạy trên local (cài đặt node các thứ các thứ và nhớ đổi .env)

```
cd backend
npm install
node server.js hoặc npm start
cd ..
cd frontend
start index.html
```

