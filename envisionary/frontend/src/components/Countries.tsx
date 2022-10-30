import { useRecoilState } from 'recoil';
import { categoryState, searchQueryState } from '../states/states';
import UserInput from './UserInput';

function Countries() {
  const [category, setCategory] = useRecoilState(categoryState);
  const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState);

  return (
    <UserInput />
  );
}
export default Countries