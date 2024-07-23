# Stage 1: Build the Angular app
FROM node:16-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build --prod

# Stage 2: Serve the Angular app with Nginx
FROM nginx:alpine

COPY --from=build /app/dist/shopping-basket-frontend /usr/share/nginx/html
# Copy the custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
