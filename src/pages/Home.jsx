import TabMenu from "../components/TabMenu";
import { useNavigate } from "react-router-dom"
import { signOut } from "firebase/auth";
import { auth } from "../firebase/configs";
import { useEffect, useState } from "react";


export default function Home() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Se não tem user no localStorage, volta pro login
      navigate("/");
    }
  }, [navigate]);

  if (!user) return <div>Carregando...</div>;


    async function logout() {
        await signOut(auth);
        localStorage.removeItem("user");
        navigate("/");
  }
    
    return (
        <div>
            <TabMenu 
                logout={logout}
            />
        </div>
    )
}