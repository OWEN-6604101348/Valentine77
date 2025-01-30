import React from 'react';
import { Line } from 'react-chartjs-2';
import { useTable } from 'react-table';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Registering chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Index = ({ products, orders }) => {
  // ข้อมูลกราฟ
  const graphData = {
    labels: products.map((product) => product.name), // ชื่อของสินค้าเป็นแกน X
    datasets: [
      {
        label: 'Sales Data',
        data: products.map((product) => product.stock), // จำนวนสินค้าในสต็อก
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  };

  // Combine product and order data into a single array (excluding Total Quantity and Order Details)
  const combinedData = products.map((product) => {
    const productOrders = orders.filter((order) =>
      order.order_details.some((detail) => detail.product_id === product.id)
    );

    return {
      ...product,
      order_details: productOrders,
    };
  });

  // ตารางข้อมูล
  const columns = React.useMemo(
    () => [
      { Header: 'Product Name', accessor: 'name' },
      { Header: 'Price', accessor: 'price' },
      { Header: 'Stock', accessor: 'stock' },
    ],
    []
  );

  const data = React.useMemo(() => combinedData, [combinedData]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Product and Sales Data</h1>

      {/* กราฟ */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-center mb-4">Sales Graph (Stock)</h2>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <Line data={graphData} />
        </div>
      </div>

      {/* ตารางข้อมูลรวมสินค้า */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-center mb-4">Product Table</h2>
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-6">
          <table {...getTableProps()} className="min-w-full table-auto">
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-100 text-gray-700">
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()} className="px-4 py-2 text-left border-b">
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} className="hover:bg-gray-50">
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()} className="px-4 py-2 border-b">
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Index;
