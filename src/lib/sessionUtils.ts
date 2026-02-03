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
  return `ar_${crypto.randomUUID()}`;
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
