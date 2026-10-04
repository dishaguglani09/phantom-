"use client";

type Change = {
  object_id: string;
  label: string;
  status: string;
  bounding_box: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  depth: number;
  previous_position: {
    x: number;
    y: number;
  } | null;
};

type GhostOverlayProps = {
  changes: Change[];
};

const REFERENCE_WIDTH = 1000;
const REFERENCE_HEIGHT = 600;

export default function GhostOverlay({
  changes,
}: GhostOverlayProps) {
  function getStatusColor(status: Change["status"]) {
    switch (status) {
      case "added":
        return "border-green-400 bg-green-400/20";

      case "removed":
        return "border-red-400 bg-red-400/20";

      case "moved":
        return "border-amber-400 bg-amber-400/20";

      default:
        return "border-violet-400 bg-violet-400/20";
    }
  }

  return (
    <div className="absolute inset-0 pointer-events-none">
      {changes.map((change) => {
        const box = change.bounding_box;

        const left = (box.x / REFERENCE_WIDTH) * 100;
        const top = (box.y / REFERENCE_HEIGHT) * 100;
        const width = (box.width / REFERENCE_WIDTH) * 100;
        const height = (box.height / REFERENCE_HEIGHT) * 100;

        return (
          <div
            key={change.object_id}
            className={`absolute border-2 ${getStatusColor(
              change.status
            )} rounded-lg`}
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: `${width}%`,
              height: `${height}%`,
            }}
          >
            <span className="absolute -top-7 left-0 rounded bg-black/80 px-2 py-1 text-xs text-white whitespace-nowrap">
              {change.label} · {change.status}
            </span>
          </div>
        );
      })}
    </div>
  );
}