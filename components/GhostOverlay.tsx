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
      {changes.map((change) => (
        <div
          key={change.object_id}
          className={`absolute border-2 ${getStatusColor(
            change.status
          )} rounded-lg`}
          style={{
            left: `${change.bounding_box.x}px`,
            top: `${change.bounding_box.y}px`,
            width: `${change.bounding_box.width}px`,
            height: `${change.bounding_box.height}px`,
          }}
        >
          <span className="absolute -top-7 left-0 rounded bg-black/80 px-2 py-1 text-xs text-white">
            {change.label} · {change.status}
          </span>
        </div>
      ))}
    </div>
  );
}