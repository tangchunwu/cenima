import { useState, useEffect, useRef, memo } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean; // 关键图片立即加载
  placeholder?: 'blur' | 'empty';
  onLoad?: () => void;
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}

// 图片预加载缓存
const imageCache = new Set<string>();
const loadingPromises = new Map<string, Promise<void>>();

// 预加载图片 - 使用 fetchpriority 和 link preload
export const preloadImage = (src: string, highPriority = false): Promise<void> => {
  if (imageCache.has(src)) return Promise.resolve();
  if (loadingPromises.has(src)) return loadingPromises.get(src)!;
  
  const promise = new Promise<void>((resolve) => {
    // 对高优先级图片使用 link preload
    if (highPriority && typeof document !== 'undefined') {
      const existingLink = document.querySelector(`link[href="${src}"]`);
      if (!existingLink) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        link.fetchPriority = 'high';
        document.head.appendChild(link);
      }
    }
    
    const img = new Image();
    img.onload = () => {
      imageCache.add(src);
      loadingPromises.delete(src);
      resolve();
    };
    img.onerror = () => {
      loadingPromises.delete(src);
      resolve(); // 即使失败也 resolve，避免阻塞
    };
    // 设置 fetchpriority
    if (highPriority) {
      (img as any).fetchPriority = 'high';
    }
    img.src = src;
  });
  
  loadingPromises.set(src, promise);
  return promise;
};

// 批量预加载 - 高优先级立即加载，其余并行
export const preloadImages = (srcs: string[], priorityCount = 5): Promise<void[]> => {
  const priority = srcs.slice(0, priorityCount);
  const rest = srcs.slice(priorityCount);
  
  // 立即预加载高优先级图片
  const priorityPromises = priority.map(src => preloadImage(src, true));
  const restPromises = rest.map(src => preloadImage(src, false));
  
  return Promise.all([...priorityPromises, ...restPromises]);
};

// 检查图片是否已缓存
export const isImageCached = (src: string): boolean => imageCache.has(src);

const OptimizedImageComponent = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  placeholder = 'blur',
  onLoad,
  onError
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(imageCache.has(src));
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Intersection Observer 懒加载
  useEffect(() => {
    if (priority || isLoaded) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '200px', // 提前200px开始加载
        threshold: 0.01
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority, isLoaded]);

  const handleLoad = () => {
    imageCache.add(src);
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setHasError(true);
    onError?.(e);
  };

  // 模糊占位符样式
  const placeholderStyle = placeholder === 'blur' && !isLoaded && !hasError
    ? 'blur-sm scale-105'
    : '';

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* 骨架屏/占位符 */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-700/50 to-slate-800/50 animate-pulse" />
      )}
      
      {/* 实际图片 */}
      {(isInView || isLoaded) && !hasError && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={`
            w-full h-full object-cover
            transition-all duration-500 ease-out
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
            ${placeholderStyle}
          `}
        />
      )}

      {/* 错误状态 */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800/80 text-white/40 text-sm">
          加载失败
        </div>
      )}
    </div>
  );
};

export const OptimizedImage = memo(OptimizedImageComponent);

// 用于预加载关键图片的 hook - 更激进的预加载策略
export const usePreloadImages = (srcs: string[], immediate = false) => {
  useEffect(() => {
    if (srcs.length === 0) return;
    
    if (immediate) {
      // 立即预加载所有图片，前8张高优先级
      preloadImages(srcs, 8);
    } else {
      // 分批预加载
      const preload = async () => {
        // 立即加载前5张（高优先级）
        await preloadImages(srcs.slice(0, 5), 5);
        
        // 100ms 后加载接下来5张
        if (srcs.length > 5) {
          setTimeout(() => {
            preloadImages(srcs.slice(5, 10), 5);
          }, 100);
        }
        
        // 300ms 后加载剩余
        if (srcs.length > 10) {
          setTimeout(() => {
            preloadImages(srcs.slice(10), 0);
          }, 300);
        }
      };
      
      preload();
    }
  }, [srcs, immediate]);
};

// 预加载下一批图片（用于游戏中动态预加载）
export const preloadNextImages = (srcs: string[], startIndex: number, count = 3) => {
  const toPreload = srcs.slice(startIndex, startIndex + count);
  toPreload.forEach(src => preloadImage(src, true));
};
