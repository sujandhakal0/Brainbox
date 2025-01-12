

import { RiDeleteBinFill } from "react-icons/ri";

const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
    };
    return new Date(date).toLocaleDateString(undefined, options);
};

interface CardProps {
    _id: string;
    title: string;
    type: string;
    body: string;
    link?: string;
    tags?: string[];
    createdAt: string;
    onDelete: (contentId: string) => void;
}

const Card = ({ _id, title, type, body, link, tags, createdAt, onDelete }: CardProps) => {
    const handleDelete = () => {
        onDelete(_id); // Call the onDelete function passed from the parent
    };

    return (
        <div className="max-w-96 min-h-[20rem] bg-red-200 text-[#374151] border border-[#E2E8F0] shadow-[4px_4px_0px_rgba(0,0,0,0.1)] hover:shadow-[2px_2px_0px_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-all duration-300 p-4">
            <div className="flex justify-between">
                <h3 className="text-lg font-bold text-[#374151] mb-2">{title} ({type})</h3>
                <div className="flex gap-2 text-[#75CFE3] transition-colors duration-300">
                    <RiDeleteBinFill onClick={handleDelete} className="hover:text-[#98832c] hover:cursor-pointer" />
                </div>
            </div>
            <p className="text-base text-[#6B7280]">{body}</p>

            {/* Conditionally render the link */}
            {link && (
                <div className="text-sm mt-2 text-[#007BFF]">
                    Link:{" "}
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[#007BFF] hover:text-[#0056b3] underline cursor-pointer"
                    >
                        {link}
                    </a>
                </div>
            )}

            {/* Conditionally render the tags */}
            {tags && tags.length > 0 && (
                <div className="text-[#2D3748] text-sm mt-2">
                    Tags: <span className="font-semibold text-[#4A5568]">{tags.join(", ")}</span>
                </div>
            )}

            <div className="text-[#2D3748] text-sm mt-2">
                Added on: <span className="font-semibold text-[#4A5568]">{formatDate(createdAt)}</span>
            </div>
        </div>
    );
};

export default Card;