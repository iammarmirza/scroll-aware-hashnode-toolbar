import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react"

const ICONS = [
    <svg viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 2xl:h-6 2xl:w-6 stroke-current text-slate-800"><path d="M11 19C12 19 21 14.0002 21 7.00043C21 3.50057 18 1.04405 15 1.00065C13.5 0.978943 12 1.50065 11 3.00059C10 1.50065 8.47405 1.00065 7 1.00065C4 1.00065 1 3.50057 1 7.00043C1 14.0002 10 19 11 19Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>,
    <svg className="h-4 w-4 stroke-current text-slate-800 sm:h-5 sm:w-5 2xl:h-6 2xl:w-6" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.5 10.6667H9.83333M6.5 7.75H12.3333M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 9.99762 1.69478 10.9497 2.04839 11.8204C2.11606 11.9871 2.1499 12.0704 2.165 12.1377C2.17976 12.2036 2.18516 12.2524 2.18517 12.3199C2.18518 12.3889 2.17265 12.4641 2.14759 12.6145L1.65344 15.5794C1.60169 15.8898 1.57582 16.0451 1.62397 16.1573C1.66611 16.2556 1.7444 16.3339 1.84265 16.376C1.95491 16.4242 2.11015 16.3983 2.42063 16.3466L5.38554 15.8524C5.53591 15.8273 5.61109 15.8148 5.68011 15.8148C5.74763 15.8148 5.79638 15.8202 5.86227 15.835C5.92962 15.8501 6.01294 15.8839 6.17958 15.9516C7.05025 16.3052 8.00238 16.5 9 16.5Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>,
    <svg viewBox="0 0 16 20" className="h-4 w-4 scale-[0.97] stroke-current text-slate-800 sm:h-5 sm:w-5 2xl:h-6 2xl:w-6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.2 19V5.8C15.2 4.11984 15.2 3.27976 14.8731 2.63803C14.5854 2.07354 14.1265 1.6146 13.562 1.32698C12.9203 1 12.0802 1 10.4 1H5.60005C3.91989 1 3.07981 1 2.43808 1.32698C1.87359 1.6146 1.41465 2.07354 1.12703 2.63803C0.800049 3.27976 0.800049 4.11984 0.800049 5.8V19L5.85342 16.4733C6.64052 16.0798 7.03406 15.883 7.44686 15.8055C7.81246 15.737 8.18764 15.737 8.55324 15.8055C8.96603 15.883 9.35959 16.0798 10.1467 16.4733L15.2 19Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>,
    <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 stroke-current text-slate-800 sm:h-5 sm:w-5 2xl:h-6 2xl:w-6"><path d="M6.25 7.91667L11.75 5.08333M6.25 10.0833L11.75 12.9167M6.5 9C6.5 10.3807 5.38071 11.5 4 11.5C2.61929 11.5 1.5 10.3807 1.5 9C1.5 7.61929 2.61929 6.5 4 6.5C5.38071 6.5 6.5 7.61929 6.5 9ZM16.5 4C16.5 5.38071 15.3807 6.5 14 6.5C12.6193 6.5 11.5 5.38071 11.5 4C11.5 2.61929 12.6193 1.5 14 1.5C15.3807 1.5 16.5 2.61929 16.5 4ZM16.5 14C16.5 15.3807 15.3807 16.5 14 16.5C12.6193 16.5 11.5 15.3807 11.5 14C11.5 12.6193 12.6193 11.5 14 11.5C15.3807 11.5 16.5 12.6193 16.5 14Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>,
    <svg viewBox="0 0 24 24" className="h-4 w-4 scale-[1.1] fill-current stroke-current text-slate-800 sm:h-5 sm:w-5 2xl:h-6 2xl:w-6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"></path><path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"></path><path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"></path><path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>

]

export const Toolbar = ({ inView }) => {
    const [variant, setVariant] = useState("hidden")

    const { scrollY } = useScroll()
    useMotionValueEvent(scrollY, "change", (latest) => {
        
        if (inView) return setVariant("absolute")
        if (latest > 300) setVariant("visible")
        else setVariant("hidden")
    })

    return (
        <motion.div
            variants={{
                visible: { position: 'fixed', bottom: '20px' },
                hidden: { position: 'fixed', bottom: "-100px" },
                absolute: { position: 'absolute', bottom: '20px' }
            }}
            animate={variant}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className='z-20 flex w-full justify-center py-2'>
            <div className={`rounded-full bg-white flex px-2 py-3 border-zinc-200 border ${variant === 'visible' && 'shadow-md'}`}>
                {
                    ICONS.map(icon => (
                        <div className='px-4 border-r last:border-r-0'>
                            {icon}
                        </div>
                    ))
                }
            </div>
        </motion.div>
    )
}