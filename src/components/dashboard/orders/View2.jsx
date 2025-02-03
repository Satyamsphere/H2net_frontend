import React, { useState, useRef } from 'react';

const View2 = () => {
  const [currentQuarter, setCurrentQuarter] = useState('Q3 2024');
  const [startDate, setStartDate] = useState(1); // Starting date for the visible range
  const scrollContainerRef = useRef(null);
  
  const tasks = [
    {
      id: 1,
      name: 'API Development',
      startDate: '2024-06-23',
      endDate: '2024-07-05',
      color: 'bg-orange-200'
    },
    {
      id: 2,
      name: 'Content Strategy',
      startDate: '2024-06-25',
      endDate: '2024-07-15',
      color: 'bg-blue-200'
    },
    {
      id: 3,
      name: 'New Feature Launch',
      startDate: '2024-06-27',
      endDate: '2024-07-20',
      color: 'bg-green-200'
    },
    {
      id: 4,
      name: 'Competitive Analysis',
      startDate: '2024-07-01',
      endDate: '2024-07-18',
      color: 'bg-purple-200'
    },
    {
      id: 5,
      name: 'Website Redesign',
      startDate: '2024-07-05',
      endDate: '2024-07-15',
      color: 'bg-yellow-200'
    },
    {
      id: 6,
      name: 'Security Audit',
      startDate: '2024-07-05',
      endDate: '2024-07-20',
      color: 'bg-green-200'
    },
    {
      id: 7,
      name: 'Branding Refresh',
      startDate: '2024-07-10',
      endDate: '2024-07-25',
      color: 'bg-blue-200'
    },
    {
      id: 8,
      name: 'Customer Feedback Analysis',
      startDate: '2024-07-12',
      endDate: '2024-07-22',
      color: 'bg-yellow-200'
    },
    {
      id: 9,
      name: 'User Onboarding Flow',
      startDate: '2024-07-15',
      endDate: '2024-07-20',
      color: 'bg-yellow-200'
    }
  ];

  // Generate dates for the timeline
  const generateDates = () => {
    const months = {
      'Q2 2024': ['Jun'],
      'Q3 2024': ['Jul', 'Aug', 'Sep']
    };
    
    const currentMonth = months[currentQuarter][0];
    const daysInMonth = 31; // Maximum days in a month
    const visibleDays = 7; // Number of days visible at once
    
    const days = Array.from(
      { length: daysInMonth }, 
      (_, i) => i + startDate
    ).slice(0, visibleDays);

    return {
      quarter: currentQuarter,
      month: currentMonth,
      days: days
    };
  };

  const timeline = generateDates();

  const handleScroll = (e) => {
    const { scrollLeft } = e.target;
    const dayWidth = 100; // Width of each day column in pixels
    const newStartDate = Math.floor(scrollLeft / dayWidth) + 1;
    if (newStartDate !== startDate && newStartDate <= 25) { // Limit to prevent going beyond month end
      setStartDate(newStartDate);
    }
  };

  const calculatePosition = (date) => {
    const [year, month, day] = date.split('-').map(Number);
    const dayIndex = timeline.days.indexOf(day);
    return dayIndex >= 0 ? dayIndex * 100 : 0;
  };

  const calculateWidth = (startDate, endDate) => {
    const [, , startDay] = startDate.split('-').map(Number);
    const [, , endDay] = endDate.split('-').map(Number);
    const startIndex = timeline.days.indexOf(startDay);
    const endIndex = timeline.days.indexOf(endDay);
    return ((endIndex - startIndex + 1) * 100) + 'px';
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Timeline View</h2>
      </div>

      <div className="border rounded-lg">
        {/* Timeline Header */}
        <div className="border-b p-4">
          <div className="flex">
            <div className="w-48 flex-shrink-0"></div>
            <div className="flex-1 overflow-hidden">
              <div className="flex justify-between mb-2">
                <button 
                  className="text-gray-600 hover:text-gray-800"
                  onClick={() => setCurrentQuarter('Q2 2024')}
                >
                  ←
                </button>
                <h3 className="font-semibold">{timeline.quarter}</h3>
                <button 
                  className="text-gray-600 hover:text-gray-800"
                  onClick={() => setCurrentQuarter('Q3 2024')}
                >
                  →
                </button>
              </div>
              <div className="flex">
                <div className="flex-1">
                  <div className="text-sm text-gray-600">{timeline.month}</div>
                  <div className="grid grid-cols-7 gap-4">
                    {timeline.days.map((day) => (
                      <div key={day} className="text-sm text-center">{day}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Content */}
        <div 
          ref={scrollContainerRef}
          className="relative overflow-x-auto"
          onScroll={handleScroll}
          style={{ maxHeight: '500px' }}
        >
          <div className="inline-block min-w-full">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center border-b">
                <div className="w-48 p-4 font-medium flex-shrink-0">{task.name}</div>
                <div className="flex-1 p-4 relative" style={{ minWidth: '700px' }}>
                  <div 
                    className={`absolute h-6 rounded ${task.color}`}
                    style={{
                      left: `${calculatePosition(task.startDate)}px`,
                      width: calculateWidth(task.startDate, task.endDate)
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default View2;