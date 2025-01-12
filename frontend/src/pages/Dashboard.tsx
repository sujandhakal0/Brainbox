import { useState } from "react";

import { MdAddComment } from "react-icons/md";
import SideBar from "../components/ui/sidebar/SideBar";
import BlogModal from "../components/blogs/BlogModal";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { useContent } from "../hooks/useContent";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import { FaFileExport } from "react-icons/fa";


const Dashboard = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [contentChanged, setContentChanged] = useState(false);
    const contents = useContent(contentChanged);


    const handleDelete = async (contentId: string) => {
        try {

            await axios.delete(`${BACKEND_URL}/content/${contentId}`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            toast.success("Content deleted");
            setContentChanged(prev => !prev)
            // Remove the deleted content from the state or refetch the data
        } catch (error) {
            toast.error("Error deleting item");
            console.log("Error deleting content", error);
        }
    };

    interface ContentProps {
        title: string;
        type: string;
        body: string;
        tags: string[];  // This ensures `tags` is an array of strings
        link: string;
    }

    const handleExportPDF = () => {
        const doc = new jsPDF();
        const marginTop = 10;
        const pageHeight = doc.internal.pageSize.height;
        let yPosition = marginTop; // Start at the top of the page

        contents.forEach((content: ContentProps) => {
            const { title, type, body, tags, link } = content;

            // Check if the content fits on the current page
            if (yPosition + 50 > pageHeight) { // 50 is a buffer for spacing
                doc.addPage(); // Add a new page if space is insufficient
                yPosition = marginTop; // Reset the yPosition for the new page
            }

            // Add content text with increased vertical spacing
            doc.text(`Title: ${title}`, 10, yPosition);
            yPosition += 10; // Move the position down after the title

            doc.text(`Type: ${type}`, 10, yPosition);
            yPosition += 10;

            doc.text(`Content: ${body}`, 10, yPosition);
            yPosition += 20; // Increase space between content and next section

            doc.text(`Tags: ${tags.join(", ")}`, 10, yPosition);
            yPosition += 10;

            doc.text(`Link: ${link}`, 10, yPosition);
            yPosition += 20; // Add space before the next content

        });

        doc.save("content.pdf");
    };



    return (
        <div className="bg-[#F7F9FA] min-h-screen pt-[2.5rem] pr-[4rem] pl-[4rem] flex flex-col ">
            <div className="fixed top-[7.6rem] left-[4rem]">
                <SideBar />
            </div>
            <BlogModal open={isModalOpen} close={() => { setModalOpen(false) }} />
            <div className=" flex justify-end gap-4 ">
                <Button
                    variant="primary"
                    size="md"
                    text="Add Snippet"
                    startIcon={<MdAddComment className="text-lg " />}
                    onClick={() => setModalOpen(true)}
                />
                <Button
                    variant="secondary"
                    size="md"
                    startIcon={<FaFileExport />}
                    text="Export Snippets"
                    onClick={handleExportPDF}
                />

            </div>
            <div className="mt-24 flex flex-wrap gap-8 justify-center items-center ">
                {contents.map(({ _id, title, type, body, link, tags, createdAt }) => (
                    <Card
                        key={_id}
                        _id={_id}
                        title={title}
                        type={type}
                        body={body}
                        link={link}
                        tags={tags}
                        createdAt={createdAt}
                        onDelete={handleDelete}
                    />
                ))}
            </div>

        </div>
    )
}

export default Dashboard