#  Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

# Instalar dependencias (incluye dev si necesitas compilar)
COPY package*.json ./
RUN npm ci

# Copiar código
COPY . .

# Stage 2: Production
FROM node:22-alpine

WORKDIR /app

# Copiar solo lo necesario desde builder
COPY --from=builder /app ./

# Instalar solo dependencias de producción
RUN npm ci 
EXPOSE 3000

CMD ["npm", "start"]