# Master OSINT - Production Dockerfile
# Multi-stage build: lightweight Python server for static assets

FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy frontend assets
COPY frontend/ ./frontend/
COPY scripts/ ./scripts/
COPY README.md PROGRESS.md PHASES.md DOCUMENTATION.md ./

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/ || exit 1

# Run Python HTTP server
CMD ["python", "-m", "http.server", "8000", "--directory", "frontend"]

# Labels for container metadata
LABEL maintainer="masudrana-ceh@github.com"
LABEL version="1.0"
LABEL description="Master OSINT Intelligence Platform - Ethical OSINT analysis tool"
LABEL org.opencontainers.image.source="https://github.com/masudrana-ceh/master-osint-v1"
