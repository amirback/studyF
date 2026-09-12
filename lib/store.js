// Storage layer.
// Production (Vercel): uses Upstash Redis when env vars are present -> shared & persistent.
// Local dev: falls back to a JSON file (.data/db.json). If the filesystem is read-only
// (e.g. Vercel without Redis) it degrades to in-memory so nothing crashes.

import { Redis } from '@upstash/redis';
import fs from 'fs/promises';
import path from 'path';

const REDIS_URL =
  process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const REDIS_TOKEN =
  process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

const USERS_KEY = 'users';
const EVENTS_KEY = 'events';

let redis = null;
if (REDIS_URL && REDIS_TOKEN) {
  redis = new Redis({ url: REDIS_URL, token: REDIS_TOKEN });
}

// ---------- local fallback (dev / no-redis) ----------
const DB_FILE = path.join(process.cwd(), '.data', 'db.json');
let memory = { users: {}, events: [] };
let memoryLoaded = false;

async function loadFile() {
  if (memoryLoaded) return memory;
  try {
    const raw = await fs.readFile(DB_FILE, 'utf8');
    memory = JSON.parse(raw);
  } catch {
    memory = { users: {}, events: [] };
  }
  memoryLoaded = true;
  return memory;
}

async function saveFile() {
  try {
    await fs.mkdir(path.dirname(DB_FILE), { recursive: true });
    await fs.writeFile(DB_FILE, JSON.stringify(memory, null, 2), 'utf8');
  } catch {
    // read-only fs -> keep data only in memory for this instance
  }
}

// ---------- public API ----------
export async function getUser(username) {
  const key = String(username || '').toLowerCase();
  if (redis) {
    return (await redis.hget(USERS_KEY, key)) || null;
  }
  await loadFile();
  return memory.users[key] || null;
}

export async function addUser(user) {
  const key = String(user.username || '').toLowerCase();
  const existing = await getUser(key);
  if (existing) return { ok: false, error: 'exists' };
  if (redis) {
    await redis.hset(USERS_KEY, { [key]: user });
  } else {
    await loadFile();
    memory.users[key] = user;
    await saveFile();
  }
  return { ok: true };
}

export async function getAllUsers() {
  let obj = {};
  if (redis) {
    obj = (await redis.hgetall(USERS_KEY)) || {};
  } else {
    await loadFile();
    obj = memory.users;
  }
  return Object.values(obj).sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );
}

export async function addEvent(event) {
  const item = { ...event, at: new Date().toISOString() };
  if (redis) {
    await redis.lpush(EVENTS_KEY, item);
    await redis.ltrim(EVENTS_KEY, 0, 999); // keep last 1000
  } else {
    await loadFile();
    memory.events.unshift(item);
    memory.events = memory.events.slice(0, 1000);
    await saveFile();
  }
  return item;
}

export async function getEvents(limit = 200) {
  if (redis) {
    return (await redis.lrange(EVENTS_KEY, 0, limit - 1)) || [];
  }
  await loadFile();
  return memory.events.slice(0, limit);
}

export async function deleteUser(username) {
  const key = String(username || '').toLowerCase();
  if (redis) {
    await redis.hdel(USERS_KEY, key);
  } else {
    await loadFile();
    delete memory.users[key];
    await saveFile();
  }
  return { ok: true };
}

export async function clearAll() {
  if (redis) {
    await redis.del(USERS_KEY);
    await redis.del(EVENTS_KEY);
  } else {
    memory = { users: {}, events: [] };
    memoryLoaded = true;
    await saveFile();
  }
  return { ok: true };
}

export function usingRedis() {
  return !!redis;
}
