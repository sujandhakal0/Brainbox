

import SideBarItems from './SideBarItems';
import { FaNoteSticky } from 'react-icons/fa6';


const SideBar = () => {
    return (
        <div className="  w-[8rem] 
        ">
            <div className='flex flex-col gap-2'>
                <SideBarItems icon={<FaNoteSticky />} text="Snippets" />
            </div>


        </div>
    );
};

export default SideBar;
