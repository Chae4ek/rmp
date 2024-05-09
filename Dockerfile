FROM golang:latest as builder

WORKDIR /app
COPY backend/ backend/

# compile backend
WORKDIR /app/backend
RUN go build -tags netgo -ldflags '-s -w' -o main

FROM debian:bookworm-slim

# install dependencies
RUN apt-get update -y && apt-get install -y \
  git \
  python3 \
  python3-pip \
  python3-venv \
  npm
RUN npm install -g pnpm

RUN useradd --create-home appuser
USER appuser
WORKDIR /app

COPY frontend/ frontend/
COPY --from=builder --chown=appuser /app/backend/main backend/main
COPY requirements.txt requirements.txt

# create python .venv
RUN python3 -m venv .venv
# alternative: RUN . .venv/bin/activate && python3 -m pip install -r requirements.txt
ENV PATH="/app/.venv/bin:$PATH"
RUN python3 -m pip install -r requirements.txt

# get latest changes
RUN git clone -b main --single-branch git@github.com:Chae4ek/rmp-model.git
RUN cd rmp-model && python3 -m pip install -r requirements.txt && dvc pull -r origin

# EXPOSE 80

WORKDIR /app/backend
CMD ["./main"]
