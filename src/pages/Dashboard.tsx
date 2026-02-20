import { useState, useEffect } from 'react';
import AppSidebar from "@/components/shared/app-sidebar";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight,
  Plus,
  RefreshCw,
  Bell,
  Search
} from 'lucide-react';

// Sample portfolio data
const portfolioData = {
  totalBalance: 12580.50,
  change24h: 3.24,
  changePercent: 2.45,
  assets: [
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', amount: 0.25, price: 43250.00, change: 2.3 },
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', amount: 2.5, price: 2280.00, change: -1.2 },
    { id: 'solana', name: 'Solana', symbol: 'SOL', amount: 15, price: 98.50, change: 5.7 },
    { id: 'cardano', name: 'Cardano', symbol: 'ADA', amount: 1000, price: 0.52, change: -0.5 },
  ]
};

const recentTransactions = [
  { id: 1, type: 'buy', asset: 'Bitcoin', amount: 0.01, price: 43250, date: '2024-01-15' },
  { id: 2, type: 'sell', asset: 'Ethereum', amount: 0.5, price: 2280, date: '2024-01-14' },
  { id: 3, type: 'buy', asset: 'Solana', amount: 5, price: 98.50, date: '2024-01-13' },
];

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    setLastUpdated(new Date());
    setTimeout(() => setIsLoading(false), 1000);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AppSidebar />
      
      {/* Main Content */}
      <main className="ml-64 p-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">Welcome back! Here's your portfolio overview.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh}
              className="gap-2"
            >
              <RefreshCw className={`size-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="size-4" />
              <span className="absolute -top-1 -right-1 size-2 bg-red-500 rounded-full"></span>
            </Button>
            <div className="h-8 w-8 rounded-full bg-gray-900 flex items-center justify-center">
              <span className="text-white text-sm font-medium">U</span>
            </div>
          </div>
        </header>

        {/* Portfolio Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Balance Card */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-500 text-sm font-medium">Total Balance</span>
              <div className="p-2 bg-gray-100 rounded-lg">
                <Wallet className="size-5 text-gray-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              {isLoading ? '...' : formatCurrency(portfolioData.totalBalance)}
            </h2>
            <div className="flex items-center gap-1 mt-2">
              {portfolioData.change24h >= 0 ? (
                <TrendingUp className="size-4 text-green-500" />
              ) : (
                <TrendingDown className="size-4 text-red-500" />
              )}
              <span className={`text-sm font-medium ${portfolioData.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {portfolioData.change24h >= 0 ? '+' : ''}{portfolioData.change24h}%
              </span>
              <span className="text-gray-400 text-sm">last 24h</span>
            </div>
          </div>

          {/* 24h Profit/Loss */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-500 text-sm font-medium">24h Change</span>
              <div className="p-2 bg-gray-100 rounded-lg">
                {portfolioData.changePercent >= 0 ? (
                  <ArrowUpRight className="size-5 text-green-500" />
                ) : (
                  <ArrowDownRight className="size-5 text-red-500" />
                )}
              </div>
            </div>
            <h2 className={`text-3xl font-bold ${portfolioData.changePercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {isLoading ? '...' : `${portfolioData.changePercent >= 0 ? '+' : ''}${formatCurrency(portfolioData.totalBalance * portfolioData.changePercent / 100)}`}
            </h2>
            <p className="text-gray-400 text-sm mt-2">
              {portfolioData.changePercent >= 0 ? 'Profit' : 'Loss'} today
            </p>
          </div>

          {/* Total Assets */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-500 text-sm font-medium">Total Assets</span>
              <div className="p-2 bg-gray-100 rounded-lg">
                <TrendingUp className="size-5 text-gray-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              {isLoading ? '...' : portfolioData.assets.length}
            </h2>
            <p className="text-gray-400 text-sm mt-2">
              Different cryptocurrencies
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-4 mb-8">
          <Button className="bg-gray-900 hover:bg-gray-800 gap-2">
            <Plus className="size-4" />
            Add Asset
          </Button>
          <Button variant="outline" className="gap-2">
            <Search className="size-4" />
            Explore Markets
          </Button>
        </div>

        {/* Assets Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Your Assets</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">24h Change</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      Loading assets...
                    </td>
                  </tr>
                ) : (
                  portfolioData.assets.map((asset) => (
                    <tr key={asset.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                            <span className="text-gray-600 font-semibold text-sm">
                              {asset.symbol.charAt(0)}
                            </span>
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900">{asset.name}</p>
                            <p className="text-sm text-gray-500">{asset.symbol}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <p className="text-sm font-medium text-gray-900">{formatCurrency(asset.price)}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <p className="text-sm text-gray-900">{asset.amount}</p>
                        <p className="text-sm text-gray-500">{asset.symbol}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <p className="text-sm font-medium text-gray-900">
                          {formatCurrency(asset.amount * asset.price)}
                        </p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <span className={`inline-flex items-center gap-1 text-sm font-medium ${
                          asset.change >= 0 ? 'text-green-500' : 'text-red-500'
                        }`}>
                          {asset.change >= 0 ? (
                            <TrendingUp className="size-3" />
                          ) : (
                            <TrendingDown className="size-3" />
                          )}
                          {asset.change >= 0 ? '+' : ''}{asset.change}%
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-900">
                          Trade
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
            <Button variant="ghost" size="sm" className="text-gray-500">
              View All
            </Button>
          </div>
          <div className="divide-y divide-gray-200">
            {recentTransactions.map((tx) => (
              <div key={tx.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${tx.type === 'buy' ? 'bg-green-100' : 'bg-red-100'}`}>
                    {tx.type === 'buy' ? (
                      <ArrowDownRight className="size-4 text-green-600" />
                    ) : (
                      <ArrowUpRight className="size-4 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {tx.type === 'buy' ? 'Bought' : 'Sold'} {tx.asset}
                    </p>
                    <p className="text-sm text-gray-500">{tx.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {tx.type === 'buy' ? '-' : '+'}{formatCurrency(tx.amount * tx.price)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {tx.amount} {tx.asset.toUpperCase()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Last Updated */}
        <p className="text-center text-gray-400 text-sm mt-8">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </p>
      </main>
    </div>
  );
};

export default Dashboard;
