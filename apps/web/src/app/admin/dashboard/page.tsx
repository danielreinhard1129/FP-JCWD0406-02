import HeaderSalesReportSuperAdmin from '../components/HeaderSalesReportSuperAdmin';
import SalesPickerCategory from '../components/SalesPickerCategory';
import SalesPickerProduct from '../components/SalesPickerProduct';
import SalesPickerNew from '../components/SalesPickerWarehouse';
import AdminSidebar from '../components/SidebarDashboard';

const Dashboard = () => {
  return (
    <div className="flex min-h-screen gap-4 mx-auto max-w-7xl mt-8">
      <AdminSidebar />
      <div className="w-full space-y-4">
        <HeaderSalesReportSuperAdmin />
        <div className="flex-wrap space-y-10">
          <SalesPickerNew />
          <SalesPickerCategory />
          <SalesPickerProduct />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
