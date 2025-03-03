FROM node:latest
WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm install

COPY . .
RUN npm run build

FROM nginx:latest

# Copy the nginx.conf file into the container at /etc/nginx/nginx.conf
COPY .github/config/nginx.conf /etc/nginx/nginx.conf

# Copy the build output from the previous stage into the current stage
COPY --from=0 /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]