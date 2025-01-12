import { useNavigate } from "react-router-dom"
import Input from "../../components/Input"
import Button from "../../components/ui/Button"
import axios from "axios"
import { toast } from "react-toastify"
import { BACKEND_URL } from "../../config"
import { useRef } from "react"


const Signin = () => {
  const navigate = useNavigate()

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    try {
      const response = await axios.post(`${BACKEND_URL}/auth/signin`, {
        email, password
      })
      localStorage.setItem("token", response.data.token)
      toast.success("User Signed In Successfully")
      navigate('/dashboard')
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "Error during sign-in";
        console.error('Error during sign-in:', error);
        toast.error(` ${errorMessage}`)
      } else {
        toast.error("An unknown error occurred");
      }
    }
  }
  return (
    <div className="min-h-screen bg-red-200 flex justify-center items-center">
      <div className=" p-8 flex flex-col justify-center items-center border-[#E2E8F0] shadow-[4px_4px_0px_rgba(0,0,0,0.1)] bg-white">
        <h2 className="text-2xl font-bold text-[#374151] mb-6 text-center">
          Login to your account
        </h2>
        <form className="space-y-4 flex flex-col items-center">


          {/* Email */}
          <div className="flex items-center gap-2 justify-center">

            <Input
              ref={emailRef}
              type="email"
              placeholder="Email"
            />
          </div>

          {/* Password */}
          <div className="flex items-center gap-2 justify-center">

            <Input
              ref={passwordRef}
              type="password"
              placeholder="Password"

            />
          </div>


          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="md"
            text="Login"
            onClick={handleSignin}
          />

        </form>
        <p className="text-sm text-center text-[#6B7280] mt-4">
          Don't have an account yet?{" "}
          <span onClick={() => navigate('/signup')} className="text-[#75CFE3] font-bold hover:text-[#E5736E] hover:cursor-pointer">
            Sign Up
          </span>
        </p>
      </div>
    </div>
  )
}

export default Signin