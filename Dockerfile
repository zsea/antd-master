FROM node AS build
COPY . /src
WORKDIR /src
RUN npm install
RUN npm run build

FROM zzswang/docker-nginx-react:latest AS final
LABEL "author"="<zsea@tao11.net>"
ENV DEBUG=off
COPY --from=build /src/build/ /app