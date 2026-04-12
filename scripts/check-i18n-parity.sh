#!/usr/bin/env bash
set -euo pipefail

command -v jq >/dev/null 2>&1 || { echo "ERROR: jq is required but not installed"; exit 1; }

MESSAGES_DIR="${1:-apps/money-tracker/messages}"
REFERENCE_LOCALE="en"
REFERENCE_DIR="$MESSAGES_DIR/$REFERENCE_LOCALE"

extract_keys() {
  jq -r '[paths(scalars)] | map(join(".")) | .[]' "$1" | sort
}

has_mismatch=0

for locale_dir in "$MESSAGES_DIR"/*/; do
  locale=$(basename "$locale_dir")
  [[ "$locale" == "$REFERENCE_LOCALE" ]] && continue

  secondary_dir="$MESSAGES_DIR/$locale"

  while IFS= read -r -d '' reference_file; do
    filename="${reference_file##*/}"
    secondary_file="$secondary_dir/$filename"

    if [[ ! -f "$secondary_file" ]]; then
      echo "MISSING: $locale/$filename not found"
      has_mismatch=1
      continue
    fi

    reference_keys=$(extract_keys "$reference_file")
    secondary_keys=$(extract_keys "$secondary_file")

    missing_in_secondary=$(comm -23 <(echo "$reference_keys") <(echo "$secondary_keys"))
    extra_in_secondary=$(comm -13 <(echo "$reference_keys") <(echo "$secondary_keys"))

    if [[ -n "$missing_in_secondary" ]]; then
      echo "MISSING keys in $locale/$filename:"
      echo "$missing_in_secondary" | sed 's/^/  /'
      has_mismatch=1
    fi

    if [[ -n "$extra_in_secondary" ]]; then
      echo "EXTRA keys in $locale/$filename (not in $REFERENCE_LOCALE):"
      echo "$extra_in_secondary" | sed 's/^/  /'
      has_mismatch=1
    fi
  done < <(find "$REFERENCE_DIR" -name "*.json" -print0 | sort -z)

  while IFS= read -r -d '' secondary_file; do
    filename="${secondary_file##*/}"
    reference_file="$REFERENCE_DIR/$filename"

    if [[ ! -f "$reference_file" ]]; then
      echo "EXTRA: $locale/$filename has no matching $REFERENCE_LOCALE file"
      has_mismatch=1
    fi
  done < <(find "$secondary_dir" -name "*.json" -print0 | sort -z)
done

if [[ "$has_mismatch" -eq 0 ]]; then
  echo "i18n key parity check passed for all files in $MESSAGES_DIR"
fi

exit "$has_mismatch"
