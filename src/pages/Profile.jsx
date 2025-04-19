// src/pages/Profile.jsx
const Profile = () => {
    const { user } = useAuth();
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Profile Info</h2>
        <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
    );
  };
  
  export default Profile;
  