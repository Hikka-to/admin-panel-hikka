import SidebarButtonType from '@/types/sidebar/SidebarButtonType';
import Link from 'next/link';
import React from 'react'

const SliderButton = ({content}: {content: SidebarButtonType}) => { 

    return (
        <Link href={content.url}>
            <div
                className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-secondary-500 dark:text-white">
                <i className="bi bi-house-door-fill"></i>
                <span className="text-[15px] ml-4 font-bold">{content.text}</span>
            </div>
        </Link>
    )
}

export default SliderButton