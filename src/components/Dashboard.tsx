import { Link } from 'react-router-dom';
import { useAppSelector } from '../utils/hooks'

const Dashboard = () => {
  const userList = useAppSelector((state) => state.user)
  console.log("UserList", userList);

  return (
    <div>
      <h1>Dashboard</h1>
      <Link to='/signup'>Register New User</Link>
    </div>

  )
}

export default Dashboard