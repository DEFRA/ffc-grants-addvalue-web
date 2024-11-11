rm -r -f ./html-reports
rm -r -f ./logs

docker-compose run --build --rm perf-test
