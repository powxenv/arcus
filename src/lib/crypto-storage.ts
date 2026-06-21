// Encrypted localStorage via the Web Crypto API (AES-GCM, 256-bit).
//
// Note: this is client-side-only encryption. The key material lives in the
// bundle, so this protects progress from casual inspection, not from a
// determined attacker with console access. That is the right tradeoff for
// "continue later" progress on a non-clinical tool.

const APP_PASSPHRASE = "arcus::local-progress::v1";
const SALT = "arcus::salt::v1::fixed";
const ITERATIONS = 120_000;

let keyPromise: Promise<CryptoKey> | null = null;

async function deriveKey(): Promise<CryptoKey> {
  if (typeof globalThis.crypto?.subtle === "undefined") {
    throw new Error("Encrypted storage requires a secure context (HTTPS).");
  }
  if (!keyPromise) {
    keyPromise = (async () => {
      const enc = new TextEncoder();
      const baseKey = await crypto.subtle.importKey(
        "raw",
        enc.encode(APP_PASSPHRASE),
        "PBKDF2",
        false,
        ["deriveKey"],
      );
      return crypto.subtle.deriveKey(
        {
          name: "PBKDF2",
          salt: enc.encode(SALT),
          iterations: ITERATIONS,
          hash: "SHA-256",
        },
        baseKey,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt", "decrypt"],
      );
    })();
  }
  return keyPromise;
}

function toBase64(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function fromBase64(value: string): Uint8Array {
  const binary = atob(value);
  const out = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    out[i] = binary.charCodeAt(i);
  }
  return out;
}

export async function encryptJSON(value: unknown): Promise<string> {
  const key = await deriveKey();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const data = new TextEncoder().encode(JSON.stringify(value));
  const cipher = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv: iv as BufferSource },
    key,
    data as BufferSource,
  );
  return `${toBase64(iv)}.${toBase64(new Uint8Array(cipher))}`;
}

export async function decryptJSON<T>(payload: string): Promise<T> {
  const [ivPart, dataPart] = payload.split(".");
  if (!ivPart || !dataPart) throw new Error("Invalid encrypted payload.");
  const key = await deriveKey();
  const iv = fromBase64(ivPart);
  const cipher = fromBase64(dataPart);
  const plain = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: iv as BufferSource },
    key,
    cipher as BufferSource,
  );
  return JSON.parse(new TextDecoder().decode(plain)) as T;
}

export async function setEncryptedItem(key: string, value: unknown): Promise<void> {
  if (typeof window === "undefined") return;
  const payload = await encryptJSON(value);
  window.localStorage.setItem(key, payload);
}

export async function getEncryptedItem<T>(key: string): Promise<T | null> {
  if (typeof window === "undefined") return null;
  const payload = window.localStorage.getItem(key);
  if (!payload) return null;
  try {
    return await decryptJSON<T>(payload);
  } catch {
    return null;
  }
}

export function removeStoredItem(key: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(key);
}
