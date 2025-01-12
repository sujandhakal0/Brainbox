
import { useRef } from "react";
import Input from "../../components/Input";
import Button from "../../components/ui/Button";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";



const Signup = () => {
    const navigate = useNavigate()
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        const name = nameRef.current?.value;
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        try {
            await axios.post(`${BACKEND_URL}/auth/register`, {
                name, email, password
            })
            toast.success("Account Created Successfully")
            navigate('/')
        } catch (error) {
            console.error('Error during signup:', error)
            toast.error("Error while creating account")
        }
    }

    return (
        <div className="min-h-screen bg-red-200 flex justify-center items-center">
            <div className=" p-8 flex flex-col justify-center items-center border-[#E2E8F0] shadow-[4px_4px_0px_rgba(0,0,0,0.1)] bg-white">
                <h2 className="text-2xl font-bold text-[#374151] mb-6 text-center">
                    Create Your Account
                </h2>
                <form className="space-y-4 flex flex-col items-center">
                    {/* Username */}
                    <div className="flex items-center gap-2 justify-center ">

                        <Input
                            ref={nameRef}
                            type="text"
                            placeholder="Name"
                        />
                    </div>

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
                        text="Signup"
                        onClick={handleSignup}
                    />

                </form>
                <p className="text-sm text-center text-[#6B7280] mt-4">
                    Already have an account?{" "}
                    <span onClick={() => navigate('/')} className="text-[#75CFE3] font-bold hover:text-[#E5736E]  hover:cursor-pointer">
                        Log In
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Signup;