import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
// 把 ./views 中的東西import過來
// import { ExampleView } from './views/ExampleView '
import MainView from './views/MainView'

// 路由操作部分
// 可以用link指令來切換
//
// 切換方式
// import { useNavigate } from 'react-router-dom';
// const goToHome = () => {
//   navigate('/home');  // 到目標位置
//   navigate(-1);  // 或是上一頁
// };


export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">首頁</Link> | 
        <Link to="/about">關於我們</Link>
      </nav>

      <hr />

      <Routes>
        <Route path="/" element={<MainView />} />
        {/* <Route path="/example" element={<ExampleView />} /> */}
        <Route path="*" element={<h1>404 Not Found...</h1>} />
      </Routes>
    </BrowserRouter>
  );
}