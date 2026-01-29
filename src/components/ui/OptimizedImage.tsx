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

// 预加载图片
export const preloadImage = (src: string): Promise<void> => {
  if (imageCache.has(src)) return Promise.resolve();
  
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      imageCache.add(src);
      resolve();
    };
    img.onerror = reject;
    img.src = src;
  });
};

// 批量预加载
export const preloadImages = (srcs: string[]): Promise<void[]> => {
  return Promise.all(srcs.map(preloadImage));
};

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

// 用于预加载关键图片的 hook
export const usePreloadImages = (srcs: string[]) => {
  useEffect(() => {
    const preload = async () => {
      // 预加载前3张，其余延迟
      const priority = srcs.slice(0, 3);
      const rest = srcs.slice(3);

      await preloadImages(priority);
      
      // 延迟加载其余图片
      if (rest.length > 0) {
        setTimeout(() => {
          preloadImages(rest);
        }, 1000);
      }
    };

    preload();
  }, [srcs]);
};
