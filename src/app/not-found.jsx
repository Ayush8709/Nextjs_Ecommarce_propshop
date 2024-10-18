// This is global page not found page
import Link from "next/link"
export default function NotFound() {
    return (
        <>
            <h1>This page is not avalable</h1>
            <button><Link href='/'>Go Back</Link></button>
        </>
    )
}