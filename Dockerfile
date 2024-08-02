FROM node:alpine
	WORKDIR app2
	COPY . .
	RUN npm install
        RUN npm run build
	EXPOSE 8000
	CMD ["npm", "run", "preview"]