'use client';

import React from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// --- AQI POLLUTION SCATTER PLOT DATA ---
interface AQIPoint {
  x: number; // PM2.5 (μg/m³)
  y: number; // PM10 (μg/m³)
  category: number; // 0: Good, 1: Moderate, 2: Unhealthy
}

const aqiColors = [
  '#10B981', // Emerald - Good
  '#F59E0B', // Amber - Moderate
  '#EF4444', // Red - Unhealthy
];

const aqiNames = [
  'Good (Air Quality Index: 0 - 50)',
  'Moderate (Air Quality Index: 51 - 100)',
  'Unhealthy (Air Quality Index: 101+)',
];

const aqiData: AQIPoint[] = [
  // Category 0: Good
  { x: 12, y: 18, category: 0 },
  { x: 18, y: 22, category: 0 },
  { x: 8, y: 15, category: 0 },
  { x: 25, y: 32, category: 0 },
  { x: 30, y: 40, category: 0 },
  { x: 15, y: 25, category: 0 },
  // Category 1: Moderate
  { x: 45, y: 62, category: 1 },
  { x: 52, y: 78, category: 1 },
  { x: 38, y: 55, category: 1 },
  { x: 40, y: 58, category: 1 },
  { x: 55, y: 82, category: 1 },
  { x: 48, y: 70, category: 1 },
  // Category 2: Unhealthy
  { x: 92, y: 120, category: 2 },
  { x: 115, y: 145, category: 2 },
  { x: 85, y: 110, category: 2 },
  { x: 130, y: 160, category: 2 },
  { x: 102, y: 132, category: 2 },
  { x: 120, y: 150, category: 2 },
];

export function AQIAnalysisChart() {
  return (
    <Card className="border border-border bg-card shadow-lg rounded-2xl overflow-hidden">
      <CardHeader className="border-b border-border/40 pb-4">
        <CardTitle className="text-xl font-bold font-headline text-foreground">
          PM2.5 vs PM10 Concentration Plot
        </CardTitle>
        <CardDescription>
          Exploratory scatter plot representing air quality records grouped by pollutant index categories.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} stroke="var(--border)" />
              <XAxis 
                type="number" 
                dataKey="x" 
                name="PM2.5" 
                unit=" μg/m³" 
                stroke="var(--muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                type="number" 
                dataKey="y" 
                name="PM10" 
                unit=" μg/m³" 
                stroke="var(--muted-foreground)"
                fontSize={12}
              />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }} 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload as AQIPoint;
                    return (
                      <div className="bg-[#111827] border border-border/80 px-3 py-2 rounded-lg text-xs font-mono text-slate-300">
                        <p className="font-bold text-emerald-400 mb-1">{aqiNames[data.category].split(' (')[0]}</p>
                        <p>PM2.5: {data.x} μg/m³</p>
                        <p>PM10: {data.y} μg/m³</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Scatter name="Air Quality Checks" data={aqiData}>
                {aqiData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={aqiColors[entry.category]} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-medium">
          {aqiNames.map((name, idx) => (
            <div key={idx} className="flex items-center space-x-1.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: aqiColors[idx] }} />
              <span className="text-muted-foreground truncate" title={name}>{name.split(' (')[0]}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// --- FOOD WASTE REDUCTION DATA ---
interface FoodWasteReduction {
  month: string;
  actualWaste: number;
  optimizedWaste: number;
}

const foodWasteData: FoodWasteReduction[] = [
  { month: 'Jan', actualWaste: 4.8, optimizedWaste: 4.8 },
  { month: 'Feb', actualWaste: 5.2, optimizedWaste: 4.2 },
  { month: 'Mar', actualWaste: 6.1, optimizedWaste: 4.5 },
  { month: 'Apr', actualWaste: 5.8, optimizedWaste: 3.9 },
  { month: 'May', actualWaste: 7.2, optimizedWaste: 4.1 },
  { month: 'Jun', actualWaste: 8.5, optimizedWaste: 4.6 },
  { month: 'Jul', actualWaste: 9.2, optimizedWaste: 4.8 },
];

export function FoodWastePredictionChart() {
  return (
    <Card className="border border-border bg-card shadow-lg rounded-2xl overflow-hidden">
      <CardHeader className="border-b border-border/40 pb-4">
        <CardTitle className="text-xl font-bold font-headline text-foreground">
          Optimized Supply Predictions
        </CardTitle>
        <CardDescription>
          Line comparison showing actual food waste volumes vs. predicted volumes with ML storage optimization.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={foodWasteData} margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} stroke="var(--border)" />
              <XAxis 
                dataKey="month" 
                stroke="var(--muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--muted-foreground)"
                fontSize={12}
                unit=" Tons"
              />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-[#111827] border border-border/80 px-3 py-2 rounded-lg text-xs font-mono text-slate-300">
                        <p className="font-bold text-slate-200 mb-1">Month: {payload[0].payload.month}</p>
                        <p className="text-amber-500">Unoptimized Waste: {payload[0].value} Tons</p>
                        <p className="text-emerald-400">ML-Optimized Waste: {payload[1].value} Tons</p>
                        <p className="text-slate-400 text-[10px] mt-1">Reduction Score: -47.8%</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend 
                verticalAlign="top"
                height={36}
                wrapperStyle={{ fontSize: 12, fontFamily: 'monospace' }}
              />
              <Line 
                type="monotone" 
                dataKey="actualWaste" 
                name="Baseline Food Waste" 
                stroke="#F59E0B" 
                strokeWidth={3} 
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="optimizedWaste" 
                name="ML Predicted Reduction" 
                stroke="#10B981" 
                strokeWidth={3} 
                strokeDasharray="5 5"
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
