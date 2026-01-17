// Session管理工具 - 用于匿名用户标识

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
  // 生成格式: ar_时间戳_随机字符串
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 10);
  return `ar_${timestamp}_${randomPart}`;
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
}

// 生成分享链接用的短ID
export function generateShareId(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
