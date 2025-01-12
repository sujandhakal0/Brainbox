
import { SiMusicbrainz } from 'react-icons/si'

const Logo = () => {
    return (
        <div>
            {/* logo */}
            <div className="flex items-center gap-3 font-bold">
                <div className="flex items-center gap-2">
                    {/* Icon */}
                    <div className="bg-[#75CFE3] p-2 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300">
                        <SiMusicbrainz className="text-white text-3xl" />
                    </div>
                    {/* Text */}
                    <h1 className="text-4xl font-extrabold">
                        Brainbox
                    </h1>
                </div>
            </div>
            {/* logo */}
        </div>
    )
}

export default Logo