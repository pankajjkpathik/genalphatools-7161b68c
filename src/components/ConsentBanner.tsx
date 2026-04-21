import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { applyConsent, getConsent, setConsent } from "@/lib/consent";

const ConsentBanner = () => {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [ads, setAds] = useState(true);

  useEffect(() => {
    const stored = getConsent();
    if (!stored) {
      setVisible(true);
    } else {
      applyConsent(stored);
    }
  }, []);

  const acceptAll = () => {
    setConsent("granted", "granted");
    setVisible(false);
  };

  const rejectAll = () => {
    setConsent("denied", "denied");
    setVisible(false);
  };

  const saveChoices = () => {
    setConsent(analytics ? "granted" : "denied", ads ? "granted" : "denied");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-title"
      className="fixed bottom-0 inset-x-0 z-[60] p-3 sm:p-4 pointer-events-none"
    >
      <div className="container max-w-4xl pointer-events-auto bg-card border border-border rounded-lg shadow-lg p-4 sm:p-5 animate-fade-in">
        <div className="flex items-start gap-3">
          <Cookie className="text-primary shrink-0 mt-1" size={22} />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <h2 id="consent-title" className="font-heading font-semibold text-base">
                We value your privacy
              </h2>
              <button
                onClick={rejectAll}
                aria-label="Reject all and close"
                className="text-muted-foreground hover:text-foreground p-1 -m-1"
              >
                <X size={18} />
              </button>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              We use cookies to measure site usage and, with your permission, to show relevant ads from Google AdSense.
              Calculator inputs always stay in your browser.{" "}
              <Link to="/privacy-policy" className="underline hover:text-foreground">
                Read our Privacy Policy
              </Link>
              .
            </p>

            {showSettings && (
              <div className="mt-4 space-y-3 border-t border-border pt-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium">Strictly necessary</p>
                    <p className="text-xs text-muted-foreground">
                      Required for the site to function. Cannot be disabled.
                    </p>
                  </div>
                  <Switch checked disabled aria-label="Necessary cookies (always on)" />
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium">Analytics</p>
                    <p className="text-xs text-muted-foreground">
                      Anonymous usage statistics so we can improve the tools.
                    </p>
                  </div>
                  <Switch
                    checked={analytics}
                    onCheckedChange={setAnalytics}
                    aria-label="Toggle analytics cookies"
                  />
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium">Advertising (Google AdSense)</p>
                    <p className="text-xs text-muted-foreground">
                      Loads the AdSense script to display relevant, non-personalised or personalised ads based on your
                      choice.
                    </p>
                  </div>
                  <Switch checked={ads} onCheckedChange={setAds} aria-label="Toggle advertising cookies" />
                </div>
              </div>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              {showSettings ? (
                <>
                  <Button size="sm" onClick={saveChoices}>
                    Save preferences
                  </Button>
                  <Button size="sm" variant="outline" onClick={acceptAll}>
                    Accept all
                  </Button>
                </>
              ) : (
                <>
                  <Button size="sm" onClick={acceptAll}>
                    Accept all
                  </Button>
                  <Button size="sm" variant="outline" onClick={rejectAll}>
                    Reject non-essential
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setShowSettings(true)}>
                    Customise
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsentBanner;
