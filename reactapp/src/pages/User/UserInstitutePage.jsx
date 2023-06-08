import { UserGuard } from '../../AuthGuard/UserGuard'; 
import HomePage from '../../components/User/HomePage/HomePage';

const UserInstitutePage = () => {
    return (
    <>
      <UserGuard>
        <HomePage />
      </UserGuard>
    </>
    )
}
export default UserInstitutePage;