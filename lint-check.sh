#!/bin/bash

# Run linting and capture output
yarn lint 2>&1 | tee lint-output.txt

# Check if there are any critical errors (MD009, MD012, MD013, MD041)
if grep -q "MD009\|MD012\|MD013\|MD041" lint-output.txt; then
  echo "❌ Found critical errors - PR validation failed"
  cat lint-output.txt
  exit 1
fi

# Check for warning-level violations (MD025, MD024, MD026)
if grep -q "MD025\|MD024\|MD026" lint-output.txt; then
  echo "⚠️ Found style warnings (these won't fail the PR):"
  grep "MD025\|MD024\|MD026" lint-output.txt || true
fi

echo "✅ Linting completed successfully" 