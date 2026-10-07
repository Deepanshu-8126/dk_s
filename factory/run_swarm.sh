#!/usr/bin/env bash
set -e
echo "========================================================"
echo " ⚡ Starting Loki 42-Agent Autonomous Swarm Harness"
echo "========================================================"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
python3 "$SCRIPT_DIR/loki_swarm_harness.py" "$@"
