
// Type for GitHub repository
export interface Repository {
    id: number;
    name: string;
    full_name: string;
    html_url: string;
    description: string | null;
    language: string | null;
    stargazers_count: number;
    forks_count: number;
    created_at: string;
    updated_at: string;
    pushed_at: string;
  }
  
  // Type for GitHub commit
  export interface Commit {
    sha: string;
    commit: {
      message: string;
      author: {
        name: string;
        email: string;
      };
      committer: {
        name: string;
        email: string;
      };
      date: string;
    };
  }
  
  // Type for GitHub user profile details
  export interface UserProfile {
    login: string;
    id: number;
    avatar_url: string;
    repos_url: string;
    name: string | null;
    bio: string | null;
    location: string | null;
    company: string | null;
    blog: string | null;
    email: string | null;
    followers: number;
    following: number;
    public_repos: number;
    public_gists: number;
    created_at: string;
    updated_at: string;
  }
  

  export interface UserContextType {
    userDetails : UserProfile | null;
    isLoading : boolean;
    isError : boolean;
    setUserDetails : React.Dispatch<React.SetStateAction<UserProfile | null>>;
    setIsLoading : React.Dispatch<React.SetStateAction<boolean>>;
    setIsError : React.Dispatch<React.SetStateAction<boolean>>;
  }
 
  
  export type GitHubCommit = {
    commit: {
      author: {
        date: string;
      };
    };
  };