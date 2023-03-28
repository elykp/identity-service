FROM node:16-alpine AS web_builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn 

COPY . .

RUN yarn build

FROM quay.io/keycloak/keycloak:21.0.1 AS builder

# Enable health and metrics support
ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true

ENV KC_DB=postgres

WORKDIR /opt/keycloak

RUN keytool -genkeypair -storepass password -storetype PKCS12 -keyalg RSA -keysize 2048 -dname "CN=server" -alias server -ext "SAN:c=DNS:localhost,IP:127.0.0.1" -keystore conf/server.keystore
RUN /opt/keycloak/bin/kc.sh build

FROM quay.io/keycloak/keycloak:21.0.1

ENV KC_DB=postgres

COPY --from=builder /opt/keycloak/ /opt/keycloak/
COPY --from=web_builder /app/dist/src/themes/ /opt/keycloak/themes/

ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]