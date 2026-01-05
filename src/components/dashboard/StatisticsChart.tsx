import { useEffect, useRef } from 'react';

interface StatisticsChartProps {
  activeTab: string;
}

const StatisticsChart = ({ activeTab }: StatisticsChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current;
      
      // Create a simple visual representation of a chart based on the active tab
      let chartHTML = '';
      
      if (activeTab === 'today') {
        chartHTML = `
          <div class="flex h-full w-full flex-col">
            <div class="relative flex h-full w-full items-end">
              <div class="absolute inset-0 grid grid-cols-1 grid-rows-4">
                <div class="border-b border-gray-200"></div>
                <div class="border-b border-gray-200"></div>
                <div class="border-b border-gray-200"></div>
                <div class="border-b border-gray-200"></div>
              </div>
              <div class="relative z-10 flex w-full items-end justify-between gap-2">
                <div class="flex flex-col items-center">
                  <div class="h-28 w-6 rounded-t-md bg-blue-500"></div>
                  <span class="mt-2 text-xs text-gray-500">9AM</span>
                </div>
                <div class="flex flex-col items-center">
                  <div class="h-36 w-6 rounded-t-md bg-blue-500"></div>
                  <span class="mt-2 text-xs text-gray-500">10AM</span>
                </div>
                <div class="flex flex-col items-center">
                  <div class="h-24 w-6 rounded-t-md bg-blue-500"></div>
                  <span class="mt-2 text-xs text-gray-500">11AM</span>
                </div>
                <div class="flex flex-col items-center">
                  <div class="h-40 w-6 rounded-t-md bg-blue-500"></div>
                  <span class="mt-2 text-xs text-gray-500">12PM</span>
                </div>
                <div class="flex flex-col items-center">
                  <div class="h-32 w-6 rounded-t-md bg-blue-500"></div>
                  <span class="mt-2 text-xs text-gray-500">1PM</span>
                </div>
                <div class="flex flex-col items-center">
                  <div class="h-44 w-6 rounded-t-md bg-blue-500"></div>
                  <span class="mt-2 text-xs text-gray-500">2PM</span>
                </div>
                <div class="flex flex-col items-center">
                  <div class="h-36 w-6 rounded-t-md bg-blue-500"></div>
                  <span class="mt-2 text-xs text-gray-500">3PM</span>
                </div>
                <div class="flex flex-col items-center">
                  <div class="h-28 w-6 rounded-t-md bg-blue-500"></div>
                  <span class="mt-2 text-xs text-gray-500">4PM</span>
                </div>
              </div>
            </div>
          </div>
        `;
      } else if (activeTab === 'week') {
        chartHTML = `
          <div class="flex h-full w-full flex-col">
            <div class="relative flex h-full w-full items-end">
              <div class="absolute inset-0 grid grid-cols-1 grid-rows-4">
                <div class="border-b border-gray-200"></div>
                <div class="border-b border-gray-200"></div>
                <div class="border-b border-gray-200"></div>
                <div class="border-b border-gray-200"></div>
              </div>
              <div class="relative z-10 flex w-full items-end justify-between gap-2">
                <div class="flex flex-col items-center">
                  <div class="h-32 w-8 rounded-t-md bg-blue-500"></div>
                  <span class="mt-2 text-xs text-gray-500">Mon</span>
                </div>
                <div class="flex flex-col items-center">
                  <div class="h-40 w-8 rounded-t-md bg-blue-500"></div>
                  <span class="mt-2 text-xs text-gray-500">Tue</span>
                </div>
                <div class="flex flex-col items-center">
                  <div class="h-28 w-8 rounded-t-md bg-blue-500"></div>
                  <span class="mt-2 text-xs text-gray-500">Wed</span>
                </div>
                <div class="flex flex-col items-center">
                  <div class="h-44 w-8 rounded-t-md bg-blue-500"></div>
                  <span class="mt-2 text-xs text-gray-500">Thu</span>
                </div>
                <div class="flex flex-col items-center">
                  <div class="h-36 w-8 rounded-t-md bg-blue-500"></div>
                  <span class="mt-2 text-xs text-gray-500">Fri</span>
                </div>
                <div class="flex flex-col items-center">
                  <div class="h-24 w-8 rounded-t-md bg-blue-500"></div>
                  <span class="mt-2 text-xs text-gray-500">Sat</span>
                </div>
                <div class="flex flex-col items-center">
                  <div class="h-20 w-8 rounded-t-md bg-blue-500"></div>
                  <span class="mt-2 text-xs text-gray-500">Sun</span>
                </div>
              </div>
            </div>
          </div>
        `;
      } else {
        chartHTML = `
          <div class="flex h-full w-full flex-col">
            <div class="relative flex h-full w-full items-end">
              <div class="absolute inset-0 grid grid-cols-1 grid-rows-4">
                <div class="border-b border-gray-200"></div>
                <div class="border-b border-gray-200"></div>
                <div class="border-b border-gray-200"></div>
                <div class="border-b border-gray-200"></div>
              </div>
              <div class="relative z-10 flex w-full items-end justify-between gap-2">
                <div class="flex flex-col items-center">
                  <div class="h-28 w-10 rounded-t-md bg-blue-500"></div>
                  <span class="mt-2 text-xs text-gray-500">Jan</span>
                </div>
                <div class="flex flex-col items-center">
                  <div class="h-36 w-10 rounded-t-md bg-blue-500"></div>
                  <span class="mt-2 text-xs text-gray-500">Feb</span>
                </div>
                <div class="flex flex-col items-center">
                  <div class="h-24 w-10 rounded-t-md bg-blue-500"></div>
                  <span class="mt-2 text-xs text-gray-500">Mar</span>
                </div>
                <div class="flex flex-col items-center">
                  <div class="h-40 w-10 rounded-t-md bg-blue-500"></div>
                  <span class="mt-2 text-xs text-gray-500">Apr</span>
                </div>
                <div class="flex flex-col items-center">
                  <div class="h-32 w-10 rounded-t-md bg-blue-500"></div>
                  <span class="mt-2 text-xs text-gray-500">May</span>
                </div>
                <div class="flex flex-col items-center">
                  <div class="h-44 w-10 rounded-t-md bg-blue-500"></div>
                  <span class="mt-2 text-xs text-gray-500">Jun</span>
                </div>
              </div>
            </div>
          </div>
        `;
      }
      
      ctx.innerHTML = chartHTML;
    }
  }, [activeTab]);

  return <div ref={chartRef} className="h-full w-full"></div>;
};

export default StatisticsChart;
