import React, { useEffect } from 'react'

const Profile = () => {
  useEffect(() => {
    throw new Error("Error Show")
  }, [])
  return (
    <div>Profile</div>
  )
}

export default Profile