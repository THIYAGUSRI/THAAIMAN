import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Header from '../Components/Common Components/Header';
import Ordered from '../../Images/ordered.png';
import Placed from '../../Images/placed.png';
import Delivered from '../../Images/delivered.png';
import Cancelled from '../../Images/cancelled.png';
import History from '../../Images/history.png';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PlaylistAddCheckCircleOutlinedIcon from '@mui/icons-material/PlaylistAddCheckCircleOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import ShoppingBag from '../../Images/shopping-bag.png';
import CancelButton from '../../Images/cancel-button.png';
import { useCallback } from 'react';
import { Chip, CircularProgress, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [expandedOrders, setExpandedOrders] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);
  const [orderCounts, setOrderCounts] = useState({
    'Order Placed': 0,
    'Confirmed': 0,
    'Delivered': 0,
    'Cancelled': 0,
  });
  const changeDate = { "01": "Jan", "02": "Feb", "03": "Mar", "04": "Apr", "05": "May", "06": "Jun", "07": "Jul", "08": "Aug", "09": "Sep", "10": "Oct", "11": "Nov", "12": "Dec" };
  const [filteredStatus, setFilteredStatus] = useState('');
  const [activeFilter, setActiveFilter] = useState('');
  // Lazy Loading States
  const [displayedOrders, setDisplayedOrders] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const userId = currentUser?.user?.userID;
  const token = currentUser?.token;

  useEffect(() => {
    if (orders.length > 0) {
      const initialExpanded = {};
      orders.forEach((order) => {
        initialExpanded[order.order_ID] = true;
      });
      setExpandedOrders(initialExpanded);
    }
  }, [orders]);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/orders', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        const userOrders = data.filter(
          (order) => order.userID === userId
        );

        const uniqueOrders = Array.from(
          new Map(userOrders.map(order => [order.order_ID, order])).values()
        ).sort((a, b) => Number(b.order_ID) - Number(a.order_ID));

        setOrders(uniqueOrders);
        console.log(uniqueOrders);

        const counts = uniqueOrders.reduce(
          (acc, order) => {
            const status = order.deliveryProcess;
            acc[status] = (acc[status] || 0) + 1;
            return acc;
          },
          { 'Order Placed': 0, 'Confirmed': 0, 'Delivered': 0, 'Cancelled': 0 }
        );

        setOrderCounts(counts);
      }
      else {
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

  // Reset pagination when filter changes or orders update
  useEffect(() => {
    setPage(1);
  }, [filteredStatus, orders]);

  // Lazy loading: Update displayed orders when page or filteredOrders change
  useEffect(() => {
    const filtered = orders.filter(order =>
      !filteredStatus || order.deliveryProcess === filteredStatus
    );

    const start = 0;
    const end = page * itemsPerPage;
    setDisplayedOrders(filtered.slice(start, end));
  }, [orders, filteredStatus, page]);

  // Infinite Scroll Handler
  const handleScroll = useCallback(() => {
    const filtered = orders.filter(order =>
      !filteredStatus || order.deliveryProcess === filteredStatus
    );

    if (displayedOrders.length >= filtered.length) return; // All loaded

    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.documentElement.scrollHeight - 300; // 300px before bottom

    if (scrollPosition >= threshold) {
      setPage(prev => prev + 1);
    }
  }, [orders, filteredStatus, displayedOrders.length]);

  // Attach scroll listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const toggleExpand = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !(prev[orderId] ?? true),
    }));
  };

  const openCancelModal = (orderId) => {
    setOrderToCancel(orderId);
    setIsModalOpen(true);
  };

  const closeCancelModal = () => {
    setOrderToCancel(null);
    setIsModalOpen(false);
  };

  const confirmCancel = async () => {
    if (!orderToCancel) return;
    try {
      const response = await fetch(`/updateorder/${orderToCancel}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          orderdetails: {
            order: {
              deliveryProcess: 'Cancelled',
            },
          },
        }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Order cancelled successfully:', orderToCancel);
        fetchOrders();
      } else {
        console.error('Error cancelling order:', data.message);
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
    } finally {
      closeCancelModal();
    }
  };

  const handleStatusFilter = (status) => {
    setFilteredStatus(status);
    setActiveFilter(status);
  };

  const handleHistoryClick = () => {
    setActiveFilter('History');
    navigate('/history');
  };

  const filteredOrders = orders.filter(order =>
    !filteredStatus || order.deliveryProcess === filteredStatus
  );

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
    <div className='bg-green-50 mt-30 min-h-screen'>
      <Header />
      <div className="w-full mx-auto px-4 py-8 lg:px-20">
        <h2 className="text-5xl font-bold font-soft-quicksand text-gray-900 mb-3 text-center">Your Orders</h2>
        <div className='mt-20 mx-4 sm:mx-8 md:mx-15 lg:mx-5'>
          <ToggleButtonGroup
            sx={{
              // Base: use flex on mobile/tablet, grid on laptop+
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              flexWrap: { sm: 'wrap' },
              justifyContent: { sm: 'center' },
              gap: { xs: 1, sm: 1.5, md: 2 },
              border: 'none',
              padding: 0,

              // Tablet: each button takes roughly 1/3 of row width
              '& .MuiToggleButton-root': {
                width: { xs: '100%', sm: 'calc(33.333% - 12px)', md: 'calc(33.333% - 16px)' },
                margin: 0,
                borderRadius: 2,
              },

              // Laptop and larger: switch to grid with 5 equal columns
              '@media (min-width: 1440px)': {
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: 2,
                '& .MuiToggleButton-root': {
                  width: '100%',
                },
              },
            }}
            exclusive
          >
            {/* Order Placed */}
            <ToggleButton
              sx={{
                padding: { xs: 1, sm: 1, md: 1.5, lg: 2 },
                backgroundColor: 'white',
                '&.Mui-selected': {
                  backgroundColor: '#3299ff',
                  color: '#fff',
                  '&:hover': { backgroundColor: '#006FDB' },
                },
              }}
              value="Order Placed"
              selected={activeFilter === 'Order Placed'}
              onClick={() => handleStatusFilter('Order Placed')}
            >
              <div className='w-full h-full'>
                <div className='flex gap-2 sm:gap-2 md:gap-3 items-center justify-between'>
                  <div className='flex w-1/4 justify-center items-center p-1 bg-white rounded-full'>
                    <img
                      src={ShoppingBag}
                      alt=""
                      className='h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12'
                    />
                  </div>
                  <div className='w-3/4 text-center sm:text-left'>
                    <div
                      className={`text-base sm:text-lg md:text-xl lg:text-2xl h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 rounded-full flex items-center justify-center text-sky-600 ${activeFilter === 'Order Placed' ? 'text-white' : 'hover:bg-gray-100'
                        } font-bold flex-shrink-0 mx-auto sm:mx-0`}
                    >
                      {orderCounts['Order Placed']}
                    </div>
                    <h1 className='font-medium text-xs sm:text-sm md:text-base lg:text-md whitespace-nowrap sm:whitespace-normal text-center sm:text-left'>
                      Order Placed
                    </h1>
                  </div>
                </div>
              </div>
            </ToggleButton>

            {/* Confirmed */}
            <ToggleButton
              sx={{
                backgroundColor: 'white',
                padding: { xs: 1, sm: 1, md: 1.5, lg: 2 },
                '&.Mui-selected': {
                  backgroundColor: '#F28500',
                  color: '#fff',
                  '&:hover': { backgroundColor: '#d87400' },
                },
              }}
              value="Confirmed"
              selected={activeFilter === 'Confirmed'}
              onClick={() => handleStatusFilter('Confirmed')}
            >
              <div className='w-full h-full'>
                <div className='flex gap-2 sm:gap-2 md:gap-3 items-center justify-between'>
                  <div className='h-10 sm:h-11 sm:w-11 md:h-13 md:w-13 lg:h-15 lg:w-15 w-1/4 text-center flex-shrink-0 bg-white rounded-full flex items-center justify-center'>
                    <img
                      src={Placed}
                      alt=""
                      className='h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12'
                    />
                  </div>
                  <div className='flex-1 w-3/4 text-center sm:text-left'>
                    <div
                      className={`text-base sm:text-lg md:text-xl lg:text-2xl h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 rounded-full flex items-center justify-center text-orange-500 ${activeFilter === 'Confirmed' ? 'text-white' : ''
                        } font-bold flex-shrink-0 mx-auto sm:mx-0`}
                    >
                      {orderCounts['Confirmed']}
                    </div>
                    <h1 className='font-medium text-xs sm:text-sm md:text-base lg:text-md whitespace-nowrap sm:whitespace-normal text-center sm:text-left'>
                      Confirmed
                    </h1>
                  </div>
                </div>
              </div>
            </ToggleButton>

            {/* Delivered */}
            <ToggleButton
              sx={{
                backgroundColor: 'white',
                padding: { xs: 1, sm: 1, md: 1.5, lg: 2 },
                '&.Mui-selected': {
                  backgroundColor: '#2E8B57',
                  color: '#fff',
                  '&:hover': { backgroundColor: '#267349' },
                },
              }}
              value="Delivered"
              selected={activeFilter === 'Delivered'}
              onClick={() => handleStatusFilter('Delivered')}
            >
              <div className='w-full h-full'>
                <div className='flex gap-2 sm:gap-2 md:gap-3 items-center justify-between'>
                  <div className='h-10 sm:h-11 sm:w-11 md:h-13 md:w-13 lg:h-15 lg:w-15 w-1/4 text-center flex-shrink-0 rounded-full bg-white flex items-center justify-center'>
                    <img
                      src={Delivered}
                      alt=""
                      className='h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12'
                    />
                  </div>
                  <div className='flex-1 text-center sm:text-left'>
                    <div
                      className={`text-base sm:text-lg md:text-xl lg:text-2xl h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 rounded-full flex items-center justify-center text-green-500 ${activeFilter === 'Delivered' ? 'text-white' : ''
                        } font-bold flex-shrink-0 mx-auto sm:mx-0`}
                    >
                      {orderCounts['Delivered']}
                    </div>
                    <h1 className='font-medium text-xs sm:text-sm md:text-base lg:text-md whitespace-nowrap sm:whitespace-normal text-center sm:text-left'>
                      Delivered
                    </h1>
                  </div>
                </div>
              </div>
            </ToggleButton>

            {/* Cancelled */}
            <ToggleButton
              sx={{
                backgroundColor: 'white',
                padding: { xs: 1, sm: 1, md: 1.5, lg: 2 },
                '&.Mui-selected': {
                  backgroundColor: '#FF6347',
                  color: '#fff',
                  '&:hover': { backgroundColor: '#e5533d' },
                },
              }}
              value="Cancelled"
              selected={activeFilter === 'Cancelled'}
              onClick={() => handleStatusFilter('Cancelled')}
            >
              <div className='w-full h-full'>
                <div className='flex gap-2 sm:gap-2 md:gap-3 items-center justify-between'>
                  <div className='h-10 sm:h-11 sm:w-11 md:h-13 md:w-13 lg:h-15 lg:w-15 w-1/4 text-center flex-shrink-0 rounded-full bg-white flex items-center justify-center'>
                    <img
                      src={Cancelled}
                      alt=""
                      className='h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12'
                    />
                  </div>
                  <div className='flex-1 w-3/4 text-center sm:text-left'>
                    <div
                      className={`text-base sm:text-lg md:text-xl lg:text-2xl h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 rounded-full flex items-center justify-center text-red-600 font-bold flex-shrink-0 mx-auto sm:mx-0 ${activeFilter === 'Cancelled' ? 'text-white' : ''
                        }`}
                    >
                      {orderCounts['Cancelled']}
                    </div>
                    <h1 className='font-medium text-xs sm:text-sm md:text-base lg:text-md whitespace-nowrap sm:whitespace-normal text-center sm:text-left'>
                      Cancelled
                    </h1>
                  </div>
                </div>
              </div>
            </ToggleButton>

            {/* History Detail */}
            <ToggleButton
              sx={{
                backgroundColor: 'white',
                padding: { xs: 1, sm: 1, md: 1.5, lg: 2 },
                '&.Mui-selected': {
                  backgroundColor: '#808080',
                  color: '#fff',
                  '&:hover': { backgroundColor: '#6e6e6e' },
                },
              }}
              value="History"
              selected={activeFilter === 'History'}
              onClick={handleHistoryClick}
            >
              <div className='w-full h-full'>
                <div className='flex gap-2 sm:gap-2 md:gap-3 items-center sm:text-left'>
                  <div className='h-10 sm:h-11 sm:w-11 md:h-13 md:w-13 lg:h-15 lg:w-15 w-1/4 flex bg-white rounded-full items-center justify-center flex-shrink-0'>
                    <img
                      src={History}
                      alt=""
                      className='h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12'
                    />
                  </div>
                  <h1 className='font-medium text-xs sm:text-sm md:text-base lg:text-md w-3/4 whitespace-nowrap sm:whitespace-normal text-center sm:text-left'>
                    History
                  </h1>
                </div>
              </div>
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        {/* Orders List with Lazy Loading */}
        {displayedOrders.length === 0 ? (
          <p className="text-lg text-gray-600 text-center mt-10">
            No orders found for this status.
          </p>
        ) : (
          <div className="mt-15 mx-4 lg:mx-13">
            {displayedOrders.map((order, index) => (
              <div
                key={`${order.order_ID}-${index}`}
                className="border border-gray-200 bg-white rounded-2xl shadow-xl p-6 mb-10 relative"
              >
                {/* All your existing order card content remains 100% unchanged */}
                {/* Header, Cancel button, Order ID, Expand button, Table, Summary, etc. */}

                <div className="flex justify-between items-start mb-4">
                  <div className="flex w-full lg:pr-12">
                    {order.deliveryProcess !== "Cancelled" &&
                      order.deliveryProcess !== "Confirmed" &&
                      order.deliveryProcess !== "Delivered" && (
                        <Tooltip title="Cancel Order" placement="bottom">
                          <button
                            className='h-6 w-6 bg-red-300 rounded-full cursor-pointer sm:h-5 sm:w-7 md:h-7 md:w-7 lg:h-9 lg:w-9 flex items-center justify-center transition-colors duration-300 hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-500'
                            onClick={() => openCancelModal(order.order_ID)}
                          >
                            <DriveFileRenameOutlineIcon
                              sx={{
                                fontSize: { xs: 15, sm: 20, md: 23, lg: 25 },
                              }} />
                          </button>
                        </Tooltip>
                      )}
                    <p className="text-xs font-bold text-soft-quicksand px-1 sm:px-3 py-0.5 sm:py-1 md:py-0.5 text-gray-800 sm:text-lg">
                      Order ID: <span className="font-normal font-soft-quicksand">{order.order_ID}</span><Chip label={order.deliveryProcess} size="small" sx={{ ml: { xs: 0.5 }, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' } }}
                        color={order.deliveryProcess === "Order Placed" ? "primary" : order.deliveryProcess === "Confirmed" ? "warning" : order.deliveryProcess === "Delivered" ? "success" : order.deliveryProcess === "Cancelled" ? "error" : undefined} />
                    </p>
                  </div>
                  <button
                    onClick={() => toggleExpand(order.order_ID)}
                    className="absolute top-6 right-6 text-gray-600 hover:text-gray-900 transition-transform duration-300 z-10"
                  >
                    <svg className={`w-8 h-8 transform transition-transform duration-300 ${expandedOrders[order.order_ID] ? '' : 'rotate-180'}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>

                {expandedOrders[order.order_ID] && (
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
        )}

        {/* Optional: Loading indicator at bottom */}
        {displayedOrders.length < orders.filter(o => !filteredStatus || o.deliveryProcess === filteredStatus).length && (
          <div className="text-center py-8 text-gray-500">
            <CircularProgress color="inherit" />
          </div>
        )}
      </div>

      {
        isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
            <div className="bg-white p-8 rounded-xl shadow-2xl max-w-sm w-full">
              <h3 className="text-xl font-bold mb-4">Confirm Cancellation</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to cancel this order?</p>
              <div className="flex flex-col sm:flex-row justify-end gap-4">
                <button onClick={confirmCancel} className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 order-1 sm:order-none">
                  Yes, Cancel
                </button>
                <button onClick={closeCancelModal} className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 order-2 sm:order-none">
                  No, Keep Order
                </button>
              </div>
            </div>
          </div>
        )
      }
    </div >
  );
}