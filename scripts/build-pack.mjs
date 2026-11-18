#!/usr/bin/env node
// Bundles all device profiles under devices/ into a single KizamuBeam extension pack (.kzp).
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const root = resolve(new URL('..', import.meta.url).pathname);
const devicesDir = join(root, 'devices');
const outDir = join(root, 'dist');
const outFile = join(outDir, 'org.kizamubeam.devices.kzp');

const devices = [];
if (existsSync(devicesDir)) {
  const files = [];
  for (const entry of readdirSync(devicesDir, { recursive: true, withFileTypes: true })) {
    if (entry.isFile() && entry.name.endsWith('.json')) {
      files.push(join(entry.parentPath, entry.name));
    }
  }
  files.sort((a, b) => relative(devicesDir, a).localeCompare(relative(devicesDir, b)));
  for (const f of files) {
    devices.push(JSON.parse(readFileSync(f, 'utf8')));
  }
}

const pack = {
  format: 'kizamubeam-pack',
  formatVersion: 1,
  id: 'org.kizamubeam.devices',
  version: '0.1.0',
  name: { en: 'KizamuBeam Device Profiles', de: 'KizamuBeam Geräteprofile' },
  description: {
    en: 'Community and manufacturer device profiles for KizamuBeam.',
    de: 'Community- und Hersteller-Geräteprofile für KizamuBeam.'
  },
  author: 'KizamuBeam',
  homepage: 'https://github.com/KizamuBeam/kizamubeam-devices',
  devices
};

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, JSON.stringify(pack, null, 2) + '\n');
console.log(`Wrote ${outFile} (${devices.length} device(s)).`);
