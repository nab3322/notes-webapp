# Multi-stage build for production optimization

# Stage 1: Build Environment
FROM node:20-alpine as builder

# Set working directory
WORKDIR /app

# Add metadata
LABEL maintainer="Notes Sharing App Team"
LABEL version="1.0.0"
LABEL description="Frontend Angular per Notes Sharing App"

# Copy package files first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production --silent

# Copy source code
COPY . .

# Build application for production
RUN npm run build:prod

# Verify build output
RUN ls -la dist/

# Stage 2: Production Environment
FROM nginx:1.25-alpine

# Install curl for health checks
RUN apk add --no-cache curl

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built application from builder stage
COPY --from=builder /app/dist/notes-sharing-frontend /usr/share/nginx/html

# Create nginx user and set permissions
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001 && \
    chown -R nextjs:nodejs /usr/share/nginx/html && \
    chown -R nextjs:nodejs /var/cache/nginx && \
    chown -R nextjs:nodejs /var/log/nginx && \
    chown -R nextjs:nodejs /etc/nginx/conf.d

# Create pid file directory
RUN touch /var/run/nginx.pid && \
    chown -R nextjs:nodejs /var/run/nginx.pid

# Switch to non-root user for security
USER nextjs

# Add health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:80/health || exit 1

# Expose port 80
EXPOSE 80

# Add labels for better container management
LABEL org.opencontainers.image.title="Notes Sharing Frontend"
LABEL org.opencontainers.image.description="Angular frontend for Notes Sharing Application"
LABEL org.opencontainers.image.version="1.0.0"
LABEL org.opencontainers.image.created="${BUILD_DATE}"
LABEL org.opencontainers.image.source="https://github.com/your-org/notes-sharing-frontend"

# Start nginx in foreground
CMD ["nginx", "-g", "daemon off;"]