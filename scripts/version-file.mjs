// Deja en public/version.json la versión que se está publicando,
// para que el juego abierto en otro navegador sepa que hay una nueva
import { readFileSync, writeFileSync } from 'node:fs';

const fuente = readFileSync(new URL('../src/version.js', import.meta.url), 'utf8');
const version = fuente.match(/VERSION\s*=\s*'([^']+)'/)?.[1];

if (!version) {
  console.error('No se encontró la versión en src/version.js');
  process.exit(1);
}

writeFileSync(new URL('../public/version.json', import.meta.url), JSON.stringify({ version }) + '\n');
console.log('version.json ->', version);
