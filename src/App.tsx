import { useAuthenticator } from '@aws-amplify/ui-react';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import './App.css'; // Import the external CSS file
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../amplify/data/resource';

const client = generateClient<Schema>(); // Initialize Amplify Data client

// Define the User type
type User = Schema['User']['type'];

function App() {
  const { user } = useAuthenticator();
  const [userData, setUserData] = useState<User | null>(null);

  const classes = [
    { title: 'Basic Electrical Systems', description: 'Learn the fundamentals of electrical systems.' },
    { title: 'Industrial Wiring', description: 'Master industrial-grade wiring techniques.' },
    { title: 'Advanced Circuit Analysis', description: 'Dive deep into complex circuit designs.' },
    { title: 'Electrical Safety', description: 'Understand and apply essential safety standards.' },
    { title: 'Renewable Energy Systems', description: 'Explore solar and wind energy technologies.' },
  ];

  // Fetch the current user's XP and level from the database
  useEffect(() => {
    const fetchUser = async () => {
      if (user?.username) {
        const response = await client.models.User.list({
          filter: { username: { eq: user.username } },
        });
  
        if (response.data && response.data.length > 0) {
          // Extract the first user's data
          setUserData(response.data[0]);
        } else {
          // Create a new user if one doesn't exist
          const newUserResponse = await client.models.User.create({
            username: user.username,
            level: 1,
            xp: 0,
          });
  
          // Extract the user data
          setUserData(newUserResponse.data);
        }
      }
    };
  
    fetchUser();
  }, [user]);

// Add XP and update the user's data
const addXP = async (xpToAdd: number) => {
  if (userData) {
    try {
      const currentXP = userData.xp ?? 0; // Use 0 if `xp` is null or undefined
      const newXP = currentXP + xpToAdd;
      const newLevel = Math.floor(newXP / 100) + 1; // Example leveling logic

      // Update in the backend
      const updatedUser = await client.models.User.update({
        id: userData.id,
        xp: newXP,
        level: newLevel,
      });

      // Check if `updatedUser.data` exists, then update state
      if (updatedUser?.data) {
        setUserData(updatedUser.data);
      } else {
        console.error('Error: No data returned from update response.');
      }
    } catch (error) {
      console.error('Error adding XP:', error);
    }
  } else {
    console.error('Error: User data is not available.');
  }
};

return (
  <div>
    <Navbar />
    <main className="main">
      <h1 className="hero-title">Explore Our Training Classes</h1>

      {/* Display User Info */}
      {userData && (
        <section className="user-info">
          <h2>Welcome, {userData.username}</h2>
          <p>Level: {userData.level}</p>
          <p>XP: {userData.xp}</p>
          <button onClick={() => addXP(10)} className="xp-button">Add 10 XP</button>
        </section>
      )}

      {/* Training Classes */}
      <section className="classes-section">
        {classes.map((training, index) => (
          <div key={index} className="class-box">
            <h2 className="class-title">{training.title}</h2>
            <p className="class-description">{training.description}</p>
            <button className="class-button">Learn More</button>
          </div>
        ))}
      </section>
    </main>
  </div>
);
}

export default App;