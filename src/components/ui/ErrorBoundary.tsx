import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RotateCcw } from "lucide-react";

interface Props {
       children: ReactNode;
}

interface State {
       hasError: boolean;
       error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
       public state: State = {
              hasError: false,
              error: null,
       };

       public static getDerivedStateFromError(error: Error): State {
              return { hasError: true, error };
       }

       public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
              console.error("Uncaught error:", error, errorInfo);
       }

       public render() {
              if (this.state.hasError) {
                     return (
                            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-center">
                                   <div className="relative mb-8">
                                          <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full animate-pulse" />
                                          <AlertTriangle className="w-24 h-24 text-red-500 relative z-10 animate-bounce" />
                                   </div>

                                   <h1 className="text-4xl font-black text-white mb-2">
                                          系统被你玩坏了
                                   </h1>

                                   <p className="text-white/60 mb-8 text-lg max-w-md">
                                          可能是你的能量太强，服务器刚才发生了一次小型爆炸。
                                          <br />
                                          <span className="text-xs mt-2 block opacity-50 font-mono">
                                                 Error: {this.state.error?.message || 'Unknown Glitch'}
                                          </span>
                                   </p>

                                   <Button
                                          size="lg"
                                          onClick={() => window.location.reload()}
                                          className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-xl px-8 py-6 rounded-xl animate-pulse"
                                   >
                                          <RotateCcw className="w-6 h-6 mr-2" />
                                          重启系统
                                   </Button>
                            </div>
                     );
              }

              return this.props.children;
       }
}
