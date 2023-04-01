## Up in docker

Step 1:
Change envsConfig.postgres_host to envsConfig.postgres_docker_host at app.module.ts
example => host: envsConfig.postgres_docker_host

Step 2:
$ docker-compose up

## Documentation: http://localhost:3000/api/doc or http://localhost:5000/api/doc in docker
