import { HiArrowRightOnRectangle } from "react-icons/hi2"
import ButtonIcon from "../../ui/ButtonIcon"
import { useLogout } from "./uselogout";
function Logout() {
    const {logout,isLoggingOut} = useLogout();

 return (
    <ButtonIcon disabled={isLoggingOut} onClick={logout}>
        {isLoggingOut ? "Logging out..." : <HiArrowRightOnRectangle />}
    </ButtonIcon>
 )  
}
export default Logout;