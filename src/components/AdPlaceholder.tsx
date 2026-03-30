const AdPlaceholder = ({ slot = "ad" }: { slot?: string }) => (
  <div className="ad-placeholder my-6" data-ad-slot={slot}>
    <span>Advertisement</span>
  </div>
);

export default AdPlaceholder;
