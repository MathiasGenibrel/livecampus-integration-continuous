import React, { useContext, useEffect, useState } from 'react';
import { Headers } from '../components/Header/Headers';
import { Tab, Tablist } from 'evergreen-ui';
import { AUTH_CONTEXT } from '../contexts/auth/auth-context';
import { useNavigate } from 'react-router-dom';
import { ProfileSection } from '../components/Profile/Sections/Profile';
import { OrdersSection } from '../components/Profile/Sections/Orders';

export const Profile = () => {
  const auth = useContext(AUTH_CONTEXT);

  // Control if user is connected
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth.token) return navigate('/');
  }, []);

  const [profileSelected, setProfileSelected] = useState(true);

  return (
    <>
      <Headers />

      <main className="mt-4 px-4">
        <Tablist marginBottom={16} flexBasis={240} marginRight={24}>
          <Tab
            aria-controls={`panel-profile`}
            isSelected={profileSelected}
            key={'profile'}
            onSelect={() => setProfileSelected(true)}
          >
            Profile
          </Tab>
          <Tab
            aria-controls={`panel-orders`}
            isSelected={!profileSelected}
            key={'orders'}
            onSelect={() => setProfileSelected(false)}
          >
            Orders
          </Tab>
        </Tablist>

        {profileSelected ? <ProfileSection /> : <OrdersSection />}
      </main>
    </>
  );
};
