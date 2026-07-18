"use client";

interface LoadingProps {
  /** Optional message shown under the spinner */
  message?: string;
  /** Full-screen overlay vs inline block */
  fullScreen?: boolean;
  /** Size of the spinner: sm | md | lg */
  size?: "sm" | "md" | "lg";
}

const SIZE_MAP = {
  sm: { ring: "h-10 w-10", border: "border-[3px]", text: "text-xs" },
  md: { ring: "h-16 w-16", border: "border-4", text: "text-sm" },
  lg: { ring: "h-24 w-24", border: "border-[6px]", text: "text-base" },
} as const;

export default function LoadingDark({
  message = "Loading...",
  fullScreen = false,
  size = "md",
}: LoadingProps) {
  const { ring, border, text } = SIZE_MAP[size];

  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 bg-black ${
        fullScreen ? "fixed inset-0 z-[100]" : "w-full py-12"
      }`}
    >
      {/* Outer glow pulse */}
      <div className="relative flex items-center justify-center">
        <div
          className={`absolute ${ring} animate-ping rounded-full bg-orange-500/20`}
        />
        <div
          className={`absolute ${ring} scale-125 rounded-full bg-orange-500/10 blur-xl`}
        />

        {/* Spinning gradient ring */}
        <div
          className={`relative ${ring} ${border} animate-spin rounded-full border-transparent`}
          style={{
            borderTopColor: "#f97316", // orange-500
            borderRightColor: "#fdba74", // orange-300
            borderBottomColor: "transparent",
            borderLeftColor: "transparent",
          }}
        />

        {/* Center dot */}
        <div className="absolute h-2.5 w-2.5 rounded-full bg-orange-400 shadow-[0_0_10px_2px_rgba(251,146,60,0.7)]" />
      </div>

      {/* Message + animated dots */}
      {message && (
        <p className={`flex items-center gap-1 font-medium text-gray-200 ${text}`}>
          {message}
          <span className="flex gap-0.5">
            <span className="h-1 w-1 animate-bounce rounded-full bg-orange-400 [animation-delay:-0.3s]" />
            <span className="h-1 w-1 animate-bounce rounded-full bg-orange-400 [animation-delay:-0.15s]" />
            <span className="h-1 w-1 animate-bounce rounded-full bg-orange-400" />
          </span>
        </p>
      )}
    </div>
  );
}