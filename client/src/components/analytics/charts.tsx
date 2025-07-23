import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Heart, Share, TrendingUp } from "lucide-react";
import { useEffect, useRef } from "react";

interface AnalyticsMetrics {
  totalRevenue: number;
  monthlyGrowth: number;
  engagementRate: number;
  totalPosts: number;
  roi: number;
  chartData: {
    revenue: {
      labels: string[];
      data: number[];
    };
    engagement: {
      labels: string[];
      data: number[];
    };
  };
}

interface AnalyticsChartsProps {
  metrics?: AnalyticsMetrics;
}

export default function AnalyticsCharts({ metrics }: AnalyticsChartsProps) {
  const revenueChartRef = useRef<HTMLCanvasElement>(null);
  const engagementChartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!metrics || typeof window === 'undefined') return;

    // Dynamically import Chart.js to avoid SSR issues
    import('chart.js/auto').then((Chart) => {
      const ChartJS = Chart.default;

      // Revenue Chart
      if (revenueChartRef.current) {
        const revenueCtx = revenueChartRef.current.getContext('2d');
        if (revenueCtx) {
          new ChartJS(revenueCtx, {
            type: 'line',
            data: {
              labels: metrics.chartData.revenue.labels,
              datasets: [{
                label: 'Revenue ($)',
                data: metrics.chartData.revenue.data,
                borderColor: '#FFD700',
                backgroundColor: 'rgba(255, 215, 0, 0.1)',
                tension: 0.4,
                fill: true
              }]
            },
            options: {
              responsive: true,
              plugins: {
                legend: {
                  labels: { color: '#FFFFFF' }
                }
              },
              scales: {
                x: { 
                  ticks: { color: '#808080' },
                  grid: { color: '#3E2723' }
                },
                y: { 
                  ticks: { color: '#808080' },
                  grid: { color: '#3E2723' }
                }
              }
            }
          });
        }
      }

      // Engagement Chart
      if (engagementChartRef.current) {
        const engagementCtx = engagementChartRef.current.getContext('2d');
        if (engagementCtx) {
          new ChartJS(engagementCtx, {
            type: 'doughnut',
            data: {
              labels: metrics.chartData.engagement.labels,
              datasets: [{
                data: metrics.chartData.engagement.data,
                backgroundColor: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1'],
                borderWidth: 0
              }]
            },
            options: {
              responsive: true,
              plugins: {
                legend: {
                  labels: { color: '#FFFFFF' }
                }
              }
            }
          });
        }
      }
    });
  }, [metrics]);

  if (!metrics) {
    return <div className="text-center py-8">Loading analytics...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-cardBg border-secondaryBrown">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutralGray text-sm">Total Revenue</p>
                <p className="text-2xl font-bold text-accentGold">£{metrics.totalRevenue.toLocaleString()}</p>
                <p className="text-green-400 text-sm">+{metrics.monthlyGrowth}% vs last month</p>
              </div>
              <DollarSign className="text-accentGold w-8 h-8" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-cardBg border-secondaryBrown">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutralGray text-sm">Engagement Rate</p>
                <p className="text-2xl font-bold text-accentGold">{metrics.engagementRate}%</p>
                <p className="text-green-400 text-sm">+0.8% vs last month</p>
              </div>
              <Heart className="text-accentGold w-8 h-8" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-cardBg border-secondaryBrown">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutralGray text-sm">Posts Published</p>
                <p className="text-2xl font-bold text-accentGold">{metrics.totalPosts}</p>
                <p className="text-green-400 text-sm">This month</p>
              </div>
              <Share className="text-accentGold w-8 h-8" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-cardBg border-secondaryBrown">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutralGray text-sm">ROI</p>
                <p className="text-2xl font-bold text-accentGold">{metrics.roi}%</p>
                <p className="text-green-400 text-sm">Average return</p>
              </div>
              <TrendingUp className="text-accentGold w-8 h-8" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-cardBg border-secondaryBrown">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Revenue Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <canvas ref={revenueChartRef} width="400" height="200"></canvas>
          </CardContent>
        </Card>
        
        <Card className="bg-cardBg border-secondaryBrown">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Engagement by Platform</CardTitle>
          </CardHeader>
          <CardContent>
            <canvas ref={engagementChartRef} width="400" height="200"></canvas>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
