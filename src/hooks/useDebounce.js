// // src/hooks/useDebounce.js

// import { useState, useEffect } from "react";

// function useDebounce(value, delay) {
//   // State để lưu trữ giá trị đã được trì hoãn
//   const [debouncedValue, setDebouncedValue] = useState(value);

//   useEffect(() => {
//     // Thiết lập một bộ đếm thời gian (timer) để cập nhật giá trị
//     // sau khi hết khoảng thời gian delay
//     const handler = setTimeout(() => {
//       setDebouncedValue(value);
//     }, delay);

//     // Dọn dẹp timer mỗi khi value hoặc delay thay đổi.
//     // Điều này ngăn việc cập nhật nếu người dùng vẫn đang gõ.
//     return () => {
//       clearTimeout(handler);
//     };
//   }, [value, delay]); // Chỉ chạy lại effect nếu value hoặc delay thay đổi

//   return debouncedValue;
// }

// export default useDebounce;
