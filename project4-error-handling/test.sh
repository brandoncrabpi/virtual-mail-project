#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

LOG_FILE="test.log"
> "$LOG_FILE"

echo "Running test.coordinate.js..." | tee -a "$LOG_FILE"
node test.coordinate.js 2>&1 | tee -a "$LOG_FILE"

echo "Running test.coordinate.errors.js..." | tee -a "$LOG_FILE"
node test.coordinate.errors.js 2>&1 | tee -a "$LOG_FILE"

echo "Running test.mailhub.js..." | tee -a "$LOG_FILE"
node test.mailhub.js 2>&1 | tee -a "$LOG_FILE"

echo "Running test.mailhub.errors.js..." | tee -a "$LOG_FILE"
node test.mailhub.errors.js 2>&1 | tee -a "$LOG_FILE"

echo "Running test.mailroute.js..." | tee -a "$LOG_FILE"
node test.mailroute.js 2>&1 | tee -a "$LOG_FILE"

echo "Running test.mailroute.errors.js..." | tee -a "$LOG_FILE"
node test.mailroute.errors.js 2>&1 | tee -a "$LOG_FILE"

echo "Running test.helpers.js..." | tee -a "$LOG_FILE"
node test.helpers.js 2>&1 | tee -a "$LOG_FILE"

echo "Running test.helpers.errors.js..." | tee -a "$LOG_FILE"
node test.helpers.errors.js 2>&1 | tee -a "$LOG_FILE"

echo "Running test.custom-errors.js..." | tee -a "$LOG_FILE"
node test.custom-errors.js 2>&1 | tee -a "$LOG_FILE"

echo "Running test.js..." | tee -a "$LOG_FILE"
node test.js 2>&1 | tee -a "$LOG_FILE"

echo "All tests completed!" | tee -a "$LOG_FILE"