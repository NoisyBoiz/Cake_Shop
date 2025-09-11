
import React, { useState, useCallback, useEffect, createContext, useContext } from "react";
import "../assets/styles/notication.css";

// Icon SVGs cho từng loại notification
const ICONS = {
  alert: (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 256 256" height="1.8em" width="1.8em" xmlns="http://www.w3.org/2000/svg"><path d="M224,71.1a8,8,0,0,1-10.78-3.42,94.13,94.13,0,0,0-33.46-36.91,8,8,0,1,1,8.54-13.54,111.46,111.46,0,0,1,39.12,43.09A8,8,0,0,1,224,71.1ZM35.71,72a8,8,0,0,0,7.1-4.32A94.13,94.13,0,0,1,76.27,30.77a8,8,0,1,0-8.54-13.54A111.46,111.46,0,0,0,28.61,60.32,8,8,0,0,0,35.71,72Zm186.1,103.94A16,16,0,0,1,208,200H167.2a40,40,0,0,1-78.4,0H48a16,16,0,0,1-13.79-24.06C43.22,160.39,48,138.28,48,112a80,80,0,0,1,160,0C208,138.27,212.78,160.38,221.81,175.94ZM150.62,200H105.38a24,24,0,0,0,45.24,0ZM208,184c-10.64-18.27-16-42.49-16-72a64,64,0,0,0-128,0c0,29.52-5.38,53.74-16,72Z"></path></svg>
  ),
  warning: (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 256 256" height="1.8em" width="1.8em" xmlns="http://www.w3.org/2000/svg"><path d="M128,20A108,108,0,1,0,236,128,108.12,108.12,0,0,0,128,20Zm0,192a84,84,0,1,1,84-84A84.09,84.09,0,0,1,128,212Zm-12-80V80a12,12,0,0,1,24,0v52a12,12,0,0,1-24,0Zm28,40a16,16,0,1,1-16-16A16,16,0,0,1,144,172Z"></path></svg>
  ),
  comfirm: (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1.8em" width="1.8em" xmlns="http://www.w3.org/2000/svg"><path d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0 0 51.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>
  ),
  success: (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1.8em" width="1.8em" xmlns="http://www.w3.org/2000/svg"><path d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0 0 51.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>
  ),
  error: (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1.8em" width="1.8em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M8.6 1c1.6.1 3.1.9 4.2 2 1.3 1.4 2 3.1 2 5.1 0 1.6-.6 3.1-1.6 4.4-1 1.2-2.4 2.1-4 2.4-1.6.3-3.2.1-4.6-.7-1.4-.8-2.5-2-3.1-3.5C.9 9.2.8 7.5 1.3 6c.5-1.6 1.4-2.9 2.8-3.8C5.4 1.3 7 .9 8.6 1zm.5 12.9c1.3-.3 2.5-1 3.4-2.1.8-1.1 1.3-2.4 1.2-3.8 0-1.6-.6-3.2-1.7-4.3-1-1-2.2-1.6-3.6-1.7-1.3-.1-2.7.2-3.8 1-1.1.8-1.9 1.9-2.3 3.3-.4 1.3-.4 2.7.2 4 .6 1.3 1.5 2.3 2.7 3 1.2.7 2.6.9 3.9.6zM7.9 7.5L10.3 5l.7.7-2.4 2.5 2.4 2.5-.7.7-2.4-2.5-2.4 2.5-.7-.7 2.4-2.5-2.4-2.5.7-.7 2.4 2.5z"></path></svg>
  ),
};

// Xử lý message: xuống dòng cho từng câu, giữ nguyên ký tự đặc biệt
function formatMessage(message) {
  if (!message) return "";
  try {
    return message
      .split(/(\(.*\))|('.*')|(`.*`)/)
      .map(item => {
        if (!item) return "";
        if (!item.includes("`") && !item.includes("'") && !item.includes("(") && !item.includes(")")) {
          return item.split(".").join("\n");
        }
        return item + "\n";
      })
      .join("");
  } catch {
    return message;
  }
}

// Kiểm tra tiêu đề có giá trị
function hasTitle(title) {
  if (title === null || title === undefined) return false;
  if (typeof title === "string" && title.trim() === "") return false;
  return true;
}

// Context cho notification
export const NotificationContext = createContext();

// Provider: quản lý trạng thái notification
export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState(null);
  const [visible, setVisible] = useState(false);

  // Hiện notification
  const showNotification = useCallback((options) => {
    setNotification(options);
    setVisible(true);
  }, []);

  // Đóng notification
  const closeNotification = useCallback(() => {
    setVisible(false);
    setTimeout(() => setNotification(null), 300); // fade out
  }, []);

  // Tự động đóng với success
  useEffect(() => {
    if (notification && notification.type === "success") {
      const timer = setTimeout(() => closeNotification(), 2000);
      return () => clearTimeout(timer);
    }
  }, [notification, closeNotification]);

  return (
    <NotificationContext.Provider value={{ showNotification, closeNotification }}>
      {children}
      {visible && notification && (
        <Notification {...notification} onClose={closeNotification} />
      )}
    </NotificationContext.Provider>
  );
}

// Component nút bấm cho notification
function NotificationButtons({ type, handleAccept, handleCancel, titleAccept, titleCancel, onClose }) {
  if (type === "success") {
    return (
      <>
        <button onClick={onClose}>Đóng</button>
        <div className="notification-timeBar" />
      </>
    );
  }
  if ((type === "warning" || type === "comfirm") && handleAccept) {
    return (
      <>
        <button onClick={() => { if (handleCancel) handleCancel(); onClose(); }}>{titleCancel || "Không"}</button>
        <button onClick={() => { handleAccept(); onClose(); }}>{titleAccept || "Đồng ý"}</button>
      </>
    );
  }
  return <button onClick={onClose}>Đóng</button>;
}

// Component hiển thị notification
function Notification({ type = "alert", title, message, handleAccept, handleCancel, titleAccept, titleCancel, onClose }) {
  return (
    <div className="notification-container" style={{ opacity: 1 }}>
      <div className={`notification-box ${type}`}>
        <div className={`notification-icon ${type}`}>{ICONS[type]}</div>
        {hasTitle(title) && (
          <div className={`notification-title ${type}`}>
            {typeof title === "object" ? Object.values(title) : title}
          </div>
        )}
        <div className={`notification-message ${type}`}>
          {formatMessage(message)}
        </div>
        <div className={`notification-bottom ${type}`}>
          <NotificationButtons
            type={type}
            handleAccept={handleAccept}
            handleCancel={handleCancel}
            titleAccept={titleAccept}
            titleCancel={titleCancel}
            onClose={onClose}
          />
        </div>
      </div>
    </div>
  );
}

// Hook sử dụng notification
export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("useNotification must be used within a NotificationProvider");
  return context;
}
