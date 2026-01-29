import { Volume2, VolumeX } from "lucide-react";
import { useSound } from "@/contexts/SoundContext";

export const SoundToggle = () => {
       const { isMuted, toggleMute } = useSound();

       return (
              <button
                     onClick={toggleMute}
                     className="flex items-center justify-center p-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all active:scale-95 text-white shadow-lg"
                     title={isMuted ? "Unmute" : "Mute"}
              >
                     {isMuted ? (
                            <VolumeX className="w-5 h-5 text-red-400" />
                     ) : (
                            <Volume2 className="w-5 h-5 text-white/90" />
                     )}
              </button>
       );
};
