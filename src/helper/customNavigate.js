import { useNavigate } from 'react-router-dom';

export const useCustomNavigate = () => {
  const navigate = useNavigate();

  const customNavigate = (url) => {
    setTimeout(() => {
      navigate(url);
    }, 2000);
  };

  return customNavigate;
};
