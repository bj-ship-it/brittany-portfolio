"use client";

import { useEffect, useMemo, useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import {
  Ballroom,
  EventTable,
  TableStatus,
  ballroomImages,
  eventTables,
} from "../data/tables";

const ballrooms: Ballroom[] = [
  "Grand Ballroom",
  "Sago Palm Ballroom",
  "Palm Ballroom",
];

function getFill({
  status,
  isSelected,
  showDefaultHitboxes,
}: {
  status: TableStatus;
  isSelected: boolean;
  showDefaultHitboxes: boolean;
}) {
  if (showDefaultHitboxes && status === "default" && !isSelected) {
    return "rgba(219, 36, 135, 0.2)";
  }

  if (isSelected) return "rgba(219, 36, 135, 0.78)";
  if (status === "to_visit") return "rgba(139, 92, 246, 0.78)";
  if (status === "visited") return "rgba(18, 110, 131, 0.78)";
  if (status === "preorder") return "rgba(5, 134, 255, 0.78)";

  return "rgba(255, 255, 255, 0.02)";
}

function getBorder({
  status,
  isSelected,
  showDefaultHitboxes,
}: {
  status: TableStatus;
  isSelected: boolean;
  showDefaultHitboxes: boolean;
}) {
  if (showDefaultHitboxes && status === "default" && !isSelected) {
    return "#DB2487";
  }

  if (isSelected) return "#DB2487";
  if (status === "to_visit") return "#8b5cf6";
  if (status === "visited") return "#126e83";
  if (status === "preorder") return "#0586ff";

  return "transparent";
}

function getTextColor(status: TableStatus, isSelected: boolean) {
  if (status !== "default" || isSelected) return "#ffffff";
  return "transparent";
}

export default function MapPage() {
  const [activeBallroom, setActiveBallroom] =
    useState<Ballroom>("Grand Ballroom");
  const [search, setSearch] = useState("");
  const [selectedTable, setSelectedTable] = useState<EventTable | null>(null);
  const [statuses, setStatuses] = useState<Record<string, TableStatus>>({});

  useEffect(() => {
    const saved = localStorage.getItem("portfolioBitzUpTableStatuses");

    if (saved) {
      try {
        setStatuses(JSON.parse(saved));
      } catch {
        setStatuses({});
      }
    }
  }, []);

  function updateStatus(tableId: string, status: TableStatus) {
    const next = { ...statuses, [tableId]: status };
    setStatuses(next);
    localStorage.setItem("portfolioBitzUpTableStatuses", JSON.stringify(next));
  }

  const visibleTables = useMemo(() => {
    return eventTables.filter((table) => table.ballroom === activeBallroom);
  }, [activeBallroom]);

  const searchResults = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return [];

    return eventTables.filter(
      (table) =>
        table.authorName.toLowerCase().includes(query) ||
        table.tableNumber.includes(query) ||
        table.ballroom.toLowerCase().includes(query)
    );
  }, [search]);

  function jumpToTable(table: EventTable) {
    setActiveBallroom(table.ballroom);
    setSelectedTable(table);
    setSearch("");
  }

  return (
    <main className="w-full px-4 py-6 sm:px-6">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-6 text-center">
          <h1 className="bitz-heading text-5xl text-[#DB2487]">
            Interactive Map
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            Search by author, tap a table, and mark who you still need to visit.
          </p>
        </div>

        <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {ballrooms.map((ballroom) => (
            <button
              key={ballroom}
              onClick={() => {
                setActiveBallroom(ballroom);
                setSelectedTable(null);
              }}
              className={`rounded-2xl px-4 py-3 font-bold transition ${
                activeBallroom === ballroom
                  ? "bg-[#DB2487] text-white"
                  : "bg-white text-[#126e83] shadow"
              }`}
            >
              {ballroom}
            </button>
          ))}
        </div>

        <div className="relative mb-5">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search author or table number..."
            className="w-full rounded-3xl border border-pink-200 bg-white px-5 py-4 text-lg outline-none focus:border-[#DB2487]"
          />

          {searchResults.length > 0 && (
            <div className="absolute left-0 right-0 top-full z-40 mt-2 max-h-80 overflow-auto rounded-3xl bg-white p-3 shadow-xl">
              {searchResults.map((table) => (
                <button
                  key={table.id}
                  onClick={() => jumpToTable(table)}
                  className="block w-full rounded-2xl px-4 py-3 text-left hover:bg-[#fff7fb]"
                >
                  <span className="font-bold text-[#DB2487]">
                    {table.authorName}
                  </span>

                  <span className="block text-sm text-gray-500">
                    Table {table.tableNumber} • {table.ballroom}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mb-5 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
          <div className="rounded-2xl bg-white p-3 shadow">
            <span className="font-bold text-[#126e83]">Map:</span> Default
          </div>

          <div className="rounded-2xl bg-white p-3 shadow">
            <span className="font-bold text-purple-600">Purple:</span> Need to
            Visit
          </div>

          <div className="rounded-2xl bg-white p-3 shadow">
            <span className="font-bold text-[#126e83]">Teal:</span> Visited
          </div>

          <div className="rounded-2xl bg-white p-3 shadow">
            <span className="font-bold text-[#0586ff]">Blue:</span> Preorder
          </div>
        </div>

        <div className="overflow-hidden rounded-[32px] bg-white shadow-xl">
          <TransformWrapper
            initialScale={1}
            minScale={0.55}
            maxScale={5}
            wheel={{ step: 0.15 }}
            pinch={{ step: 5 }}
            doubleClick={{ disabled: false }}
          >
            {({ zoomIn, zoomOut, resetTransform }) => (
              <>
                <div className="flex items-center justify-between gap-2 border-b border-pink-100 p-3">
                  <p className="font-bold text-[#126e83]">
                    {activeBallroom}
                  </p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => zoomOut()}
                      className="rounded-full bg-[#fff7fb] px-4 py-2 font-bold text-[#126e83]"
                    >
                      -
                    </button>

                    <button
                      onClick={() => resetTransform()}
                      className="rounded-full bg-[#fff7fb] px-4 py-2 font-bold text-[#126e83]"
                    >
                      Reset
                    </button>

                    <button
                      onClick={() => zoomIn()}
                      className="rounded-full bg-[#fff7fb] px-4 py-2 font-bold text-[#126e83]"
                    >
                      +
                    </button>
                  </div>
                </div>

                <TransformComponent
                  wrapperClass="!w-full !h-[70vh]"
                  contentClass="!w-full"
                >
                  <div className="relative mx-auto w-full max-w-[1000px]">
                    <img
                      src={ballroomImages[activeBallroom]}
                      alt={activeBallroom}
                      className="block w-full select-none"
                      draggable={false}
                    />

                    <div className="absolute inset-0">
                      {visibleTables.map((table) => {
                        const status = statuses[table.id] || "default";
                        const isSelected = selectedTable?.id === table.id;

                        const fill = getFill({
                        status,
                        isSelected,
                        showDefaultHitboxes: true,
                      });

                      const border = getBorder({
                        status,
                        isSelected,
                        showDefaultHitboxes: true,
                      });

                        const textColor = getTextColor(status, isSelected);

                        return (
                          <button
  key={table.id}
  onClick={() => setSelectedTable(table)}
  title={`${table.authorName} - Table ${table.tableNumber}`}
  className="absolute transition"
  style={{
    left: `${table.x}%`,
    top: `${table.y}%`,
    width: `${table.w}%`,
    height: `${table.h}%`,

    transform: `
      translate(-50%, -50%)
      rotate(${table.rotation || 0}deg)
    `,

    transformOrigin: "center center",

    background:
      status === "default"
        ? "#f9c2df"
        : fill,

    border: `2px solid ${
      status === "default"
        ? "#DB2487"
        : border
    }`,

    borderRadius: "0px",

    opacity: 1,

    zIndex: isSelected ? 60 : 40,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    color:
      status === "default"
        ? "#DB2487"
        : "#ffffff",

    fontSize: "10px",
    fontWeight: 900,
    lineHeight: 1,

    boxSizing: "border-box",

    pointerEvents: "auto",
  }}
>
  {table.tableNumber}
</button>
                        );
                      })}
                    </div>
                  </div>
                </TransformComponent>
              </>
            )}
          </TransformWrapper>
        </div>

        {selectedTable && (
          <div className="fixed inset-x-0 bottom-20 z-50 mx-auto w-[92%] max-w-lg rounded-[32px] bg-white p-5 shadow-2xl">
            <p className="text-sm font-bold uppercase tracking-wide text-gray-500">
              Table {selectedTable.tableNumber} • {selectedTable.ballroom}
            </p>

            <h2 className="bitz-heading mt-2 text-4xl leading-tight text-[#DB2487]">
              {selectedTable.authorName}
            </h2>

            <div className="mt-5 grid grid-cols-2 gap-2">
              <button
                onClick={() => updateStatus(selectedTable.id, "to_visit")}
                className="rounded-2xl bg-purple-600 px-3 py-3 text-sm font-bold text-white"
              >
                Need To Visit
              </button>

              <button
                onClick={() => updateStatus(selectedTable.id, "visited")}
                className="rounded-2xl bg-[#126e83] px-3 py-3 text-sm font-bold text-white"
              >
                Visited
              </button>

              <button
                onClick={() => updateStatus(selectedTable.id, "preorder")}
                className="rounded-2xl bg-[#0586ff] px-3 py-3 text-sm font-bold text-white"
              >
                Preorder
              </button>

              <button
                onClick={() => updateStatus(selectedTable.id, "default")}
                className="rounded-2xl bg-gray-100 px-3 py-3 text-sm font-bold text-gray-700"
              >
                Clear
              </button>
            </div>

            <button
              onClick={() => setSelectedTable(null)}
              className="mt-3 w-full rounded-2xl border border-pink-200 px-4 py-3 font-bold text-[#DB2487]"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
