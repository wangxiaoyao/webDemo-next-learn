'use client';

// 使用非position的布局方式
export default function Page() {
  return (
    <>
      <div className="flex h-screen flex-col">
        <div className="h-[300px] bg-amber-400">头部</div>
        <div className="flex-1 overflow-y-auto bg-emerald-600">
          滚动部分内容 <br />
          滚动部分内容 <br />
          滚动部分内容 <br />
          滚动部分内容 <br />
          滚动部分内容 <br />
          滚动部分内容 <br />
          滚动部分内容 <br />
        </div>
        <div className="justify-end bg-cyan-500">footer</div>
      </div>
    </>
  );
}
