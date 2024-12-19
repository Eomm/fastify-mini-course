import fs from 'fs/promises';
import { join } from 'node:path'

let config = {
  MY_ENV_VAR: 'default-value',
};

export async function loadConfig() {
  try {
    const fileContent = await fs.readFile(join(process.cwd(), 'day-2', 'reload-config', 'config.json'), 'utf8');
    config = JSON.parse(fileContent);
  } catch (err) {
    console.error('Error loading configuration, using defaults:', err.message);
  }
}

export function getConfig() {
  return config;
}

