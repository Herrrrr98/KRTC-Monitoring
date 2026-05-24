import { useNavigate } from 'react-router-dom';

export default function PageView() {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate('/')}>回首頁</button>
  )
}