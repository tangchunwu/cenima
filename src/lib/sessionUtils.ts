// Session管理工具 - 用于匿名用户标识
// 使用加密安全的随机ID来防止会话ID被猜测或枚举

const SESSION_KEY = 'annual_report_session_id';

export function getSessionId(): string {
  // 优先从localStorage获取
  let sessionId = localStorage.getItem(SESSION_KEY);
  
  if (!sessionId) {
    // 生成新的sessionId
    sessionId = generateSessionId();
    localStorage.setItem(SESSION_KEY, sessionId);
  }
  
  return sessionId;
}

export function generateSessionId(): string {
  // 使用加密安全的 UUID v4 替代弱随机数
  // crypto.randomUUID() 生成符合 RFC 4122 的 UUID v4
  // 提供 122 位随机熵，实际上不可能被猜测或枚举
  
  // 兼容性检查：如果 crypto.randomUUID 不可用，使用 fallback 方案
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `ar_${crypto.randomUUID()}`;
  }
  
  // Fallback: 使用 crypto.getRandomValues 生成 UUID v4
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  
  // 设置 UUID v4 的特定位
  array[6] = (array[6] & 0x0f) | 0x40; // 版本 4
  array[8] = (array[8] & 0x3f) | 0x80; // variant 10
  
  const hex = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  const uuid = `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
  
  return `ar_${uuid}`;
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
}

// 生成分享链接用的短ID - 使用加密安全的随机数
export function generateShareId(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  const array = new Uint8Array(8);
  crypto.getRandomValues(array);
  
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(array[i] % chars.length);
  }
  return result;
}
