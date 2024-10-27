'use client'

import { Box } from "@mui/material"
import Link from "next/link"
import Image from "next/image"
import Logo from '../../../../public/images/Logo.png'
import { memo } from "react"

function NonMemoHomeLink() {
    return (
        <Box position={"relative"} width={91} height={32}>
            <Link href={'/'}>
                <Image fill src={Logo} alt="Cozy" />
            </Link>
        </Box>
    )
}

const HomeLink = memo(NonMemoHomeLink);

export default HomeLink;
