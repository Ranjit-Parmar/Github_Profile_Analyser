import SkeletonLoading from './components/SkeletonLoading';
import UserForm from './components/UserForm'
import UserProfileData from './components/UserProfileData'
import { useUserContext } from './context/UserContext';
function App() {
const { userDetails, isError, isLoading } = useUserContext();
  return (
  <>
    <div className='w-full mt-2 space-y-4'>
     <UserForm/>
     {isLoading ? <SkeletonLoading/> : userDetails && !isError && <UserProfileData/>} 
    </div>
  </>
  )
}

export default App
