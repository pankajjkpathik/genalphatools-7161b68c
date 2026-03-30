const ShareButtons = ({ title }: { title: string }) => {
  const url = typeof window !== "undefined" ? window.location.href : "";
  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex items-center gap-2 mt-4">
      <span className="text-xs text-muted-foreground">Share:</span>
      <a
        href={`https://wa.me/?text=${encodedTitle}%20${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs bg-accent/10 text-accent px-3 py-1.5 rounded-full hover:bg-accent/20 transition-colors font-medium"
      >
        WhatsApp
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs bg-secondary/10 text-secondary px-3 py-1.5 rounded-full hover:bg-secondary/20 transition-colors font-medium"
      >
        Facebook
      </a>
      <button
        onClick={() => navigator.clipboard?.writeText(url)}
        className="text-xs bg-muted text-muted-foreground px-3 py-1.5 rounded-full hover:bg-muted/80 transition-colors font-medium"
      >
        Copy Link
      </button>
    </div>
  );
};

export default ShareButtons;
