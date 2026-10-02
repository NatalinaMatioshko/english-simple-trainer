const ZOOM_MEETING_URL =
  "https://us05web.zoom.us/j/5272945573?pwd=T1BPZDFJU3dpTEF6dmtxUHVLYTl5UT09";

type ZoomMeetingLinkProps = {
  /** `topbar` = circle → pill on hover; `sidebar` = always labelled */
  variant?: "topbar" | "sidebar";
};

export function ZoomMeetingLink({ variant = "topbar" }: ZoomMeetingLinkProps) {
  return (
    <a
      className={`zoom-meeting-link zoom-meeting-link--${variant}`}
      href={ZOOM_MEETING_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Join Zoom meeting"
    >
      <span className="zoom-meeting-link-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="2.5" y="6.5" width="12.5" height="11" rx="2.2" />
          <path d="M15 10.2 21 7v10l-6-3.2" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="zoom-meeting-link-label">Zoom meeting</span>
    </a>
  );
}
