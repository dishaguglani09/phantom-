import Camera from "./Camera";
import GhostOverlay from "../components/GhostOverlay";
import changeset from "./changeset.json";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">

      {/* Header */}
      <div className="mx-auto mb-8 max-w-4xl text-center">
        <h1 className="text-5xl font-bold tracking-[0.3em]">
          PHANTOM
        </h1>

        <p className="mt-4 text-sm tracking-[0.2em] text-gray-400">
          REALITY HAS VERSION CONTROL
        </p>
      </div>

      {/* Camera + Ghost Overlay */}
      <div className="relative mx-auto max-w-4xl">

        <Camera />

        <GhostOverlay changes={changeset.changes} />

      </div>

    </main>
  );
}