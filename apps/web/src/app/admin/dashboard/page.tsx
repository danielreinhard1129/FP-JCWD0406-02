import HeaderSalesReportSuperAdmin from '../components/HeaderSalesReportSuperAdmin';
import SalesPicker from '../components/SalesPicker';
import AdminSidebar from '../components/SidebarDashboard';
import CategoryCard from './category-management/components/CategoryCard';

const Dashboard = () => {
  return (
    <div className="flex min-h-screen gap-4 mx-auto max-w-7xl mt-8">
      <AdminSidebar />
      <div className="w-full space-y-4">
        <HeaderSalesReportSuperAdmin />
        <div className="flex-wrap">
          <SalesPicker />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
