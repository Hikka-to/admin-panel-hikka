import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

const SliderButton = ({ text, url }: { text: string, url: string }) => {

    return (
        <Link href={url}>
            <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-secondary-500 dark:text-white" >
                <i className="bi bi-house-door-fill"></i>
                <span className="text-[15px] ml-4 font-bold">{text}</span>
            </div>
        </Link>
    )
}

export default SliderButton