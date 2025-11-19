// src/pages/AdminPanel.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, PieChart } from './AdminCharts';
import AdminHeader from './AdminHeader';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    // Simulate API loading
    setTimeout(() => {
      setUsers([
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          resumes: 3,
          lastActive: '2023-06-15',
          plan: 'Premium',
          joined: '2023-05-10'
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane@example.com',
          resumes: 5,
          lastActive: '2023-06-18',
          plan: 'Free',
          joined: '2023-04-22'
        },
        {
          id: 3,
          name: 'Robert Johnson',
          email: 'robert@example.com',
          resumes: 8,
          lastActive: '2023-06-20',
          plan: 'Premium',
          joined: '2023-03-15'
        },
        {
          id: 4,
          name: 'Emily Davis',
          email: 'emily@example.com',
          resumes: 2,
          lastActive: '2023-06-19',
          plan: 'Free',
          joined: '2023-06-01'
        },
        {
          id: 5,
          name: 'Michael Wilson',
          email: 'michael@example.com',
          resumes: 12,
          lastActive: '2023-06-21',
          plan: 'Enterprise',
          joined: '2023-01-05'
        }
      ]);
      
      setStats({
        totalUsers: 1242,
        activeToday: 342,
        premiumUsers: 567,
        resumesCreated: 4583,
        templatesUsage: [
          { name: 'Modern Blue', value: 45 },
          { name: 'Creative Purple', value: 28 },
          { name: 'Professional Teal', value: 15 },
          { name: 'Minimalist', value: 12 }
        ],
        monthlyGrowth: [
          { month: 'Jan', users: 200, resumes: 450 },
          { month: 'Feb', users: 320, resumes: 620 },
          { month: 'Mar', users: 480, resumes: 890 },
          { month: 'Apr', users: 650, resumes: 1250 },
          { month: 'May', users: 890, resumes: 2100 },
          { month: 'Jun', users: 1242, resumes: 4583 }
        ]
      });
      
      setLoading(false);
    }, 800);
  }, []);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600"></div>
        </div>
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab stats={stats} />;
      case 'users':
        return <UsersTab users={filteredUsers} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />;
      case 'resumes':
        return <ResumesTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <DashboardTab stats={stats} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div 
              className="bg-white rounded-xl shadow-lg p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-xl font-bold text-gray-800 mb-6">Admin Panel</h2>
              
              <nav className="space-y-2">
                {[
                  { id: 'dashboard', icon: 'fas fa-chart-line', label: 'Dashboard' },
                  { id: 'users', icon: 'fas fa-users', label: 'Users' },
                  { id: 'resumes', icon: 'fas fa-file-alt', label: 'Resumes' },
                  { id: 'settings', icon: 'fas fa-cog', label: 'Settings' }
                ].map((item) => (
                  <motion.button
                    key={item.id}
                    className={`flex items-center w-full p-3 rounded-lg text-left transition-colors ${
                      activeTab === item.id 
                        ? 'bg-indigo-50 text-indigo-600' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab(item.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <i className={`${item.icon} mr-3 w-5 text-center`}></i>
                    <span className="font-medium">{item.label}</span>
                  </motion.button>
                ))}
              </nav>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-800">Admin User</h3>
                    <p className="text-sm text-gray-600">admin@resumecraft.com</p>
                  </div>
                </div>
                <button className="mt-4 w-full py-2 rounded-lg bg-gray-100 text-gray-800 font-medium hover:bg-gray-200 transition-colors">
                  <i className="fas fa-sign-out-alt mr-2"></i> Logout
                </button>
              </div>
            </motion.div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div 
              className="bg-white rounded-xl shadow-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {renderContent()}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Dashboard Tab Component
const DashboardTab = ({ stats }) => (
  <div>
    <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard 
        icon="fas fa-users" 
        title="Total Users" 
        value={stats.totalUsers} 
        change="+12.4%"
        color="indigo"
      />
      <StatCard 
        icon="fas fa-file-alt" 
        title="Resumes Created" 
        value={stats.resumesCreated} 
        change="+24.7%"
        color="purple"
      />
      <StatCard 
        icon="fas fa-crown" 
        title="Premium Users" 
        value={stats.premiumUsers} 
        change="+8.3%"
        color="amber"
      />
      <StatCard 
        icon="fas fa-user-clock" 
        title="Active Today" 
        value={stats.activeToday} 
        change="+5.2%"
        color="emerald"
      />
    </div>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div className="bg-gray-50 rounded-xl p-4">
        <h3 className="font-semibold text-gray-800 mb-4">Monthly Growth</h3>
        <BarChart data={stats.monthlyGrowth} />
      </div>
      <div className="bg-gray-50 rounded-xl p-4">
        <h3 className="font-semibold text-gray-800 mb-4">Template Usage</h3>
        <PieChart data={stats.templatesUsage} />
      </div>
    </div>
    
    <div className="bg-gray-50 rounded-xl p-6">
      <h3 className="font-semibold text-gray-800 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        <ActivityItem 
          user="John Doe" 
          action="created a new resume" 
          time="10 minutes ago"
          template="Modern Blue"
        />
        <ActivityItem 
          user="Emily Davis" 
          action="upgraded to Premium plan" 
          time="45 minutes ago"
        />
        <ActivityItem 
          user="Michael Wilson" 
          action="downloaded resume PDF" 
          time="1 hour ago"
          template="Professional Teal"
        />
        <ActivityItem 
          user="Robert Johnson" 
          action="shared resume online" 
          time="2 hours ago"
        />
        <ActivityItem 
          user="Jane Smith" 
          action="created a new resume" 
          time="3 hours ago"
          template="Creative Purple"
        />
      </div>
    </div>
  </div>
);

// Users Tab Component
const UsersTab = ({ users, searchTerm, setSearchTerm }) => (
  <div>
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">User Management</h2>
      <div className="relative w-full md:w-64">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        />
        <i className="fas fa-search absolute left-3 top-3.5 text-gray-400"></i>
      </div>
    </div>
    
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100 text-gray-600 text-left">
            <th className="p-3 font-semibold">User</th>
            <th className="p-3 font-semibold">Email</th>
            <th className="p-3 font-semibold">Resumes</th>
            <th className="p-3 font-semibold">Last Active</th>
            <th className="p-3 font-semibold">Plan</th>
            <th className="p-3 font-semibold text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <motion.tr 
              key={user.id}
              className="border-b border-gray-200 hover:bg-gray-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <td className="p-3">
                <div className="flex items-center">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                  <span className="ml-3 font-medium text-gray-800">{user.name}</span>
                </div>
              </td>
              <td className="p-3 text-gray-600">{user.email}</td>
              <td className="p-3">
                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                  {user.resumes}
                </span>
              </td>
              <td className="p-3 text-gray-600">{user.lastActive}</td>
              <td className="p-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  user.plan === 'Premium' ? 'bg-purple-100 text-purple-800' : 
                  user.plan === 'Enterprise' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {user.plan}
                </span>
              </td>
              <td className="p-3 text-center">
                <div className="flex justify-center space-x-2">
                  <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full">
                    <i className="fas fa-eye"></i>
                  </button>
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
                    <i className="fas fa-edit"></i>
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded-full">
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
    
    <div className="flex justify-between items-center mt-6">
      <div className="text-gray-600">Showing 1 to 5 of 1242 users</div>
      <div className="flex space-x-2">
        <button className="px-4 py-2 bg-gray-200 rounded-lg text-gray-800">
          Previous
        </button>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg">
          1
        </button>
        <button className="px-4 py-2 bg-gray-200 rounded-lg text-gray-800">
          2
        </button>
        <button className="px-4 py-2 bg-gray-200 rounded-lg text-gray-800">
          3
        </button>
        <button className="px-4 py-2 bg-gray-200 rounded-lg text-gray-800">
          Next
        </button>
      </div>
    </div>
  </div>
);

// Resumes Tab Component
const ResumesTab = () => (
  <div>
    <h2 className="text-2xl font-bold text-gray-800 mb-6">Resume Management</h2>
    <div className="text-center py-16 text-gray-500">
      <i className="fas fa-file-alt text-5xl mb-4 text-indigo-200"></i>
      <p className="text-xl">Resume management coming soon!</p>
      <p className="mt-2">We're working on tools to help you manage resumes created on our platform.</p>
    </div>
  </div>
);

// Settings Tab Component
const SettingsTab = () => (
  <div>
    <h2 className="text-2xl font-bold text-gray-800 mb-6">System Settings</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="font-semibold text-gray-800 mb-4">General Settings</h3>
        <div className="space-y-4">
          <SettingToggle 
            label="Maintenance Mode" 
            description="Put the website under maintenance"
          />
          <SettingToggle 
            label="New User Registrations" 
            description="Allow new users to sign up"
            enabled={true}
          />
          <SettingToggle 
            label="Email Notifications" 
            description="Send email notifications to users"
            enabled={true}
          />
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="font-semibold text-gray-800 mb-4">Appearance</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Primary Color</label>
            <div className="flex space-x-3">
              {['#6366f1', '#10b981', '#8b5cf6', '#ef4444', '#f97316'].map((color) => (
                <div 
                  key={color}
                  className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-300"
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Logo</label>
            <div className="flex items-center">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
              <button className="ml-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg">
                Upload New
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div className="mt-8 bg-gray-50 rounded-xl p-6">
      <h3 className="font-semibold text-gray-800 mb-4">Danger Zone</h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
          <div>
            <h4 className="font-medium text-red-800">Reset All Data</h4>
            <p className="text-sm text-red-600">This will permanently delete all user data and cannot be undone</p>
          </div>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
            Reset Data
          </button>
        </div>
        
        <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg">
          <div>
            <h4 className="font-medium text-yellow-800">Export All Data</h4>
            <p className="text-sm text-yellow-600">Export all user data as CSV file</p>
          </div>
          <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
            Export Data
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Reusable Components
const StatCard = ({ icon, title, value, change, color }) => {
  const colorClasses = {
    indigo: 'bg-indigo-100 text-indigo-800',
    purple: 'bg-purple-100 text-purple-800',
    amber: 'bg-amber-100 text-amber-800',
    emerald: 'bg-emerald-100 text-emerald-800'
  };
  
  return (
    <motion.div 
      className="bg-white rounded-xl shadow p-5"
      whileHover={{ y: -5 }}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-600 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <i className={`${icon} text-lg`}></i>
        </div>
      </div>
      <p className="text-sm mt-3">
        <span className="text-green-600 font-medium">{change}</span> from last week
      </p>
    </motion.div>
  );
};

const ActivityItem = ({ user, action, time, template }) => (
  <motion.div 
    className="flex p-4 bg-white rounded-lg border border-gray-200"
    whileHover={{ x: 5 }}
  >
    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
    <div className="ml-4">
      <p className="text-gray-800">
        <span className="font-medium">{user}</span> {action}
        {template && <span> using <span className="font-medium">{template}</span></span>}
      </p>
      <p className="text-sm text-gray-500">{time}</p>
    </div>
  </motion.div>
);

const SettingToggle = ({ label, description, enabled = false }) => (
  <div className="flex justify-between items-center">
    <div>
      <p className="font-medium text-gray-800">{label}</p>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
    <div className={`relative inline-block w-12 h-6 rounded-full transition-colors ${
      enabled ? 'bg-indigo-600' : 'bg-gray-300'
    }`}>
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
        enabled ? 'left-7' : 'left-1'
      }`}></div>
    </div>
  </div>
);

export default AdminPanel;