# Performance Tests
This folder contains the performance tests for the Adding Value Grant web app. The framework used is Grafana k6.

## Set-up
k6 can be installed and run locally on the machine, or a docker container with k6 is available. See https://grafana.com/docs/k6/latest/set-up/install-k6/.

k6 does not use NodeJS but _npm install_ can be used to install the _@types/k6_ package to give VS Code Intellisense.

## Running k6 in a container
From the `/test/performance` directory run `docker-compose run --build --rm perf-test`. This will run the single performance test defined in script.js.

## Running k6 on a local machine
```pwsh
# change root url as needed
k6 run -e TEST_ENVIRONMENT_ROOT_URL=https://ffc-grants-frontend-test.azure.defra.cloud script.js
```
