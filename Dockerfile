# استفاده از تصویر رسمی Node.js به عنوان پایه
FROM node:18

# مسیر کاری را در داخل کانتینر تنظیم می‌کنیم
WORKDIR /app

# کپی کردن پرونده package.json و package-lock.json
COPY package*.json ./

# نصب وابستگی‌های پروژه
RUN npm install

# کپی کردن کدهای پروژه
COPY . .

# پورتی که برنامه در آن اجرا می‌شود را مشخص می‌کنیم
EXPOSE 3000

# دستور اجرای برنامه
CMD [ "node", "server.js"]