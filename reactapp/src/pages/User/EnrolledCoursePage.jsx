import { UserGuard } from '../../AuthGuard/UserGuard'; 
import EnrolledCourse from '../../components/User/EnrolledCourse';

const EnrolledCoursePage = () => {
    return (
    <>
      <UserGuard>
        <EnrolledCourse />
      </UserGuard>
    </>
    )
}
export default EnrolledCoursePage;