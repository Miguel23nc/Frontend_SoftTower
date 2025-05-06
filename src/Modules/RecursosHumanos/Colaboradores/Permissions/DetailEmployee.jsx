import { useEffect } from "react";
import Details from "../../../../components/Principal/Permissions/View";
import OtherProfiles from "../../../../components/Perfil/OtherProfiles";
import Profile from "../../../../components/Perfil/Profile";

const DetailEmployee = ({ setShowDetail, selected }) => {
  return (
    <Details setShowDetail={setShowDetail}>
      <Profile user={selected} />
    </Details>
  );
};

export default DetailEmployee;
