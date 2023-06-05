import { UserGuard } from '../../../AuthGuard/UserGuard'; 
import Updatepage from '../../../components/User/Updatepage';

const CourseApplyEdit = () => {
    return (
    <>
      <UserGuard>
        <Updatepage />
      </UserGuard>
    </>
    )
}
export default CourseApplyEdit;