#!/usr/bin/env node
// Validates all device preset JSON files under devices/<manufacturer>/<model>.json.
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const root = resolve(new URL('..', import.meta.url).pathname);
const devicesDir = join(root, 'devices');

const VALID_FW = new Set(['fluidnc', 'grbl', 'grblhal', 'marlin', 'smoothie']);
const VALID_CONN = new Set(['serial', 'tcp', 'ws']);
const VALID_AIR = new Set(['M7', 'M8']);
const VALID_LASER_TYPE = new Set(['diode', 'ir', 'co2', 'fiber']);
const VALID_FEATURES = new Set(['air-assist', 'autofocus', 'camera', 'enclosure', 'wifi', 'bluetooth', 'offline']);
const FORBIDDEN_KEYS = new Set(['startScript', 'endScript', 'rotary', 'agentMaxPower', 'laserFire', 'frameLaser']);

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

function isLocalText(v) {
  if (typeof v === 'string') return v.trim().length > 0 && v.length <= 80;
  if (v && typeof v === 'object' && !Array.isArray(v)) {
    const vals = Object.values(v);
    return vals.length > 0 && vals.every((s) => typeof s === 'string' && s.trim().length > 0 && s.length <= 80);
  }
  return false;
}

function isLoopbackHost(h) {
  if (h === 'localhost') return true;
  if (typeof h !== 'string') return false;
  const m = /^127\.(\d+)\.(\d+)\.(\d+)$/.exec(h);
  if (!m) return false;
  return m.slice(1).every((n) => Number(n) >= 0 && Number(n) <= 255);
}

function validateDevice(file, raw, seenIds) {
  const rel = relative(devicesDir, file).replace(/\\/g, '/');
  const parts = rel.split('/');
  assert(parts.length === 2 && parts[1].endsWith('.json'), `${rel}: expected <manufacturer>/<model>.json`);
  const [manufacturer, fileName] = parts;
  const expectedId = `${manufacturer}.${fileName.replace(/\.json$/, '')}`;

  assert(raw && typeof raw === 'object' && !Array.isArray(raw), `${rel}: root must be an object`);
  for (const k of Object.keys(raw)) {
    assert(!FORBIDDEN_KEYS.has(k), `${rel}: forbidden field "${k}"`);
  }

  assert(raw.id === expectedId, `${rel}: id must be "${expectedId}" (got "${raw.id}")`);
  assert(!seenIds.has(raw.id), `${rel}: duplicate id "${raw.id}"`);
  seenIds.add(raw.id);

  assert(isLocalText(raw.name), `${rel}: missing or invalid name`);
  assert(VALID_FW.has(raw.fw), `${rel}: invalid fw "${raw.fw}"`);
  assert(typeof raw.bedW === 'number' && raw.bedW >= 10 && raw.bedW <= 5000, `${rel}: bedW must be 10..5000`);
  assert(typeof raw.bedH === 'number' && raw.bedH >= 10 && raw.bedH <= 5000, `${rel}: bedH must be 10..5000`);

  if (manufacturer !== 'generic') {
    assert(isLocalText(raw.vendor), `${rel}: vendor is required for manufacturer presets`);
    assert(typeof raw.source === 'string' && raw.source.trim().length > 0, `${rel}: source is required`);
    assert(typeof raw.checked === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(raw.checked), `${rel}: checked must be YYYY-MM-DD`);
  }

  if (raw.sourceUrl !== undefined) {
    assert(typeof raw.sourceUrl === 'string' && raw.sourceUrl.startsWith('https://'), `${rel}: sourceUrl must start with https://`);
  }
  if (raw.host !== undefined) {
    assert(isLoopbackHost(raw.host), `${rel}: host must be localhost or 127.x.x.x`);
  }
  if (raw.conn !== undefined) assert(VALID_CONN.has(raw.conn), `${rel}: invalid conn`);
  if (raw.airCmd !== undefined) assert(VALID_AIR.has(raw.airCmd), `${rel}: invalid airCmd`);
  if (raw.laser !== undefined) {
    assert(raw.laser && typeof raw.laser === 'object', `${rel}: laser must be an object`);
    if (raw.laser.type !== undefined) assert(VALID_LASER_TYPE.has(raw.laser.type), `${rel}: invalid laser.type`);
  }
  if (raw.features !== undefined) {
    assert(Array.isArray(raw.features), `${rel}: features must be an array`);
    for (const f of raw.features) assert(VALID_FEATURES.has(f), `${rel}: unknown feature "${f}"`);
  }
  if (raw.variants !== undefined) {
    assert(Array.isArray(raw.variants) && raw.variants.length >= 1 && raw.variants.length <= 12, `${rel}: variants must have 1..12 entries`);
    for (const v of raw.variants) {
      assert(v && typeof v === 'object', `${rel}: variant must be an object`);
      assert(typeof v.id === 'string' && /^[a-z0-9-]+$/.test(v.id), `${rel}: invalid variant id "${v.id}"`);
      assert(isLocalText(v.name), `${rel}: variant "${v.id}" missing name`);
    }
  }
}

let count = 0;
const seenIds = new Set();
if (existsSync(devicesDir)) {
  for (const entry of readdirSync(devicesDir, { recursive: true, withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith('.json')) continue;
    const filePath = join(entry.parentPath, entry.name);
    const raw = JSON.parse(readFileSync(filePath, 'utf8'));
    validateDevice(filePath, raw, seenIds);
    count++;
  }
}

console.log(`Validated ${count} device profile(s).`);
