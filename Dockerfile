
FROM node:22-bullseye-slim


# set the working directory
WORKDIR /app

# copy the package.json files
COPY frontend/package*.json ./frontend/
COPY backend/package*.json ./backend/

# Install the dependencies
RUN cd ./frontend && npm install
RUN cd ./backend && npm install

# Copy the source code
COPY --chown=node:node frontend/ ./frontend/
COPY --chown=node:node backend/src ./backend/src

# build the frontend
RUN cd frontend && npm run build


# expose the port
EXPOSE 6060

CMD ["node", "backend/src/server.js"]


