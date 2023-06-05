import { UserGuard } from '../../../AuthGuard/UserGuard'; 
import Admissionmodelpage from '../../../components/User/Admissionmodelpage';

const CourseAppliedView = () => {
    return (
    <>
      <UserGuard>
        <Admissionmodelpage />
      </UserGuard>
    </>
    )
}
export default CourseAppliedView;