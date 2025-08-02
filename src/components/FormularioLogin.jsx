import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/configs";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";

export default function FormularioLogin() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  async function enviarFormulario(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      const loggedUser = userCredential.user;

      localStorage.setItem("user", JSON.stringify({
        uid: loggedUser,
      }));

      navigate("/home");
    } catch (err) {
      console.error("Erro:", err.message);
    } finally {
      setLoading(false);
    }
  }


  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
          alt="Loading..."
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center z-50">
      <div className="bg-white max-w-md rounded-lg shadow-lg w-[400px] h-auto">
        <div>
          <img src={Logo} alt="Logo" className=" w-[8rem] h-[8rem]" />
        </div>
        <form onSubmit={enviarFormulario} className="flex flex-col gap-5 p-5">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite o email"
            className="p-2 border border-black rounded-md w-full"
          />
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite a sua senha"
            className="p-2 border border-black rounded-md w-full"
          />
          <button
            type="submit"
            className="rounded-md bg-black text-white p-2 mt-8 w-full text-center hover:opacity-60 cursor-pointer"
          >
            Entrar
          </button>
        </form>
        <p className="text-black underline text-sm mt-5 p-5 hover:opacity-60 cursor-pointer">
          Esqueceu a senha?
        </p>
      </div>
    </div>
  );
}
