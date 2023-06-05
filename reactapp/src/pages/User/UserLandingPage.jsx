import { UserGuard } from '../../AuthGuard/UserGuard'; 
import Navpage from '../../components/User/HomePage/Navpage';

const UserLandingPage = () => {
    return (
    <>
      <UserGuard>
        <Navpage />
      </UserGuard>
    </>
    )
}
export default UserLandingPage;