import {
  FC,
  useCallback,
  useEffect,
  useState
} from "react";
import './UserList.scss';
import UserItem from "./UserItem";
import { User } from "../types/user";


const UserList: FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [data, setData] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeUserIndex, setActiveUserIndex] = useState<number | undefined>();
  const [maxIndexWidth, setMaxIndexWidth] = useState<number | undefined>();
  const totalPages = 4;

  const loadUsersData = (pageNumber: number) => {
    setIsLoading(true);
    fetch(`/data/users/page${pageNumber}.json`)
      .then(response => response.json())
      .then(jsonData => {
        setData(prevData => [...prevData, ...jsonData])
      })
      .then(() => setIsLoading(false))
      .catch((error) => {
        setIsLoading(false);
        console.error('Error fetching data:', error);
      });
  };


  const handleScroll = useCallback(() => {
    const isPageBottom = (
      document.documentElement.offsetHeight - (window.innerHeight + document.documentElement.scrollTop)
    ) <= 50;

    if (isPageBottom && !isLoading && currentPage < totalPages) {
      const nextPage = currentPage + 1;
      loadUsersData(nextPage);
      setCurrentPage(nextPage);
    }
  }, [currentPage, isLoading]);

  window.onscroll = () => handleScroll();

  useEffect(() => loadUsersData(1), [])
  
  return (
    <div className="user-list-container">
      <div className="user-list-wrap">
        {data.map((user, index) => (
          <UserItem
            key={user.name + index}
            user={user}
            index={index}
            isActive={activeUserIndex === index}
            onClick={() => setActiveUserIndex(index)}
            maxIndexWidth={maxIndexWidth}
            setMaxIndexWidth={setMaxIndexWidth}
          />
        ))}
        {isLoading && <div>Loading...</div>}
      </div>
    </div>
  );
}

export default UserList;