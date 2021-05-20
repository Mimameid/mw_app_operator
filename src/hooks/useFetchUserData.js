import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../store/userState/action';

export function useFetchUserData() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userState.data);

  const dispatchFetchUserData = () => {
    dispatch(fetchUserData());
  };

  return [userData, dispatchFetchUserData];
}
