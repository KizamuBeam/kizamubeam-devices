# KizamuBeam Devices

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/brand/kizamubeam-logo-dark.png">
    <img src="docs/brand/kizamubeam-logo.png" alt="KizamuBeam" width="520">
  </picture>
</p>

<p align="center">
  <b>Community and manufacturer device profiles (machine templates) for KizamuBeam.</b>
</p>

<p align="center">
  <a href="https://github.com/KizamuBeam/kizamubeam">KizamuBeam</a> ·
  <a href="https://github.com/KizamuBeam/kizamubeam-plugins">Plugins</a> ·
  <a href="https://github.com/KizamuBeam/kizamubeam-packs">Packs</a> ·
  <a href="https://kizamubeam.github.io/kizamubeam/docs/">Manual</a> ·
  <a href="https://discord.gg/SSr8VHh7EJ">Discord</a> ·
  <a href="README.de.md">Deutsch</a>
</p>

This repository collects verified laser cutter and engraver profiles for [KizamuBeam](https://github.com/KizamuBeam/kizamubeam).

## Repository Structure

| Folder | Purpose |
| --- | --- |
| `devices/` | One JSON profile per machine (`<manufacturer>/<model>.json`) |
| `scripts/` | Validation (`validate.mjs`) and `.kzp` bundle generator (`build-pack.mjs`) |

## Contributing a Device Profile

1. Add `devices/<manufacturer>/<model>.json` following [devices/README.md](devices/README.md) and the [device preset specification](https://github.com/KizamuBeam/kizamubeam/blob/main/docs/packs.md#device-presets-devices).
2. Always include `source`, `sourceUrl` (if available), and `checked` (`YYYY-MM-DD`). Only fill in values confirmed by a source or direct measurement.
3. Validate locally before opening a pull request:
   ```bash
   npm test
   ```

## License

GPL-3.0-or-later — see [LICENSE](LICENSE).
