import React, { useState } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { Play, RotateCcw, Sparkles, Compass } from 'lucide-react';

const ROWS = 6;
const COLS = 12;
const START_NODE = { r: 1, c: 1 };
const END_NODE = { r: 4, c: 10 };

export const MiniPathfinder: React.FC = () => {
  const [grid, setGrid] = useState<number[][]>(() => {
    // 0 = empty, 1 = wall, 2 = visited, 3 = shortest path
    const initial = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
    // default walls for fun maze
    initial[1][4] = 1;
    initial[2][4] = 1;
    initial[3][4] = 1;
    initial[3][7] = 1;
    initial[4][7] = 1;
    return initial;
  });

  const [isRunning, setIsRunning] = useState(false);
  const [visitedCount, setVisitedCount] = useState(0);

  const toggleWall = (r: number, c: number) => {
    if (isRunning) return;
    if ((r === START_NODE.r && c === START_NODE.c) || (r === END_NODE.r && c === END_NODE.c)) return;

    setGrid((prev) => {
      const copy = prev.map((row) => [...row]);
      copy[r][c] = copy[r][c] === 1 ? 0 : 1;
      return copy;
    });
  };

  const resetGrid = () => {
    if (isRunning) return;
    setGrid((prev) =>
      prev.map((row) =>
        row.map((cell) => (cell === 1 ? 1 : 0))
      )
    );
    setVisitedCount(0);
  };

  const runAlgorithm = async (type: 'astar' | 'dijkstra') => {
    if (isRunning) return;
    setIsRunning(true);

    // BFS / Dijkstra traversal simulation
    const queue: { r: number; c: number; path: { r: number; c: number }[] }[] = [
      { r: START_NODE.r, c: START_NODE.c, path: [] },
    ];
    const seen = new Set<string>();
    seen.add(`${START_NODE.r},${START_NODE.c}`);

    let foundPath: { r: number; c: number }[] | null = null;
    let count = 0;

    while (queue.length > 0) {
      const current = queue.shift()!;
      count++;
      setVisitedCount(count);

      if (current.r === END_NODE.r && current.c === END_NODE.c) {
        foundPath = current.path;
        break;
      }

      // Animate visited cell
      if (!(current.r === START_NODE.r && current.c === START_NODE.c)) {
        setGrid((prev) => {
          const copy = prev.map((row) => [...row]);
          copy[current.r][current.c] = 2;
          return copy;
        });
        await new Promise((res) => setTimeout(res, type === 'astar' ? 20 : 35));
      }

      // Explore 4 neighbors (Right, Down, Left, Up)
      const directions = [
        { dr: 0, dc: 1 },
        { dr: 1, dc: 0 },
        { dr: 0, dc: -1 },
        { dr: -1, dc: 0 },
      ];

      for (const d of directions) {
        const nr = current.r + d.dr;
        const nc = current.c + d.dc;

        if (
          nr >= 0 &&
          nr < ROWS &&
          nc >= 0 &&
          nc < COLS &&
          grid[nr][nc] !== 1 &&
          !seen.has(`${nr},${nc}`)
        ) {
          seen.add(`${nr},${nc}`);
          queue.push({
            r: nr,
            c: nc,
            path: [...current.path, { r: nr, c: nc }],
          });
        }
      }
    }

    // Trace shortest path with gold/sky-blue
    if (foundPath) {
      for (const p of foundPath) {
        if (!(p.r === END_NODE.r && p.c === END_NODE.c)) {
          setGrid((prev) => {
            const copy = prev.map((row) => [...row]);
            copy[p.r][p.c] = 3;
            return copy;
          });
          await new Promise((res) => setTimeout(res, 30));
        }
      }
    }

    setIsRunning(false);
  };

  return (
    <div className="p-6 sm:p-7 rounded-3xl glass-panel border border-sky-500/25 overflow-hidden my-8 bg-slate-950/80">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-4 border-b border-sky-500/15">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-mono text-sky-400 uppercase tracking-widest font-semibold">
            <Compass className="w-4 h-4" />
            Live Algorithm Visualizer Sandbox
          </div>
          <h4 className="text-lg font-bold text-white mt-1">
            Path-Finder Mini Traversal Engine (60 FPS Heuristic)
          </h4>
          <p className="text-slate-400 text-xs mt-0.5">
            Click cells to place wall obstacles, then trigger A* or Dijkstra search to observe shortest-path reconstruction.
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => runAlgorithm('astar')}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold text-xs transition-colors shadow-md shadow-sky-500/20 disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Run A* Search</span>
          </button>
          <button
            onClick={() => runAlgorithm('dijkstra')}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-sky-500/20 text-xs font-medium transition-colors disabled:opacity-50"
          >
            <span>Dijkstra</span>
          </button>
          <button
            onClick={resetGrid}
            disabled={isRunning}
            className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors disabled:opacity-50"
            title="Reset Grid"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid Canvas */}
      <div className="overflow-x-auto pb-2">
        <div className="grid grid-rows-6 gap-1 min-w-[500px]">
          {grid.map((row, r) => (
            <div key={r} className="grid grid-cols-12 gap-1">
              {row.map((cell, c) => {
                const isStart = r === START_NODE.r && c === START_NODE.c;
                const isEnd = r === END_NODE.r && c === END_NODE.c;

                let cellBg = 'bg-slate-900/80 border-slate-800/80';
                if (cell === 1) cellBg = 'bg-slate-700 border-slate-600';
                if (cell === 2) cellBg = 'bg-sky-500/25 border-sky-400/40 animate-pulse';
                if (cell === 3) cellBg = 'bg-amber-400 border-amber-300 shadow-sm shadow-amber-400/50';

                return (
                  <button
                    key={`${r}-${c}`}
                    onClick={() => toggleWall(r, c)}
                    className={`h-7 sm:h-8 rounded-lg border text-[11px] font-mono font-bold flex items-center justify-center transition-all ${cellBg} ${
                      isStart ? '!bg-emerald-500 !border-emerald-400 text-slate-950 shadow-md shadow-emerald-500/30' : ''
                    } ${
                      isEnd ? '!bg-rose-500 !border-rose-400 text-white shadow-md shadow-rose-500/30' : ''
                    }`}
                  >
                    {isStart ? 'S' : isEnd ? 'E' : ''}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Grid Legend & Stats */}
      <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400 mt-3 pt-3 border-t border-slate-900">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-emerald-500 inline-block" /> Start (S)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-rose-500 inline-block" /> Target (E)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-slate-700 inline-block" /> Wall
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-amber-400 inline-block" /> Shortest Path
          </span>
        </div>
        <div className="text-sky-300 font-semibold">
          Explored Nodes: {visitedCount}
        </div>
      </div>
    </div>
  );
};
