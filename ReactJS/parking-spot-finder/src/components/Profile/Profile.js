import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import ParkingHistory from './ParkingHistory';

const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
      return <div>Loading...</div>;
    }
  
  
    return (
      isAuthenticated && (
        <div>
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <h2>{user.family_name}</h2>
          <p>{user.email}</p>
          <h4>{user.sub}</h4>
          
          <ParkingHistory getUserId={user.sub}/>
        </div>
      )
    );
}

export default Profile