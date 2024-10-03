# Performance Tests
This folder contains the single performance test for the Adding Value Grant web app. The framework used is Grafana k6.

## Set up
k6 can be installed and run locally on the machine, or a docker container with k6 is available. See https://grafana.com/docs/k6/latest/set-up/install-k6/.

k6 does not use NodeJS but _npm install_ can be used to install the _@types/k6_ package to give intellisense in VS Code.

## Running the test in a container
```pwsh
docker-compose run --build --rm perf-test
```

## Running the tests against a local k6 installation
```pwsh
k6 run -e TEST_ENVIRONMENT_ROOT_URL=https://ffc-grants-frontend-test.azure.defra.cloud script.js
```