import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import axios from 'axios';
import { useUserContext } from "@/context/UserContext";

const UserForm = () => {
  const { setUserDetails, isError, setIsError, setIsLoading } = useUserContext();
  const [inputValue, setInputValue] = useState('');

  const onClickHandle = async () => {
    if (inputValue === '') {
        setIsError(true);
      return;
    }

    try {
      setIsLoading(true)
      const response = await axios(`https://api.github.com/users/${inputValue}`);
      setUserDetails(response?.data); // Update context with the fetched data
      setIsError(false); // Reset error
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="mx-auto w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Github Profile Analyzer</h2>
      
      <div className="w-full flex space-x-4">
        <Input
          type="text"
          placeholder="Enter username"
          className="border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
        <Button
          type="button"
          className="bg-black text-white py-3 px-6 rounded-md shadow-md hover:bg-gray-800 transition duration-200"
          onClick={onClickHandle}
        >
          Get Data
        </Button>
      </div>
      
      {/* Error message display */}
      {isError && <p className="mt-2 text-red-500">Error fetching data. Please try again or use valid username</p>}
    </div>
  );
};

export default UserForm;
