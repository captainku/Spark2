import { useAuthenticator } from '@aws-amplify/ui-react';
import { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/data';
import { Link } from 'react-router-dom';
import './Home.css'; // Create this CSS file
import type { Schema } from '../../amplify/data/resource';

const client = generateClient<Schema>();

type User = Schema['User']['type'];

const Home = () => {
  const { user } = useAuthenticator();
  const [userData, setUserData] = useState<User | null>(null);

  const classes = [
    { id: 1, title: 'Circuit Breakers', description: 'Learn about circuit breakers!.' },
    { id: 2, title: 'Industrial Wiring', description: 'Master industrial-grade wiring techniques.' },
    { id: 3, title: 'Advanced Circuit Analysis', description: 'Dive deep into complex circuit designs.' },
    { id: 4, title: 'Electrical Safety', description: 'Understand and apply essential safety standards.' },
    { id: 5, title: 'Renewable Energy Systems', description: 'Explore solar and wind energy technologies.' },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      if (user?.username) {
        const response = await client.models.User.list({
          filter: { username: { eq: user.username } },
        });

        if (response.data && response.data.length > 0) {
          setUserData(response.data[0]);
        } else {
          const newUserResponse = await client.models.User.create({
            username: user.username,
            level: 1,
            xp: 0,
          });

          setUserData(newUserResponse.data);
        }
      }
    };

    fetchUser();
  }, [user]);

  return (
    <div>
      <main className="main">
        <h1 className="hero-title">Explore Our Training Classes</h1>

        {/* Display User Info */}
        {userData && (
          <section className="user-info">
            <h2>Welcome, {userData.username}</h2>
            <p>Level: {userData.level}</p>
            <p>XP: {userData.xp}</p>
          </section>
        )}

        {/* Training Classes */}
        <section className="classes-section">
          {classes.map((training) => (
            <div key={training.id} className="class-box">
              <h2 className="class-title">{training.title}</h2>
              <p className="class-description">{training.description}</p>
              <Link to={`/lesson/${training.id}`}>
                <button className="class-button">Learn More</button>
              </Link>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Home;