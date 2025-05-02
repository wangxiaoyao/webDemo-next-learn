// export default function Home() {
//   return (
//     <div>
//       <h1>webdemo-next</h1>
//     </div>
//   );
// }

'use client';
import React from 'react';
import { SparklesCore } from '@/components/ui/sparkles';

export default function Home() {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-md bg-black">
      <div className="absolute inset-0 h-screen w-full">
        <SparklesCore
          background="transparent"
          className="h-full w-full"
          id="tsparticlescolorful"
          maxSize={1.4}
          minSize={0.6}
          particleColor="#00ff00"
          particleDensity={100}
          speed={0.5}
        />
      </div>
      <div className="relative z-20 flex flex-col items-center justify-center gap-4">
        <h1 className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-3xl font-bold text-transparent md:text-7xl lg:text-9xl">
          Welcome
        </h1>
        <p className="cursor-default text-center text-neutral-300">xiaoyao&apos;s web demo</p>
      </div>
    </div>
  );
}
