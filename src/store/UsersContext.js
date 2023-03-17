import { createContext, useCallback, useContext, useEffect, useState } from "react";

export const UsersContext = createContext();

export const useUsersContext = () => useContext(UsersContext);

const UsersProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1)

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${page}/20`
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();

      const usersInfo = data.list.map((userInfo) => {
        return {
          id: userInfo.id,
          name: userInfo.name,
          lastName: userInfo.lastName,
          prefix: userInfo.prefix,
          title: userInfo.title,
          imageUrl: userInfo.imageUrl,
        };
      });
      setUsers((prevUsers) => [...prevUsers, ...usersInfo]);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [setError, setIsLoading, page]);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  

  useEffect(()=> {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [])

 
  return (
    <UsersContext.Provider
      value={{ isLoading, setIsLoading, error, setError, fetchUsers, users, setPage, page }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export default UsersProvider;
