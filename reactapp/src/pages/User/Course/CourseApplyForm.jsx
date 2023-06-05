import { UserGuard } from '../../../AuthGuard/UserGuard'; 
import ApplyForm from '../../../components/User/ApplyForm/ApplyForm';

const CourseApplyForm = () => {
    return (
    <>
      <UserGuard>
        <ApplyForm />
      </UserGuard>
    </>
    )
}
export default CourseApplyForm;