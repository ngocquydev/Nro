FROM node:lts-alpine

# XÓA HOẶC ĐỔI dòng này thành development
ENV NODE_ENV=development

WORKDIR /usr/src/app

# Copy file định nghĩa thư viện
COPY package*.json ./

# Cài đặt tất cả thư viện (bao gồm cả devDependencies)
RUN npm install

# Copy toàn bộ code còn lại
COPY . .

# Mở cổng
EXPOSE 3000

# Phân quyền cho user node
RUN chown -R node /usr/src/app
USER node

# Chạy lệnh dev
CMD ["npm", "run", "dev"]