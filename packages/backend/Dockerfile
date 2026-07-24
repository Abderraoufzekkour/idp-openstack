
FROM node:22-bookworm-slim



# Force IPv4 for apt to avoid IPv6-only DNS timeout issues

RUN echo 'Acquire::ForceIPv4 "true";' > /etc/apt/apt.conf.d/99force-ipv4



RUN apt-get update && \

    apt-get install -y --no-install-recommends \

    python3 \

    g++ \

    build-essential \

    && rm -rf /var/lib/apt/lists/*



WORKDIR /app



COPY yarn.lock package.json .yarnrc.yml ./

COPY .yarn ./.yarn



COPY packages/backend/dist/skeleton.tar.gz ./

RUN tar xzf skeleton.tar.gz && rm skeleton.tar.gz



RUN yarn workspaces focus --all --production



COPY packages/backend/dist/bundle.tar.gz ./

RUN tar xzf bundle.tar.gz && rm bundle.tar.gz



COPY app-config.yaml ./



EXPOSE 7007



CMD ["node", "packages/backend", "--config", "app-config.yaml"]

