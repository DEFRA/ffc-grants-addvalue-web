# Performance Tests
This folder contains the k6 performance tests for the Adding Value Grant Eligibility Checker.

## Set up
k6 can be installed and run locally on the machine, or a docker container with k6 is available. See https://grafana.com/docs/k6/latest/set-up/install-k6/.

k6 does not use NodeJS but _npm install_ can be used to install the _@types/k6_ package to give intellisense in VS Code.

## Running the tests in a container
```
docker-compose run --build --rm perf-test
```

## Running the tests with a local k6 install
```
# set environment variables or specify on the command-line using the -e flag
k6 run script.js -e TEST_ENVIRONMENT_ROOT_URL=https://hostname -e LOGIN_USERNAME=usr -e LOGIN_PASSWORD=pw
```