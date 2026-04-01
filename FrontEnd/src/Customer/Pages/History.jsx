import React, { useEffect, useState } from 'react';
import Header from '../Components/Common Components/Header';
import { useSelector } from 'react-redux';
import { Button, Chip, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useCallback } from 'react';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';


export default function History() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filters, setFilters] = useState({
    fromDate: null,
    toDate: null,
    deliveryProcess: ''
  });
    const changeDate = { "01": "Jan", "02": "Feb", "03": "Mar", "04": "Apr", "05": "May", "06": "Jun", "07": "Jul", "08": "Aug", "09": "Sep", "10": "Oct", "11": "Nov", "12": "Dec" };
  const [expandedOrder, setExpandedOrder] = useState({}); // Changed from null to {}
  const currentUser = useSelector((state) => state.user.currentUser);
  const userId = currentUser?.user?.userID;
  const token = currentUser?.token;

  const fetchOrders = async () => {
    try {
      const response = await fetch('/orders', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        const userOrders = data.filter((order) => order.userID === userId);
        const uniqueOrders = Array.from(
          new Map(userOrders.map((order) => [order.order_ID, order])).values()
        );
        const sortedOrders = uniqueOrders.sort((a, b) =>
          b.currentDate.localeCompare(a.currentDate)
        );
        setOrders(sortedOrders);
        setFilteredOrders(sortedOrders);
      } else {
        console.error('Error fetching orders:', data.message);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  const applyFilters = () => {
    let result = [...orders];

    if (filters.fromDate) {
      const fromDateStr = filters.fromDate.format('YYYY-MM-DD');
      result = result.filter(order =>
        order.currentDate >= fromDateStr
      );
    }
    if (filters.toDate) {
      const toDateStr = filters.toDate.format('YYYY-MM-DD');
      result = result.filter(order =>
        order.currentDate <= toDateStr
      );
    }

    if (filters.deliveryProcess) {
      result = result.filter(order =>
        order.deliveryProcess === filters.deliveryProcess
      );
    }

    setFilteredOrders(result);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (name, date) => {
    setFilters(prev => ({
      ...prev,
      [name]: date
    }));
  };

  const resetFilters = () => {
    setFilters({
      fromDate: null,
      toDate: null,
      deliveryProcess: ''
    });
    setFilteredOrders([...orders]);
  };

  const toggleOrderExpand = (orderId) => {
    setExpandedOrder(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  const getImageUrl = useCallback((imgPath) => {
    // Final fallback - a known working image or placeholder
    const FALLBACK = 'https://raw.githubusercontent.com/THIYAGUSRI/THAAIMAN/main/uploads/1765434787902-366029619.png';

    if (!imgPath || typeof imgPath !== 'string' || imgPath.trim() === '') {
      return FALLBACK;
    }

    const normalized = imgPath
      .replace(/\\/g, '/')           // fix any backslashes
      .replace(/^\/+/, '')           // remove leading slashes
      .trim();

    // If already a full URL, keep it (in case backend sends full link sometimes)
    if (normalized.startsWith('http://') || normalized.startsWith('https://')) {
      return normalized;
    }

    // Build correct GitHub RAW URL
    const repoOwner = 'THIYAGUSRI';
    const repoName = 'THAAIMAN';
    const branch = 'main';
    const folder = 'uploads';

    // If path already includes "uploads/", don't duplicate it
    let finalPath = normalized;
    if (!normalized.toLowerCase().startsWith('uploads/')) {
      finalPath = `${folder}/${normalized}`;
    }

    return `https://raw.githubusercontent.com/${repoOwner}/${repoName}/${branch}/${finalPath}`;
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="bg-gray-50 min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8 mt-30">
          <h1 className="text-3xl text-center font-bold font-soft-quicksand mb-8 text-gray-800">Order History</h1>

          {/* Filter Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div>
                <DatePicker
                  label="From Date"
                  value={filters.fromDate}
                  onChange={(date) => handleDateChange('fromDate', date)}
                  slotProps={{ textField: { size: 'small', fullWidth: true } }}
                />
              </div>

              <div>
                <DatePicker
                  label="To Date"
                  value={filters.toDate}
                  onChange={(date) => handleDateChange('toDate', date)}
                  slotProps={{ textField: { size: 'small', fullWidth: true } }}
                />
              </div>

            <div>
              <FormControl fullWidth size="small">
                <InputLabel>Order Status</InputLabel>
                <Select
                  name="deliveryProcess"
                  value={filters.deliveryProcess}
                  onChange={handleFilterChange}
                  label="Order Status"
                >
                  <MenuItem value="">All Statuses</MenuItem>
                  <MenuItem value="Order Placed">Order Placed</MenuItem>
                  <MenuItem value="Confirmed">Confirmed</MenuItem>
                  <MenuItem value="Delivered">Delivered</MenuItem>
                  <MenuItem value="Cancelled">Cancelled</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div>
              <Button
                variant="outlined"
                onClick={applyFilters}
                sx={{
                  ml: 2,
                  color: '#ffa000', // Text color
                  borderColor: '#ffa000', // Outline color
                  '&:hover': {
                    borderColor: '#ff8f00', // Slightly darker amber on hover
                    backgroundColor: 'rgba(255, 160, 0, 0.09)', // Subtle hover fill
                  },
                }}
              >
                Apply Filters
              </Button>
              <Button
                onClick={resetFilters}
                variant='outlined' color='secondary' sx={{ ml: 2 }}
              >
                Reset Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          {filteredOrders.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No orders found matching your filters</p>
          ) : (
            <div className="flex lg:flex-row gap-4">
              <div className="w-full p-6">
                <div className="overflow-x-auto">
                  {filteredOrders.map((order, index) => (
                    <div
                      key={`${order.order_ID}-${index}`}
                      className="border border-gray-200 bg-white rounded-2xl shadow-xl p-6 mb-10 relative"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2 w-full lg:pr-12">
                          <div className="text-xs font-bold text-soft-quicksand px-1 sm:px-3 py-0.5 sm:py-1 md:py-0.5 text-gray-800 sm:text-lg">
                            Order ID: <span className="font-normal font-soft-quicksand">{order.order_ID}</span>
                          </div>
                          <Chip label={order.deliveryProcess} size="small" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' } }}
                            color={order.deliveryProcess === "Order Placed" ? "primary" : order.deliveryProcess === "Confirmed" ? "warning" : order.deliveryProcess === "Delivered" ? "success" : order.deliveryProcess === "Cancelled" ? "error" : undefined} />
                        </div>
                        <button
                          onClick={() => toggleOrderExpand(order.order_ID)} // Fixed function name
                          className="text-gray-500 hover:text-gray-700 transition-transform duration-200 ease-in-out"
                        >
                          <svg
                            className={`w-7 h-7 transform ${expandedOrder[order.order_ID] ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>
                      </div>

                      {expandedOrder[order.order_ID] && (
                        <div className="flex flex-col lg:flex-row gap-6 mt-6">
                    <div className="w-full lg:w-2/3 overflow-x-auto">
                      <table className="w-full table-auto border-collapse">
                        <thead>
                          <tr className="bg-green-500 text-white text-left text-sm font-semibold">
                            <th className="p-4 text-center">Product Image</th>
                            <th className="p-4 text-center">Product Name</th>
                            <th className="p-4 text-center">Unit</th>
                            <th className="p-4 text-center">Orderd Quantity</th>
                            {(order.actual_quantity > 0 || order.actual_subtotal > 0 || order.actual_grandTotal > 0) && (
                              <th className="p-4 text-center">Deliverd Quantity</th>
                            )}
                            <th className="p-4 text-center">Rate</th>
                            <th className="p-4 text-center">Subtotal</th>
                            {(order.actual_quantity > 0 || order.actual_subtotal > 0 || order.actual_grandTotal > 0) && (
                              <th className="p-4 text-center">Actual SubTotal</th>
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {order.order_items.map((item) => (
                            <tr key={`${item.prod_ID}-${item.selectedRate.key}-${index}`} className="border-b border-gray-200 hover:bg-gray-50 transition duration-200">
                              <td className="p-4 text-center">
                                <img src={getImageUrl(item.image)} alt={item.prod_Name} className="w-16 h-16 object-cover rounded mx-auto" />
                              </td>
                              <td className="p-4 text-center">{item.prod_Name}</td>
                              <td className="p-4 text-center">{item.selectedRate.key}</td>
                              <td className={`${item.actual_quantity > 0 ? ('p-4 line-through text-center text-red-500') : ('p-4 text-center')}`}>{item.order_quantity}</td>
                              {(order.actual_quantity > 0 || order.actual_subtotal > 0 || order.actual_grandTotal > 0) && (
                                <td className="p-4 text-center">{item.actual_quantity > 0 ? item.actual_quantity : "-"}</td>
                              )}
                              <td className="p-4 text-center">₹{item.selectedRate.value.toFixed(2)}</td>
                              <td className={`${item.actual_quantity > 0 ? ('p-4 line-through text-center font-medium text-red-500') : ('p-4 text-center font-medium')}`}>₹{item.subtotal}</td>
                              {(order.actual_quantity > 0 || order.actual_subtotal > 0 || order.actual_grandTotal > 0) && (
                                <td className="p-4 text-center">
                                  {item.actual_subtotal > 0 ? `₹${item.actual_subtotal.toFixed(2)}` : "-"}
                                </td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="w-full lg:w-1/3 shadow-xl border border-gray-200 rounded-lg bg-gray-50">
                      <h2 className="font-bold text-xl bg-green-500 text-white py-4 text-start pl-5 rounded-t-lg">Order Summary</h2>
                      <div className="p-6 space-y-3 text-sm">
                        <p className="flex justify-between"><span>Total:</span><span className="font-medium">₹{order.total.toFixed(2)}</span></p>
                        <p className="flex justify-between"><span>GST (18%):</span><span className="font-medium">₹{order.gst.toFixed(2)}</span></p>
                        <p className="flex justify-between"><span>Delivery Charge:</span><span className="font-medium">₹{order.deliveryCharge.toFixed(2)}</span></p>
                        <p className="flex justify-between"><span>Discount:</span><span className="font-medium">₹{order.discount.toFixed(2)}</span></p>
                        {order.actual_grandTotal > 0 ? (
                          <p className="flex justify-between text-lg text-red-500 font-bold py-3 border-t border-b border-gray-300 line-through">
                            <span className='text-blue-600'>Grand Total:</span>
                            <span className="text-blue-600">₹{order.grandTotal.toFixed(2)}</span>
                          </p>
                        ) : (
                          <p className="flex justify-between text-lg font-bold border-gray-300 py-3 border-t border-b">
                            <span className='text-blue-600'>Grand Total:</span>
                            <span className="text-blue-600">₹{order.grandTotal.toFixed(2)}</span>
                          </p>
                        )}
                        {order.actual_grandTotal > 0 && (<p className="flex justify-between text-lg font-bold border-gray-300">
                          <span className='text-purple-600'>Grand Total:</span>
                          <span className="text-purple-600">₹{order.actual_grandTotal.toFixed(2)}</span>
                        </p>)}

                      </div>

                      <div className="px-6 pb-6 space-y-3 text-sm">
                        <p><strong>Ordered Date: </strong>{changeDate[order.currentDate.slice(5, 7)]} {order.currentDate.slice(8, 10)}, {order.currentDate.slice(0, 4)}</p>
                        <p><strong>Delivery Day:</strong> {order.order_deliveryDay}</p>
                        <p><strong>Delivery Time:</strong> {order.order_deliveryTime}</p>
                        <p><strong>Direction:</strong> {order.order_direction}</p>
                        <p><strong>Address:</strong> {order.order_selectedAddress.address}, {order.order_selectedAddress.city}, {order.order_selectedAddress.state} - {order.order_selectedAddress.pincode}</p>
                        {order.order_selectedAddress.landMark && (
                          <p><strong>Landmark:</strong> {order.order_selectedAddress.landMark}</p>
                        )}
                      </div>
                    </div>
                  </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </LocalizationProvider>
  );
}