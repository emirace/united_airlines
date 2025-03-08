import { useEffect } from "react";
import { ping } from "../../../services/image";
import PersonalInfoForm from "./_components/personalInfoForm";
import UpdateEmail from "./_components/updateEmail";
import UpdatePassword from "./_components/updatePassword";

function Profile() {
  useEffect(() => {
    ping();
  }, []);

  return (
    <div className="space-y-6">
      <PersonalInfoForm />
      <UpdateEmail />
      <UpdatePassword />
    </div>
  );
}

export default Profile;
