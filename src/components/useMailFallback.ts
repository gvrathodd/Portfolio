import { useEffect, useState } from 'react';

/**
 * `mailto:` links do nothing on machines without a default mail app (common on Windows, where
 * people use Gmail in the browser). If the page is still focused shortly after the click, assume
 * nothing opened: copy the address and let the caller offer webmail links instead.
 */
export const useMailFallback = (email: string) => {
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    if (!fallback) return;
    const t = setTimeout(() => setFallback(false), 12_000);
    return () => clearTimeout(t);
  }, [fallback]);

  const onClick = () => {
    let handedOff = false;
    const markHandedOff = () => {
      handedOff = true;
    };
    window.addEventListener('blur', markHandedOff);
    document.addEventListener('visibilitychange', markHandedOff);

    setTimeout(() => {
      window.removeEventListener('blur', markHandedOff);
      document.removeEventListener('visibilitychange', markHandedOff);
      if (handedOff) return;
      navigator.clipboard?.writeText(email).catch(() => {});
      setFallback(true);
    }, 1000);
  };

  const encoded = encodeURIComponent(email);
  return {
    onClick,
    fallback,
    dismiss: () => setFallback(false),
    gmailUrl: `https://mail.google.com/mail/?view=cm&fs=1&to=${encoded}`,
    outlookUrl: `https://outlook.live.com/mail/0/deeplink/compose?to=${encoded}`,
  };
};
