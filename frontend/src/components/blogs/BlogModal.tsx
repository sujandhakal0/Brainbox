import { ImCross } from "react-icons/im";
import Input from "../Input";
import Button from "../ui/Button";
import { FC, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../../config";
import axios from "axios";


interface BlogModalProps {
    open: boolean;
    close: () => void;
}

const BlogModal: FC<BlogModalProps> = ({ open, close }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // If the modal is open, add a click listener to the document
        if (open) {
            const handleClickOutside = (event: MouseEvent) => {
                if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                    close(); // Close the modal if the click is outside the modal box
                }
            };

            document.addEventListener("mousedown", handleClickOutside);

            return () => {
                document.removeEventListener("mousedown", handleClickOutside); // Cleanup listener when the component is unmounted
            };
        }
    }, [open, close]);

    // ///
    const titleRef = useRef<HTMLInputElement>(null);
    const typeRef = useRef<HTMLSelectElement>(null); // Updated to select element
    const bodyRef = useRef<HTMLTextAreaElement>(null);
    const tagsRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);



    const handleAddContent = async (e: React.FormEvent) => {
        e.preventDefault();
        const title = titleRef.current?.value;
        const type = typeRef.current?.value;
        const body = bodyRef.current?.value || "";
        const tags = tagsRef.current?.value
        const link = linkRef.current?.value;

        try {
            await axios.post(`${BACKEND_URL}/content/create`, {
                title,
                type,
                body,
                tags,
                link,
            }, { headers: { Authorization: localStorage.getItem("token") } });
            if (titleRef.current) titleRef.current.value = "";
            if (typeRef.current) typeRef.current.value = "";
            if (bodyRef.current) bodyRef.current.value = "";
            if (tagsRef.current) tagsRef.current.value = "";
            if (linkRef.current) linkRef.current.value = "";
            toast.success("Snippet Recorded successfully!");
            close()
        } catch (error) {
            console.error("Error during adding content:", error);
            toast.error("Error while creating content");
        }
    };

    return (
        <div>
            {open && (
                <div className="w-screen h-screen bg-red-200/[.60] fixed top-0 left-0 flex justify-center items-center">
                    <div ref={modalRef} className="p-8 flex flex-col gap-4 justify-center border-[#E2E8F0] shadow-[4px_4px_0px_rgba(0,0,0,0.1)] bg-white">
                        <div className="flex flex-col items-center gap-4">
                            <div className="flex justify-between w-full items-center mb-2">
                                <h1 className="text-lg font-bold text-[#FF847C]">Snippet</h1>
                                <ImCross
                                    className="text-[10px] text-[#374151] cursor-pointer hover:text-[#98832c] transition-colors duration-200"
                                    onClick={close}
                                />
                            </div>

                            <Input
                                type="text"
                                ref={titleRef}
                                placeholder="Title"
                            />
                            {/* Updated dropdown for type */}
                            <select
                                ref={typeRef}
                                className="input-field p-2 w-full border-2 border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 shadow-[4px_4px_0px_rgba(0,0,0,0.1)] hover:shadow-[2px_2px_0px_rgba(0,0,0,0.15)]"
                            >
                                <option value="">Select Type</option>
                                <option value="Notes">Notes</option>
                                <option value="Routines">Routines</option>
                                <option value="Diary">Diary</option>
                            </select>
                            <textarea
                                placeholder="Content"
                                className="input-field border-2 border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 shadow-[4px_4px_0px_rgba(0,0,0,0.1)] hover:shadow-[2px_2px_0px_rgba(0,0,0,0.15)]"
                                rows={3}
                                ref={bodyRef}
                            />
                            <Input
                                type="text"
                                ref={tagsRef}
                                placeholder="Tags"
                            />
                            <Input
                                ref={linkRef}
                                type="text"
                                placeholder="Link"
                            />
                        </div>

                        <Button type="submit" variant="primary" text="Record" size="md" onClick={handleAddContent} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogModal;