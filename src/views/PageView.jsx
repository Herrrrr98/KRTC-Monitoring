import { useNavigate, useLocation } from 'react-router-dom';

export default function PageView() {
  const Location = useLocation();
  const { id } = Location.state;
  const AnalyzedData = window.api.getAnalyzedData();
  console.log(AnalyzedData);
  const navigate = useNavigate();
  return (
    <>
      <button onClick={() => navigate('/')}>回首頁</button>
      <span>{id}</span>
    </>
  )
}