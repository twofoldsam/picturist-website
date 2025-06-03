
import React, { useState, useEffect } from 'react';

interface MetricCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

export const MetricCounter: React.FC<MetricCounterProps> = ({
  end,
  duration = 2000,
  prefix = '',
  suffix = '',
}) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTimestamp: number;
    let animationFrameId: number;
    
    // Faster start, slower end easing
    const easeOutQuad = (t: number): number => t * (2 - t);
    
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easedProgress = easeOutQuad(progress);
      
      setCount(Math.floor(easedProgress * end));
      
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };
    
    animationFrameId = requestAnimationFrame(step);
    
    return () => cancelAnimationFrame(animationFrameId);
  }, [end, duration]);
  
  return (
    <span>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

interface MetricsGroupProps {
  metrics: {
    value: number;
    label: string;
    prefix?: string;
    suffix?: string;
  }[];
  className?: string;
}

export const MetricsGroup: React.FC<MetricsGroupProps> = ({
  metrics,
  className = ''
}) => {
  return (
    /* Metrics section commented out temporarily
    <div className={`flex flex-wrap gap-6 md:gap-12 justify-center ${className}`}>
      {metrics.map((metric, index) => (
        <div key={index} className="text-center">
          <div className="font-bold text-2xl md:text-3xl text-charcoal">
            <MetricCounter 
              end={metric.value} 
              suffix={metric.suffix || ''} 
              prefix={metric.prefix || ''}
            />
          </div>
          <div className="text-slate-600 text-sm mt-1">{metric.label}</div>
        </div>
      ))}
    </div>
    */
    <></>
  );
};
