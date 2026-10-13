export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-[#0c0d10] flex items-center justify-center p-8 text-center">
      <div className="space-y-4">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#14161c] border border-[#262a36] text-[#c59b4b] animate-pulse">
          <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>
        <p className="text-xs text-[#9ca3af] font-medium tracking-wide">
          Verifying security credentials and loading operations console...
        </p>
      </div>
    </div>
  );
}
