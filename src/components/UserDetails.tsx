import { useUserContext } from "@/context/UserContext";

const UserDetails = () => {
  // Access userDetails from the context
  const { userDetails } = useUserContext();

  // Helper function to safely convert date string
  const formatDate = (date: string | undefined) => {
    return date ? new Date(date).toLocaleDateString() : "Not available";
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Github Profile</h2>

      {/* Profile Header */}
      <div className="flex items-center space-x-6 mb-6">
        <img
          src={userDetails?.avatar_url}
          alt="Avatar"
          className="w-24 h-24 rounded-full"
        />
        <div>
          <h3 className="text-2xl font-semibold text-gray-900">
            {userDetails?.name || userDetails?.login}
          </h3>
          <p className="text-gray-500 mt-2">{userDetails?.bio || "No bio available"}</p>
        </div>
      </div>

      {/* User Details */}
      <div className="space-y-4">
        <div className="flex justify-between">
          <p className="font-medium text-gray-700"><strong>Location:</strong> </p>
          <p className="text-gray-600">{userDetails?.location || "Not available"}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-medium text-gray-700"><strong>Company:</strong> </p>
          <p className="text-gray-600">{userDetails?.company || "Not available"}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-medium text-gray-700"><strong>Blog:</strong> </p>
          <p className="text-blue-600">
            {userDetails?.blog ? (
              <a href={userDetails.blog} target="_blank" rel="noopener noreferrer">
                {userDetails.blog}
              </a>
            ) : (
              "Not available"
            )}
          </p>
        </div>
        <div className="flex justify-between">
          <p className="font-medium text-gray-700"><strong>Email:</strong> </p>
          <p className="text-gray-600">{userDetails?.email || "Not available"}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-medium text-gray-700"><strong>Followers:</strong> </p>
          <p className="text-gray-600">{userDetails?.followers}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-medium text-gray-700"><strong>Following:</strong> </p>
          <p className="text-gray-600">{userDetails?.following}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-medium text-gray-700"><strong>Public Repositories:</strong> </p>
          <p className="text-gray-600">{userDetails?.public_repos}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-medium text-gray-700"><strong>Public Gists:</strong> </p>
          <p className="text-gray-600">{userDetails?.public_gists}</p>
        </div>

        {/* Account Created & Updated Dates */}
        <div className="flex justify-between">
          <p className="font-medium text-gray-700"><strong>Account Created On:</strong> </p>
          <p className="text-gray-600">{formatDate(userDetails?.created_at)}</p>
        </div>
        <div className="flex justify-between">
          <p className="font-medium text-gray-700"><strong>Last Updated On:</strong> </p>
          <p className="text-gray-600">{formatDate(userDetails?.updated_at)}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
