import React from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend, 
  ArcElement 
} from 'chart.js';
import { useLocation } from 'react-router-dom';

// Register the required components in Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

export default function About() {
  const location = useLocation(); // Access state passed via navigate
  const { response } = location.state || {};

  return (
    <div className="container my-5">
      <h2 className="text-center fs-4 border-rounded bg-secondary">Key Life Influences and Aspects</h2>
      {/* Row for the different meters and graphs */}
      {response && Object.keys(response).map((key) => (
        <div className="row align-items-center my-4" key={key}>
          {/* Progress Bar */}
          <div className="col-md-6">
            <h4>{key}</h4>
            <div className="progress">
              <div
                className="progress-bar bg-success"
                role="progressbar"
                style={{ width: `${response[key]}%` }}
                aria-valuenow={response[key]}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {response[key]}%
              </div>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="col-md-6">
            <Pie
              data={{
                labels: ['Achieved', 'Remaining'],
                datasets: [
                  {
                    label: `${key} Breakdown`,
                    data: [response[key], 100 - response[key]],
                    backgroundColor: ['#4caf50', '#f44336'],
                    hoverBackgroundColor: ['#388e3c', '#d32f2f'],
                  },
                ],
              }}
              options={{
                plugins: {
                  tooltip: {
                    callbacks: {
                      label: (tooltipItem) => 
                        `${tooltipItem.label}: ${tooltipItem.raw}%`,
                    },
                  },
                },
                maintainAspectRatio: false,
              }}
              height={200}
              width={200}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
