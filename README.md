# Product Collector

## Start Development Databases

#### First start Docker containers and Images
```console
./bash/docker_services.bash start
```
#### Then dump the data
```console
docker exec product_collector_mongo export ./mongo.bash dump
```
#### At last restore the dumped data
```console
docker exec product_collector_mongo ./mongo.bash data
```

## Stop Development Databases

```console
./bash/docker_services.bash stop
```

## Clean Docker Images, Volumes and Containers

```console
./bash/docker_services.bash clean
```

## Bash Help

```console
./bash/docker_services.bash
./bash/mongo.bash
```