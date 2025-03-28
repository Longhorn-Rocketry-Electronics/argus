import React, { useEffect } from 'react';
import Draggable from "react-draggable";
import { LineChart, Line, PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function parseTCPPacket(tcpPacket) {
  const payloadStartIndex = tcpPacket.indexOf('\n') + 1;
  const payload = tcpPacket.slice(payloadStartIndex);

  const plaintext = payload;
  return plaintext;
}

export function App() {
  var parachute_data = [
    {"drogue":"standby"},
    {"main":"standby"}
  ];

  var rotational_data = [
    {"x": 20},
    {"y": 20},
    {"z": 50}
  ];

  var line_data = [ // Altitude, Fuel, Velocity
    [100, 10, 5],
    [99, 20, 20],
    [97, 40, 50],
    [95, 60, 70],
    [90, 90, 71],
    [88, 120, 75]
  ];
  var transformed_line_data = [];

  var gps_data = [ // time, latitude, longitude
    [1, 37.7749, -122.4194],
    [2, 37.7755, -122.4188],
    [3, 37.7760, -122.4182],
    [4, 37.7765, -122.4175],
    [5, 37.7770, -122.4169]
  ];
  var transformed_gps_data = [];

  useEffect(()=> {
    // parachute data
    var drogueElement = document.getElementById('drogue-chute');
    var mainElement = document.getElementById('main-chute');

    if (drogueElement) {
      var drogueVal = parachute_data.find(item => item.drogue !== undefined)?.drogue;
      drogueElement.innerHTML = drogueVal.toUpperCase();
    }
    if (mainElement) {
      var mainVal = parachute_data.find(item => item.main !== undefined)?.main;
      mainElement.innerHTML = mainVal.toUpperCase();
    }

    // rotational data
    var rotationalElement = document.getElementById('rotation');

    if (rotationalElement) {
      var rotationalXYZ = [
        rotational_data.find(item => item.x !== undefined)?.x,
        rotational_data.find(item => item.y !== undefined)?.y,
        rotational_data.find(item => item.z !== undefined)?.z
      ];

      rotationalElement.innerHTML = "x: " + rotationalXYZ[0] + "° | y: " + rotationalXYZ[1] + "° | z: " + rotationalXYZ[2] + "°";
    }

    transformed_gps_data = gps_data.map(item => {
      time: item[0],
      latitude: item[1],
      longitude: item[2]
    });

    transformed_line_data = line_data.map(item => {
      altitude: item[0],
      fuel: item[1],
      velocity: item[2]
    });
  });


  return (
    <div className="w-screen h-screen bg-gray-900 text-white flex items-center justify-center">
      {/* Draggable Parachute Locale */}
      <Draggable>
        <div>
          <h3>Positioning Data:</h3>
          <p>
            {positioning_data.map((item) => `${item.data}: ${item.value}`).join(", ")}
          </p>
        </div>
      </Draggable>
      <div className="w-screen h-screen bg-gray-900 text-white flex items-center justify-center">
        {/* Draggable Line Chart */}
        <Draggable>
          <div className="absolute bg-gray-800 p-4 rounded-xl shadow-lg cursor-move">
            <h3 className="text-center mb-2">Altittude vs Fuel vs Velocity</h3>
            <ResponsiveContainer width={300} height={200}>
              <LineChart data={line_data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="valueA" stroke="#e92228" strokeWidth={2} />
                <Line type="monotone" dataKey="valueF" stroke="#bf5700" strokeWidth={2} />
                <Line type="monotone" dataKey="valueV" stroke="#00ff00" strokeWidth={2} />
              </LineChart>
              
            </ResponsiveContainer>
          </div>
        </Draggable>

        {/* Draggable Parachute Locale */}
        <Draggable>
          <div>
            <h1>Main: <i id='main-chute'>Unopened</i></h1>
            <h1>Drogue: <i id='drogue-chute'>Unopened</i></h1>
          </div>
        </Draggable>

        {/* Draggable Parachute Locale */}
        <Draggable>
          <div>
            <h3>Positioning Data:</h3>
            <p id='rotation'></p>
          </div>
        </Draggable>

        {/* Draggable GPS (To be Implemented) */}

        {/* Draggable Video Display */}
        <Draggable>
          <div className="absolute bottom-10 right-10 bg-gray-800 p-4 rounded-xl shadow-lg cursor-move">
            <h3 className="text-center mb-2">Video Player</h3>
            <video width="200" controls className="rounded-lg">
              <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />Your browser does not support the video tag.</video>
          </div>
        </Draggable>

        
      </div>

      <style>
        {`
          h3, p, h1, h2 {
            color: #bf5700;
          }
        `}
       </style>
      
    </div>
  );
}
