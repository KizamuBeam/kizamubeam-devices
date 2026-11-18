# Device Profiles

One JSON file per device: `<manufacturer>/<model>.json` (or `generic/<preset>.json`).

Required fields:
- `id`: `<manufacturer>.<model>` matching the file path (e.g. `ortur/laser-master-3.json` -> `ortur.laser-master-3`)
- `vendor`: manufacturer display name (required outside `generic/`)
- `name`: model name (string or `{ "en": "...", "de": "..." }`)
- `fw`: `grbl`, `grblhal`, `fluidnc`, `marlin`, or `smoothie`
- `bedW`, `bedH`: work area in mm (`10` to `5000`)
- `source`: where the values come from (required outside `generic/`)
- `checked`: `YYYY-MM-DD` date values were verified against the source (required outside `generic/`)

Run `npm test` from the repository root to validate all files.
