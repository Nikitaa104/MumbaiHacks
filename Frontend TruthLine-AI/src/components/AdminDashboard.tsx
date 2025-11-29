import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { X, Users, CheckCircle, XCircle, AlertCircle, TrendingUp, Database, Activity } from "lucide-react";
import { useAuth } from '../contexts/AuthContext';

interface AdminDashboardProps {
  onClose: () => void;
}

export function AdminDashboard({ onClose }: AdminDashboardProps) {
  const { user } = useAuth();

  const stats = [
    { label: "Total Users", value: "12,453", change: "+12%", icon: Users, color: "text-blue-600" },
    { label: "Claims Verified Today", value: "1,247", change: "+8%", icon: CheckCircle, color: "text-green-600" },
    { label: "False Claims Detected", value: "384", change: "-5%", icon: XCircle, color: "text-red-600" },
    { label: "Pending Reviews", value: "56", change: "+3%", icon: AlertCircle, color: "text-yellow-600" }
  ];

  const recentActivity = [
    { id: 1, action: "User verification", user: "john@example.com", status: "TRUE", time: "2 mins ago" },
    { id: 2, action: "Admin access", user: "admin@example.com", status: "GRANTED", time: "5 mins ago" },
    { id: 3, action: "Bulk verification", user: "system@verifyai.com", status: "COMPLETED", time: "12 mins ago" },
    { id: 4, action: "User verification", user: "sarah@example.com", status: "FALSE", time: "18 mins ago" },
    { id: 5, action: "API request", user: "api.client@example.com", status: "SUCCESS", time: "25 mins ago" }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-slate-900 mb-1">Admin Dashboard</h2>
            <p className="text-slate-600">Welcome back, {user?.name}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  <span className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                </div>
                <div className="text-slate-900 mb-1">{stat.value}</div>
                <p className="text-sm text-slate-600">{stat.label}</p>
              </Card>
            ))}
          </div>

          {/* System Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-slate-900 mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" />
                System Performance
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-600">API Uptime</span>
                    <span className="text-slate-900">99.98%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '99.98%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-600">MongoDB Health</span>
                    <span className="text-slate-900">Excellent</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-600">Node.js Response Time</span>
                    <span className="text-slate-900">1.2s avg</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-slate-900 mb-4 flex items-center gap-2">
                <Database className="w-5 h-5 text-purple-600" />
                Database Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Total Claims Stored</span>
                  <span className="text-slate-900">10,247,853</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Active Users</span>
                  <span className="text-slate-900">8,432</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Storage Used</span>
                  <span className="text-slate-900">847 GB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">API Calls Today</span>
                  <span className="text-slate-900">45,823</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="p-6">
            <h3 className="text-slate-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Recent Activity
            </h3>
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                  <div>
                    <div className="text-slate-900">{activity.action}</div>
                    <div className="text-sm text-slate-500">{activity.user}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      activity.status === 'TRUE' || activity.status === 'SUCCESS' || activity.status === 'GRANTED' || activity.status === 'COMPLETED'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {activity.status}
                    </span>
                    <span className="text-sm text-slate-500 min-w-[80px] text-right">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Admin Actions */}
          <div className="flex gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Users className="w-4 h-4 mr-2" />
              Manage Users
            </Button>
            <Button variant="outline">
              <Database className="w-4 h-4 mr-2" />
              Database Settings
            </Button>
            <Button variant="outline">
              <Activity className="w-4 h-4 mr-2" />
              View Reports
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
