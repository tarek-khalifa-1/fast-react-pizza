function LoaderSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-200/20 backdrop-blur-sm">
      <div className="flex h-15 w-11.25 items-end gap-1">
        <div className="h-6 w-2 animate-bounce bg-stone-800 [animation-delay:-0.2s] [animation-duration:0.3s]"></div>
        <div className="h-8 w-2 animate-bounce bg-stone-800 [animation-delay:-0.2s] [animation-duration:0.3s]"></div>
        <div className="h-10 w-2 animate-bounce bg-stone-800 [animation-delay:-0.1s] [animation-duration:0.3s]"></div>
        <div className="h-12 w-2 animate-bounce bg-stone-800 [animation-duration:0.3s]"></div>
      </div>
    </div>
  );
}

export default LoaderSpinner;
