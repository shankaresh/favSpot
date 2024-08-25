import React, { useEffect, useState } from 'react';

import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const Users = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadedUsers, setLoadedUsers] = useState([]);

  useEffect(() => {
    const fetchUsersList = async () => {
      setIsLoading(true);
      try {
        const fetchUserURL = `${process.env.REACT_APP_BACKEND_BASE_URL}/api/users`;
        const response = await fetch(fetchUserURL);
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(response.message);
        }
        setLoadedUsers(responseData);
      } catch (error) {
        const err = error?.message || 'Something went wrong';
        setError(err);
      }
      setIsLoading(false);
    }
    fetchUsersList();

    return () => {};
  },[]);

  const resetError = () => {
    setError(null);
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={resetError} />
      {isLoading && <div className='center'><LoadingSpinner /></div>}

      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;
