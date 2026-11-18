# KizamuBeam Devices

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/brand/kizamubeam-logo-dark.png">
    <img src="docs/brand/kizamubeam-logo.png" alt="KizamuBeam" width="520">
  </picture>
</p>

<p align="center">
  <b>Community- und Hersteller-Geräteprofile (Maschinenvorlagen) für KizamuBeam.</b>
</p>

<p align="center">
  <a href="https://github.com/KizamuBeam/kizamubeam">KizamuBeam</a> ·
  <a href="https://github.com/KizamuBeam/kizamubeam-plugins">Plugins</a> ·
  <a href="https://github.com/KizamuBeam/kizamubeam-packs">Pakete</a> ·
  <a href="https://kizamubeam.github.io/kizamubeam/docs/">Handbuch</a> ·
  <a href="https://discord.gg/SSr8VHh7EJ">Discord</a> ·
  <a href="README.md">English</a>
</p>

Dieses Repository sammelt geprüfte Geräteprofile für Lasercutter und -gravierer für [KizamuBeam](https://github.com/KizamuBeam/kizamubeam).

## Verzeichnisstruktur

| Ordner | Zweck |
| --- | --- |
| `devices/` | Eine JSON-Datei pro Gerät (`<hersteller>/<modell>.json`) |
| `scripts/` | Validierung (`validate.mjs`) und `.kzp`-Paket-Generator (`build-pack.mjs`) |

## Geräteprofil beitragen

1. Erstelle `devices/<hersteller>/<modell>.json` gemäß [devices/README.md](devices/README.md) und der [Gerätevorlagen-Spezifikation](https://github.com/KizamuBeam/kizamubeam/blob/main/docs/packs.md#device-presets-devices).
2. Gib immer `source`, `sourceUrl` (falls vorhanden) und `checked` (`YYYY-MM-DD`) an. Trage nur Werte ein, die durch eine Quelle oder eigene Messung belegt sind.
3. Vor dem Pull Request lokal prüfen:
   ```bash
   npm test
   ```

## Lizenz

GPL-3.0-or-later — siehe [LICENSE](LICENSE).
