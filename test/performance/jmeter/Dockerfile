FROM alpine/jmeter
VOLUME ["/logs", "/html-reports"]
COPY test-plan.jmx .
CMD ["-n -t test-plan.jmx -l /logs/log.csv -e -o /html-reports"]
