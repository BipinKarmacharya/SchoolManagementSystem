import { FaEye } from "react-icons/fa";
import { LiaUserEditSolid } from "react-icons/lia";
import { TbTrashX } from "react-icons/tb";
import { Link } from "react-router-dom";

import "/src/assets/CSS/Components/Profile.css";
const Profile = ({ person }) => {
  return (
    <div className="personDetails">
      <div className="personPhoto">
        <img src={person.profile_image} alt={person.first_name} className="profileImg" />
      </div>
      <div className="personIdentity">
        <p className="StdIdNumber">{person.person_id}</p>
        <p>{person.first_name} {person.middle_name} {person.last_name}</p>
      </div>
      <hr />
      <div className="editIcons">
        <Link to={`/persons/${person.id}`} title="View Details">
          <FaEye />
        </Link>
        
        <Link to={`/persons/${person.person_id}/edit`} title="Edit Profile">
          <LiaUserEditSolid />
        </Link>
        
        <Link to={`/persons/${person.person_id}/delete`} title="Delete Profile">
          <TbTrashX />
        </Link>
      </div>
    </div>
  );
};

export default Profile;