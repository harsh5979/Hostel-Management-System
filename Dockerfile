FROM node:22-alpine
WORKDIR frontend
COPY . .
RUN npm install
RUN npm run build
EXPOSE 8000
CMD ["npm", "run", "preview"]