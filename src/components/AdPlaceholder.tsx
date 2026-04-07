import { useEffect, useRef } from "react";

interface AdPlaceholderProps {
  slot?: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  className?: string;
}

const AdPlaceholder = ({ slot = "auto", format = "auto", className = "" }: AdPlaceholderProps) => {
  const adRef = useRef<HTMLDivElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      if (typeof window !== "undefined" && (window as any).adsbygoogle) {
        (window as any).adsbygoogle.push({});
        pushed.current = true;
      }
    } catch {
      // AdSense not loaded yet
    }
  }, []);

  return (
    <div className={`my-6 text-center ${className}`} ref={adRef}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-1433261757916600"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdPlaceholder;
