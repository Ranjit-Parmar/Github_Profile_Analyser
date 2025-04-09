import { useUserContext } from "@/context/UserContext";
import { Repository } from "@/types/userTypes";
import axios from "axios";
import { useEffect, useState } from "react";
import SkeletonLoading from "./SkeletonLoading";
import CommitChart from "./CommitChart";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const UserRepos = () => {
  const { userDetails } = useUserContext();
  const [repos, setRepos] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);

  const getUserRepos = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${userDetails?.repos_url}`);
      setRepos(response.data);
      setIsError(false);
    } catch (error) {
      setIsError(true);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userDetails?.repos_url) {
      getUserRepos();
    }
  }, [userDetails]);

  const handleOpenModal = (repo: Repository) => {
    setSelectedRepo(repo);
    setShowModal(true);
  };

  if (isLoading) return <SkeletonLoading />;

  if (isError) {
    return (
      <div className="flex justify-center items-center mt-8">
        <span className="text-xl text-red-500">
          Failed to load repositories. Please try again later.
        </span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Repositories ({repos.length})
      </h2>
      {repos.length === 0 ? (
        <p className="text-lg text-gray-600">No repositories found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo) => (
            <div
              key={repo.id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <h3 className="text-xl font-semibold text-blue-600 mb-3">
                {repo.name}
              </h3>
              <p className="text-gray-700 mb-4">
                {repo.description || "No description available."}
              </p>

              <div className="text-sm text-gray-600 space-y-2">
                <p>
                  <strong>Full Name:</strong> {repo.full_name}
                </p>
                <p>
                  <strong>Language:</strong> {repo.language || "Not specified"}
                </p>
                <p>
                  <strong>Stars:</strong> {repo.stargazers_count}
                </p>
                <p>
                  <strong>Forks:</strong> {repo.forks_count}
                </p>
                <p>
                  <strong>Created At:</strong>{" "}
                  {new Date(repo.created_at).toLocaleDateString()}
                </p>
                <p>
                  <strong>Last Updated:</strong>{" "}
                  {new Date(repo.updated_at).toLocaleDateString()}
                </p>
                <p>
                  <strong>Last Pushed:</strong>{" "}
                  {new Date(repo.pushed_at).toLocaleDateString()}
                </p>
              </div>

              <div className="flex justify-between items-center mt-4">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 font-semibold"
                >
                  View on GitHub
                </a>
                <button
                  onClick={() => handleOpenModal(repo)}
                  className="text-blue-500 hover:text-blue-700 font-semibold"
                >
                  Commits
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Commit Chart Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="flex flex-col bg-white p-6 overflow-y-auto w-full h-full rounded-none">
          <DialogHeader>
            <DialogTitle>Commits for {selectedRepo?.name}</DialogTitle>
          </DialogHeader>
          {selectedRepo && <CommitChart repo={selectedRepo} />}
          {/* {selectedRepo && <CommitChart/>} */}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserRepos;
