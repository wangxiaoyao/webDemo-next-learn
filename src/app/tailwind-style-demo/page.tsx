'use client';

/**
 * 布局：flex-1
 */
// export default function Page() {
//   return (
//     <div className="flex h-screen flex-col bg-amber-600 pb-10">
//       <header className="flex h-14 items-center gap-2 px-6 py-4">
//         <h1 className="text-[18px] font-bold">翻译助手</h1>
//       </header>
//       <div className="mx-2 flex flex-4">
//         <div className="w-1/2 rounded-tl-3xl rounded-bl-3xl border bg-white px-6 py-4">
//           left
//         </div>
//         <div className="w-1/2 rounded-tr-3xl rounded-br-3xl border px-6 py-4">
//           right
//         </div>
//       </div>
//     </div>
//   );
// }

/**
 * motion
 */
import MagicButtonMotion from './MagicButtonMotion';
import StaggeredListMotion from './StaggeredListMotion';
import ToggleBox from './ToogleBox';
import FlipCardMotion from './FlipCardMotion';

export default function Page() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-10">
      <MagicButtonMotion />
      <StaggeredListMotion items={['Item 1', 'Item 2', 'Item 3']} />
      <ToggleBox />
      <FlipCardMotion />
    </div>
  );
}
