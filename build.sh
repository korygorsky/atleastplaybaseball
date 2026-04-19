#!/usr/bin/env bash
# Transpile JSX sources -> JS. Run after editing any *.jsx.
set -e
cd "$(dirname "$0")"
for f in DiamondPitch Motifs components-1 components-2 components-3 components-4 app; do
  bunx esbuild "$f.jsx" --loader:.jsx=jsx --target=es2020 --log-level=warning > "$f.js"
  echo "  built $f.js"
done
