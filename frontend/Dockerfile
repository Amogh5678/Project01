# Stage 1: Build the frontend
FROM node:18 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Build production files
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy build files to nginx html folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
