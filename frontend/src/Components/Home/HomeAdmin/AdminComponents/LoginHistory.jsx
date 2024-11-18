import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { fetchCloseHistory, fetchUnlockHistory } from '../../../../redux/apiRequest';

const LoginHistory = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const PassWordList = useSelector((state) => state.users.passWordHistories?.allPassWord || []);
  const [historyList, setHistoryList] = useState([]);
  const { closeHistory, loading, error } = useSelector((state) => state.users.closeHistories?.allClose || []);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;


  useEffect(() => {
    // Gọi API để lấy lịch sử đóng cửa
    fetchCloseHistory(user?.token, dispatch);
  }, [dispatch, user]);

  useEffect(() => {
    console.log('PassWordList:', historyList);
  }, [historyList]);

  useEffect(() => {
    if (closeHistory && Array.isArray(closeHistory)) {
      setHistoryList(closeHistory); // Lưu lịch sử đóng cửa vào state khi có dữ liệu hợp lệ
    }
  }, [closeHistory]);

  useEffect(() => {
    console.log('PassWordList:', closeHistory);
  }, [closeHistory]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h3>Close History</h3>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Close Time</th>
            <th>UID</th>
          </tr>
        </thead>
        {historyList.length > 0 ? (
  historyList.map((item) => (
    <tr key={item.id}>
      <td>{item.username}</td>
      <td>{item.closetime}</td>
      <td>{item.uid}</td>
    </tr>
  ))
) : (
  <tr><td colSpan="3">No data available</td></tr>
)}
      </table>
    </div>
  );
};

export default LoginHistory;


