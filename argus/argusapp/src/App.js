import React, { useEffect, useState } from 'react';
import Draggable from "react-draggable";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Scatter,
  ScatterChart,
  ResponsiveContainer
} from "recharts";

function parseTCPPacket(tcpPacket) {
  const payloadStartIndex = tcpPacket.indexOf('\n') + 1;
  return tcpPacket.slice(payloadStartIndex);
}

const App = () => {
  const parachute_data = [
    { drogue: "standby" },
    { main: "standby" }
  ];

  const rotational_data = [
    { x: 20 },
    { y: 20 },
    { z: 50 }
  ];

  const line_data = [
    [100, 10, 5],
    [99, 20, 20],
    [97, 40, 50],
    [95, 60, 70],
    [90, 90, 71],
    [88, 120, 75]
  ];

  const gps_data = [
    [1, 37.7749, -122.4194],
    [2, 37.7755, -122.4188],
    [3, 37.7760, -122.4182],
    [4, 37.7765, -122.4175],
    [5, 37.7770, -122.4169]
  ];

  const [transformedLineData, setTransformedLineData] = useState([]);
  const [transformedGpsData, setTransformedGpsData] = useState([]);
  const [rotationText, setRotationText] = useState('');
  const [drogueText, setDrogueText] = useState('Unopened');
  const [mainText, setMainText] = useState('Unopened');

  useEffect(() => {
    const drogueVal = parachute_data.find(item => item.drogue)?.drogue;
    const mainVal = parachute_data.find(item => item.main)?.main;

    setDrogueText(drogueVal?.toUpperCase() || 'UNKNOWN');
    setMainText(mainVal?.toUpperCase() || 'UNKNOWN');

    const xyz = [
      rotational_data.find(item => item.x)?.x,
      rotational_data.find(item => item.y)?.y,
      rotational_data.find(item => item.z)?.z
    ];
    setRotationText(`x: ${xyz[0]}° | y: ${xyz[1]}° | z: ${xyz[2]}°`);

    setTransformedGpsData(
      gps_data.map(item => ({
        time: item[0],
        latitude: item[1],
        longitude: item[2]
      }))
    );

    setTransformedLineData(
      line_data.map(item => ({
        altitude: item[0],
        fuel: item[1],
        velocity: item[2]
      }))
    );
  }, []);

  return (
    <div className="w-screen h-screen bg-gray-900 text-white relative overflow-hidden">
      
      {/* Draggable Line Chart */}
      <Draggable>
        <div className="absolute top-10 left-10 bg-gray-800 p-4 rounded-xl shadow-lg cursor-move" style={{ width: '25vw' }}>
          <h3 className="text-center mb-2 text-xl">Altitude vs Fuel vs Velocity</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={transformedLineData}>
              <XAxis dataKey="altitude" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="altitude" stroke="#e92228" strokeWidth={2} />
              <Line type="monotone" dataKey="fuel" stroke="#bf5700" strokeWidth={2} />
              <Line type="monotone" dataKey="velocity" stroke="#00ff00" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Draggable>

      {/* Draggable Parachute Status */}
      <Draggable>
        <div className="absolute top-10 right-10 bg-gray-800 p-4 rounded-xl shadow-lg cursor-move inline-block text-center">
          <h1>Parachute Status</h1>
          <h3 className="mb-2">Main: <i>{mainText}</i></h3>
          <h3>Drogue: <i>{drogueText}</i></h3>
        </div>
      </Draggable>

      {/* Draggable Rotational Data */}
      <Draggable>
        <div className="absolute bottom-32 left-10 bg-gray-800 p-4 rounded-xl shadow-lg cursor-move inline-block">
          <h3 className="mb-2">Rotational Data:</h3>
          <p>{rotationText}</p>
        </div>
      </Draggable>

      {/* Draggable GPS Scatter Chart */}
      <Draggable>
        <div className="absolute bottom-32 right-10 bg-gray-800 p-4 rounded-xl shadow-lg cursor-move inline-block">
          <h3 className="mb-2 text-center">GPS Coordinates (Lat vs Long)</h3>
          <ResponsiveContainer width={300} height={250}>
            <ScatterChart>
              <XAxis
                type="number"
                dataKey="longitude"
                name="Longitude"
                tick={{ fontSize: 10 }}
                domain={['auto', 'auto']}
              />
              <YAxis
                type="number"
                dataKey="latitude"
                name="Latitude"
                tick={{ fontSize: 10 }}
                domain={['auto', 'auto']}
              />
              <Tooltip
                cursor={{ strokeDasharray: '3 3' }}
                formatter={(value, name, props) => {
                  const { payload } = props;
                  return [`Time: ${payload.time}`, `${name}`];
                }}
              />
              <Scatter
                name="GPS Points"
                data={transformedGpsData}
                fill="#8884d8"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </Draggable>

      {/* Draggable Video Player */}
      <Draggable>
        <div className="absolute bottom-10 right-10 bg-gray-800 p-4 rounded-xl shadow-lg cursor-move inline-block">
          <h3 className="text-center mb-2">Video Player</h3>
          <video width="600" controls className="rounded-lg">
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />Your browser does not support the video tag.</video>
        </div>
      </Draggable>

      {/* Custom Text Styling */}
      <style>
        {`
          h3, p, h1, h2 {
            color: #bf5700;
          }
        `}
      </style>
    </div>
  );
};

export default App;
