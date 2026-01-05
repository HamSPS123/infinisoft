import React, { useEffect } from 'react';
import { FiBox, FiTag, FiUsers, FiPackage, FiTrendingUp, FiCalendar, FiLoader } from 'react-icons/fi';
import { toast } from 'react-toastify';
import useDashboardStore from '../../stores/dashboard.store';
import SEO from '../../components/SEO';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const Dashboard: React.FC = () => {
  // Get dashboard data and functions from the store
  const { data, loading, error, fetchDashboardData } = useDashboardStore();

  // Fetch dashboard data on component mount
  useEffect(() => {
    fetchDashboardData().catch(err => {
      console.error('Error in dashboard component:', err);
      toast.error('Failed to load dashboard data');
    });
  }, [fetchDashboardData]);

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }).format(date);
    } catch {
      return 'Invalid date';
    }
  };

  return (
    <>
      <SEO title="Dashboard" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-sky-50 p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-600 to-sky-600 bg-clip-text text-transparent mb-2">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 flex items-center gap-2">
            <FiCalendar className="text-sky-600" />
            Welcome back! Here's what's happening with your business today.
          </p>
        </div>
        
        {/* Loading state */}
        {loading && (
          <div className="flex flex-col justify-center items-center p-16">
            <FiLoader className="animate-spin text-6xl text-sky-600 mb-4" />
            <p className="text-gray-600 text-lg">Loading dashboard data...</p>
          </div>
        )}
        
        {/* Error state */}
        {error && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-red-800 mb-2">Error Loading Dashboard</h3>
                  <p className="text-red-700">{error}</p>
                </div>
                <Button 
                  onClick={() => fetchDashboardData()} 
                  variant="outline"
                  className="border-red-300 text-red-700 hover:bg-red-100"
                >
                  Retry
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Dashboard content */}
        {!loading && !error && data && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Products */}
              <Card className="border-sky-200 bg-gradient-to-br from-white to-sky-50 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-sky-100 shadow-sm">
                      <FiBox className="text-sky-600" size={28} />
                    </div>
                    {data.stats.newProductsThisMonth > 0 && (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                        <FiTrendingUp className="mr-1" size={12} />
                        +{data.stats.newProductsThisMonth}
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-1">
                    {data.stats.totalProducts.toLocaleString()}
                  </h3>
                  <p className="text-sm font-medium text-gray-600">Total Products</p>
                  {data.stats.newProductsThisMonth > 0 && (
                    <p className="text-xs text-green-600 mt-2">+{data.stats.newProductsThisMonth} this month</p>
                  )}
                </CardContent>
              </Card>
              
              {/* Categories */}
              <Card className="border-emerald-200 bg-gradient-to-br from-white to-emerald-50 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-100 shadow-sm">
                      <FiTag className="text-emerald-600" size={28} />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-1">
                    {data.stats.totalCategories.toLocaleString()}
                  </h3>
                  <p className="text-sm font-medium text-gray-600">Product Categories</p>
                </CardContent>
              </Card>
              
              {/* Partners */}
              <Card className="border-purple-200 bg-gradient-to-br from-white to-purple-50 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-purple-100 shadow-sm">
                      <FiPackage className="text-purple-600" size={28} />
                    </div>
                    {data.stats.newPartnersThisMonth > 0 && (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                        <FiTrendingUp className="mr-1" size={12} />
                        +{data.stats.newPartnersThisMonth}
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-1">
                    {data.stats.totalPartners.toLocaleString()}
                  </h3>
                  <p className="text-sm font-medium text-gray-600">Partners</p>
                  {data.stats.newPartnersThisMonth > 0 && (
                    <p className="text-xs text-green-600 mt-2">+{data.stats.newPartnersThisMonth} this month</p>
                  )}
                </CardContent>
              </Card>
              
              {/* Users */}
              <Card className="border-orange-200 bg-gradient-to-br from-white to-orange-50 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-100 shadow-sm">
                      <FiUsers className="text-orange-600" size={28} />
                    </div>
                    {data.stats.newUsersThisMonth > 0 && (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                        <FiTrendingUp className="mr-1" size={12} />
                        +{data.stats.newUsersThisMonth}
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-1">
                    {data.stats.totalUsers.toLocaleString()}
                  </h3>
                  <p className="text-sm font-medium text-gray-600">Users</p>
                  {data.stats.newUsersThisMonth > 0 && (
                    <p className="text-xs text-green-600 mt-2">+{data.stats.newUsersThisMonth} this month</p>
                  )}
                </CardContent>
              </Card>
            </div>
            
            {/* Recent Products */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FiBox className="text-sky-600" />
                  Recent Products
                </CardTitle>
                <CardDescription>Latest products added to your inventory</CardDescription>
              </CardHeader>
              <CardContent>
                {data.recentProducts && data.recentProducts.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Created</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {data.recentProducts.map((product) => (
                          <TableRow key={product.id}>
                            <TableCell className="font-medium">{product.name}</TableCell>
                            <TableCell>
                              <Badge variant="secondary">
                                {product.category?.name || 'Uncategorized'}
                              </Badge>
                            </TableCell>
                            <TableCell className="font-mono">
                              ${typeof product.price === 'number' ? product.price.toFixed(2) : '0.00'}
                            </TableCell>
                            <TableCell className="text-gray-600">
                              {formatDate(product.createdAt)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <FiBox className="mx-auto text-4xl mb-2 text-gray-300" />
                    <p>No products available</p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Recent Partners */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FiPackage className="text-purple-600" />
                  Recent Partners
                </CardTitle>
                <CardDescription>Latest partners who joined your network</CardDescription>
              </CardHeader>
              <CardContent>
                {data.recentPartners && data.recentPartners.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead>Joined</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {data.recentPartners.map((partner) => (
                          <TableRow key={partner.id}>
                            <TableCell className="font-medium">{partner.name}</TableCell>
                            <TableCell className="text-gray-600">{partner.email}</TableCell>
                            <TableCell className="text-gray-600">{partner.phone}</TableCell>
                            <TableCell className="text-gray-600">
                              {formatDate(partner.createdAt)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <FiPackage className="mx-auto text-4xl mb-2 text-gray-300" />
                    <p>No partners available</p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Recent Users */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FiUsers className="text-orange-600" />
                  Recent Users
                </CardTitle>
                <CardDescription>Latest users registered in the system</CardDescription>
              </CardHeader>
              <CardContent>
                {data.recentUsers && data.recentUsers.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Joined</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {data.recentUsers.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.name}</TableCell>
                            <TableCell className="text-gray-600">{user.email}</TableCell>
                            <TableCell>
                              <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                                {user.role}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-gray-600">
                              {formatDate(user.createdAt)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <FiUsers className="mx-auto text-4xl mb-2 text-gray-300" />
                    <p>No users available</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;