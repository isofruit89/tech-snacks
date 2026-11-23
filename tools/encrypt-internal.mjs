// Verschlüsselt tools/internal.json -> internal.enc.json (AES-GCM, Schlüssel per PBKDF2 aus dem Passwort)
// Aufruf:  node tools/encrypt-internal.mjs "DeinPasswort"
import { webcrypto as crypto } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const password = process.argv[2] || process.env.TECHSNACK_PASSWORD;
if (!password) {
  console.error('Bitte Passwort angeben: node tools/encrypt-internal.mjs "DeinPasswort"');
  process.exit(1);
}

const plain = readFileSync(join(here, 'internal.json'), 'utf8');
JSON.parse(plain); // bricht ab, falls die Liste kein gültiges JSON ist

const ITER = 250000;
const enc = new TextEncoder();
const salt = crypto.getRandomValues(new Uint8Array(16));
const iv = crypto.getRandomValues(new Uint8Array(12));
const baseKey = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']);
const key = await crypto.subtle.deriveKey(
  { name: 'PBKDF2', salt, iterations: ITER, hash: 'SHA-256' },
  baseKey, { name: 'AES-GCM', length: 256 }, false, ['encrypt']
);
const data = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, enc.encode(plain)));
const b64 = (u) => Buffer.from(u).toString('base64');

writeFileSync(join(here, '..', 'internal.enc.json'),
  JSON.stringify({ v: 1, iter: ITER, salt: b64(salt), iv: b64(iv), data: b64(data) }, null, 2));
console.log('internal.enc.json geschrieben (' + JSON.parse(plain).length + ' interne Videos).');
