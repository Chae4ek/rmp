# syntax = docker/dockerfile:1.2

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
  python3-venv
# TODO
# npm
# RUN npm install -g pnpm

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
RUN git clone -b main --single-branch https://github.com/Chae4ek/rmp-model.git
WORKDIR /app/rmp-model
RUN python3 -m pip install -r requirements.txt && dvc remote modify origin --local gdrive_service_account_json_file_path /etc/secrets/gdrive
RUN --mount=type=secret,id=gdrive,dst=/etc/secrets/gdrive dvc pull

# EXPOSE 80

RUN useradd --create-home appuser
USER appuser
WORKDIR /app/backend
CMD ["./main"]
