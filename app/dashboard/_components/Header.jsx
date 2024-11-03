"use client"
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import Image from 'next/image'
import React from 'react'

function Header() {
    const { user } = useKindeBrowserClient()

    if (!user?.picture) {
        return (
            <div>
                <div>
                    {/* Your other header content */}
                </div>
                <div className="w-[35px] h-[35px] rounded-full bg-slate-300" />
            </div>
        )
    }

    return (
        <div className='p-4 shadow-sm border flex justify-between'>
            <div>
                {/* Your other header content */}
            </div>
            <div>
                <Image
                    src={user.picture}
                    width={35}
                    height={35}
                    alt='user profile'
                    className='rounded-full'
                />
            </div>
        </div>
    )
}

export default Header