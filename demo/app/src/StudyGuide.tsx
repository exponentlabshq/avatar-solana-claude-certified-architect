import { StudyGuidePayPanel } from "./StudyGuidePayPanel.js";

/** Standalone pay + download page (legacy layout). Main routes use AvatarCCAHome. */
export default function StudyGuide() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        background:
          "radial-gradient(ellipse 120% 80% at 50% -20%, #1a1530 0%, #0a0a0c 55%)",
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
      }}
    >
      <StudyGuidePayPanel variant="standalone" />
    </div>
  );
}
