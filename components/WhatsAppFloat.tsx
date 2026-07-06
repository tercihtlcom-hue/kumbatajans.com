"use client";

import { useI18n } from "@/lib/i18n";

export default function WhatsAppFloat() {
  const { d } = useI18n();
  const msg = encodeURIComponent(d.whatsapp.defaultMsg);
  const href = `https://wa.me/905306009206?text=${msg}`;

  return (
    <>
      <style>{`
        .wa-float {
          position: fixed; bottom: 2rem; right: 2rem; z-index: 9600;
          width: 133px; height: 133px; border-radius: 50%;
          background: #25d366; color: #fff;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 8px 34px rgba(37, 211, 102, 0.5);
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s;
        }
        .wa-float:hover {
          transform: scale(1.1) translateY(-4px);
          box-shadow: 0 10px 42px rgba(37, 211, 102, 0.65);
        }
        .wa-float::after {
          content: ""; position: absolute; inset: -5px; border-radius: 50%;
          border: 2px solid rgba(37, 211, 102, 0.4);
          animation: waPulse 2s infinite; pointer-events: none;
        }
        @keyframes waPulse {
          0% { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(1.45); opacity: 0; }
        }
        .wa-float svg { width: 71px; height: 71px; }
        @media (max-width: 768px) {
          .wa-float { width: 109px; height: 109px; bottom: 1.4rem; right: 1.4rem; }
          .wa-float svg { width: 58px; height: 58px; }
        }
      `}</style>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="wa-float"
        aria-label={d.whatsapp.ariaLabel}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.134 1.585 5.936L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </>
  );
}
