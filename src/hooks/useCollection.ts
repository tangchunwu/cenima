import { useState, useEffect } from 'react';
import { tagCombinations } from '@/lib/resultCalculator';

const STORAGE_KEY = 'shabi_unlocked_personas';

export const useCollection = () => {
       const [unlockedTags, setUnlockedTags] = useState<string[]>([]);
       const [hasNew, setHasNew] = useState(false);

       useEffect(() => {
              const load = () => {
                     const stored = localStorage.getItem(STORAGE_KEY);
                     if (stored) {
                            setUnlockedTags(JSON.parse(stored));
                     } else {
                            setUnlockedTags([]); // Ensure state is empty if nothing in storage
                     }
              };

              load(); // Initial load

              const handleUpdate = () => load();
              window.addEventListener('shabi_collection_updated', handleUpdate);
              return () => window.removeEventListener('shabi_collection_updated', handleUpdate);
       }, []);

       const unlock = (tag: string) => {
              const stored = localStorage.getItem(STORAGE_KEY);
              const currentTags = stored ? JSON.parse(stored) : [];

              if (!currentTags.includes(tag)) {
                     const next = [...currentTags, tag];
                     localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
                     setHasNew(true);
                     window.dispatchEvent(new Event('shabi_collection_updated'));
              }
       };

       const isUnlocked = (tag: string) => {
              return unlockedTags.includes(tag);
       };

       const getProgress = () => {
              // Filter out default/fallback tags if any, strictly count keys in tagCombinations
              const total = Object.keys(tagCombinations).length;
              // Count only valid tags that are in our combinations
              const current = unlockedTags.filter(tag => tag in tagCombinations).length;
              return { current, total };
       };

       const clearNewParams = () => {
              setHasNew(false);
       };

       return {
              unlockedTags,
              unlock,
              isUnlocked,
              getProgress,
              hasNew,
              clearNewParams
       };
};
