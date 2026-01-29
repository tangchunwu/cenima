import React, { createContext, useContext, useState, useEffect } from 'react';

interface SoundContextType {
       isMuted: boolean;
       toggleMute: () => void;
       playBGM: (url: string) => void;
       playSFX: (type: 'gain' | 'loss' | 'click' | 'success' | 'error') => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const useSound = () => {
       const context = useContext(SoundContext);
       if (!context) {
              throw new Error('useSound must be used within a SoundProvider');
       }
       return context;
};

export const SoundProvider = ({ children }: { children: React.ReactNode }) => {
       const [isMuted, setIsMuted] = useState<boolean>(() => {
              const saved = localStorage.getItem('shabi_sound_muted');
              return saved ? JSON.parse(saved) : false;
       });

       useEffect(() => {
              localStorage.setItem('shabi_sound_muted', JSON.stringify(isMuted));
       }, [isMuted]);

       // 未来可扩展为真实的音频播放逻辑
       // 目前主要用于管理状态，实际播放逻辑分散在各组件中（需逐步回收）
       const playBGM = (url: string) => {
              if (isMuted) return;
              // BGM logic here
       };

       const playSFX = (type: 'gain' | 'loss' | 'click' | 'success' | 'error') => {
              if (isMuted) return;

              // 使用 Web Audio API 生成简单的合成音效，无需加载文件
              try {
                     const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
                     if (!AudioContext) return;

                     const ctx = new AudioContext();
                     const osc = ctx.createOscillator();
                     const gain = ctx.createGain();

                     osc.connect(gain);
                     gain.connect(ctx.destination);

                     const now = ctx.currentTime;

                     switch (type) {
                            case 'click':
                                   osc.frequency.setValueAtTime(800, now);
                                   osc.frequency.exponentialRampToValueAtTime(100, now + 0.1);
                                   gain.gain.setValueAtTime(0.1, now);
                                   gain.gain.linearRampToValueAtTime(0, now + 0.1);
                                   osc.start(now);
                                   osc.stop(now + 0.1);
                                   break;

                            case 'success':
                                   osc.type = 'square';
                                   osc.frequency.setValueAtTime(440, now);
                                   osc.frequency.setValueAtTime(880, now + 0.1);
                                   gain.gain.setValueAtTime(0.1, now);
                                   gain.gain.linearRampToValueAtTime(0, now + 0.4);
                                   osc.start(now);
                                   osc.stop(now + 0.4);
                                   break;

                            case 'error':
                                   osc.type = 'sawtooth';
                                   osc.frequency.setValueAtTime(100, now);
                                   gain.gain.setValueAtTime(0.2, now);
                                   gain.gain.linearRampToValueAtTime(0, now + 0.3);
                                   osc.start(now);
                                   osc.stop(now + 0.3);
                                   break;

                            // gain/loss 已经在 LifeEditor 实现，后续可迁移
                            case 'gain':
                                   // ...
                                   break;
                            case 'loss':
                                   // ...
                                   break;
                     }
              } catch (e) {
                     console.error(e);
              }
       };

       const toggleMute = () => setIsMuted(prev => !prev);

       return (
              <SoundContext.Provider value={{ isMuted, toggleMute, playBGM, playSFX }}>
                     {children}
              </SoundContext.Provider>
       );
};
