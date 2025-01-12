import React from 'react';

interface SideBarItemProps {
    icon: React.ReactNode; // Icon component type
    text: string;
}

const SideBarItems: React.FC<SideBarItemProps> = ({ icon: Icon, text }) => {
    return (
        <div className="flex text-[#374151]  bg-[#FF847C] items-center space-x-3 p-2  cursor-pointer shadow-[4px_4px_0px_rgba(0,0,0,0.1)] hover:shadow-[2px_2px_0px_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-all duration-300">
            {Icon}
            <span className="text-[#374151] text-sm font-medium">{text}</span>
        </div>
    );
};

export default SideBarItems;