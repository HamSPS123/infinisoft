import { useEffect, useRef } from 'react';

const CustomerDemographicChart = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current;
      
      // Create a simple visual representation of a pie chart
      ctx.innerHTML = `
        <div class="flex h-full w-full items-center justify-center">
          <div class="relative h-40 w-40">
            <!-- Blue segment (USA - 79%) -->
            <div class="absolute inset-0">
              <svg viewBox="0 0 100 100">
                <path
                  d="M50 50 L50 0 A50 50 0 0 1 97.5 65.5 Z"
                  fill="#3b82f6"
                />
              </svg>
            </div>
            
            <!-- Green segment (France - 23%) -->
            <div class="absolute inset-0">
              <svg viewBox="0 0 100 100">
                <path
                  d="M50 50 L97.5 65.5 A50 50 0 0 1 50 100 Z"
                  fill="#22c55e"
                />
              </svg>
            </div>
            
            <!-- Gray segment (Others) -->
            <div class="absolute inset-0">
              <svg viewBox="0 0 100 100">
                <path
                  d="M50 50 L50 100 A50 50 0 0 1 0 50 A50 50 0 0 1 50 0 Z"
                  fill="#e5e7eb"
                />
              </svg>
            </div>
            
            <!-- Center white circle -->
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="h-24 w-24 rounded-full bg-white"></div>
            </div>
          </div>
        </div>
      `;
    }
  }, []);

  return <div ref={chartRef} className="h-full w-full"></div>;
};

export default CustomerDemographicChart;
