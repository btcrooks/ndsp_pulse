/** @format */

import React, { useState } from "react";
import { Sliders } from "lucide-react";
import * as Sentry from "@sentry/react";

type Unit = "ms" | "s";
const enableDelay = true;
const enableReverb = false;

// Delay calculation functions
const calculateDelay = (bpm: number) => {
  const msPerBeat = 60000 / bpm;
  const barTime = msPerBeat * 4; // 4 beats per bar

  return {
    "2 Bars": barTime * 2,
    "1 Bar": barTime,
    "1/2": barTime / 2,
    "1/4": barTime / 4,
    "1/8": barTime / 8,
    "1/16": barTime / 16,
    "1/32": barTime / 32,
    "1/64": barTime / 64,
    "1/128": barTime / 128,
    "1/256": barTime / 256,
    "1/512": barTime / 512,
    "1/1024": barTime / 1024,
    "1/1512": barTime / 1512,
  };
};

// Reverb calculation functions
const calculateReverb = (size: string, preDelayTime: number) => {
  const decayTime = 1000 - preDelayTime;

  const sizes = {
    small: {
      preDelay: preDelayTime,
      decayTime: decayTime,
      totalTime: 1000,
      barLength: "1/4",
    },
    medium: {
      preDelay: preDelayTime,
      decayTime: decayTime * 1.5,
      totalTime: 1000 + decayTime * 0.5,
      barLength: "1/2",
    },
    large: {
      preDelay: preDelayTime,
      decayTime: decayTime * 2,
      totalTime: 1000 + decayTime,
      barLength: "1",
    },
    hall: {
      preDelay: preDelayTime,
      decayTime: decayTime * 2.5,
      totalTime: 1000 + decayTime * 1.5,
      barLength: "2",
    },
    cathedral: {
      preDelay: preDelayTime,
      decayTime: decayTime * 3,
      totalTime: 1000 + decayTime * 2,
      barLength: "3",
    },
  };

  return sizes[size as keyof typeof sizes];
};

const formatValue = (value: number, unit: Unit) => {
  let formattedValue;
  if (unit === "s") {
    formattedValue = `${parseFloat((value / 1000).toFixed(2))} s`;
  } else {
    formattedValue = `${parseFloat(value.toFixed(2))} ms`;
  }
  return formattedValue;
};

const reverbSizeDisplay: Record<string, string> = {
  cathedral: "Massive Cathedral (3 bars)",
  hall: "Hall (2 bars)",
  large: "Large Room (1 bar)",
  medium: "Medium Room (1/2)",
  small: "Small Room (1/4)",
};

function App() {
  const [bpm, setBpm] = useState<number>(120);
  const [unit, setUnit] = useState<Unit>("s");
  const delayTimes = calculateDelay(bpm);
  const reverbSizes = ["cathedral", "hall", "large", "medium", "small"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Sliders className="w-8 h-8 text-blue-400" />
          <h1 className="text-3xl font-bold">Delay & Reverb Calculator</h1>
        </div>

        <div className="mb-8 flex items-center gap-8">
          <div>
            <label className="block mb-2 text-lg">BPM</label>
            <input
              type="number"
              value={bpm}
              onChange={(e) =>
                setBpm(Math.max(20, Math.min(300, Number(e.target.value))))
              }
              className="bg-gray-700 text-white px-4 py-2 rounded-lg w-32 focus:outline-none focus:ring-2 focus:ring-blue-400"
              min="20"
              max="300"
            />
          </div>

          <div>
            <label className="block mb-2 text-lg">Unit</label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as Unit)}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="s">Seconds</option>
              <option value="ms">Milliseconds</option>
              {/* <option value="manual">Manual Pre-delay</option> */}
            </select>
          </div>
        </div>

        {enableDelay && (
          <div className="grid gap-8">
            <div className="bg-gray-800 rounded-xl p-6 shadow-xl">
              <h2 className="text-2xl font-semibold text-blue-400">
                Delay Times
              </h2>
              <p className="text-sm mb-4 text-gray-400">
                Calculates delay lengths for different note values in reference
                to your BPM ({bpm})
              </p>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4">Note Value</th>
                      <th className="text-left py-3 px-4">Notes</th>
                      <th className="text-left py-3 px-4">Dotted</th>
                      <th className="text-left py-3 px-4">Triplets</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(delayTimes).map(([note, time]) => (
                      <tr key={note} className="border-b border-gray-700">
                        <td className="py-3 px-4">{note}</td>
                        <td className="py-3 px-4">{formatValue(time, unit)}</td>
                        <td className="py-3 px-4">
                          {formatValue(time * 1.5, unit)}
                        </td>
                        <td className="py-3 px-4">
                          {formatValue((time * 2) / 3, unit)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        {/* TODOs:
          - fix conditional spacing
        */}
        <div className="h-8" />
        {enableReverb && (
          <div className="bg-gray-800 rounded-xl p-6 shadow-xl">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">
              Reverb Times
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4">Reverb Size</th>
                    <th className="text-left py-3 px-4">Pre-Delay</th>
                    <th className="text-left py-3 px-4">Decay Time</th>
                    <th className="text-left py-3 px-4">Total Time</th>
                  </tr>
                </thead>
                <tbody>
                  {reverbSizes.map((size) => {
                    const preDelay = delayTimes["1/2"];
                    const reverb = calculateReverb(size, preDelay);
                    return (
                      <tr key={size} className="border-b border-gray-700">
                        <td className="py-3 px-4">{reverbSizeDisplay[size]}</td>
                        <td className="py-3 px-4">
                          {formatValue(reverb.preDelay, unit)}
                        </td>
                        <td className="py-3 px-4">
                          {formatValue(reverb.decayTime, unit)}
                        </td>
                        <td className="py-3 px-4">
                          {formatValue(reverb.totalTime, unit)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
