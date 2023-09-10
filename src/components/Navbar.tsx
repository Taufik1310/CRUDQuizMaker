import { GoKebabHorizontal } from 'react-icons/go'
import { BiMenuAltLeft } from 'react-icons/bi'
import { AsideContext, WorkspaceContext } from '../Contexts'
import { useContext, useEffect, useState } from "react"
import { getWorkspace } from '../Model'

interface WorkspaceType {
    id?: number,
    name?: string
}

const Navbar = () => {
    const { onOpen } = useContext(AsideContext)
    const { workspaceId, onOption, onRename } = useContext(WorkspaceContext)
    const [workspace, setWorkspace] = useState<WorkspaceType>({})

    const fetchWorkspace = async () => {
        try {
            const data = await getWorkspace(workspaceId)
            setWorkspace(data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchWorkspace()
    }, [workspaceId, onRename])

    return (
        <nav className='flex justify-between items-center w-screen bg-zinc-100 p-3 md:hidden'>
            <button 
                className='bg-transparent text-zinc-800 p-2 border-0 hover:border-0 hover:bg-zinc-300 text-3xl'
                onClick={onOpen}
            >
                <BiMenuAltLeft />
            </button>
            <h2 className='text-zinc-800 font-semibold'>{workspace.name}</h2>
            <button className='bg-transparent text-zinc-800 p-2 border-0 hover:border-0 hover:bg-zinc-300 text-2xl' onClick={onOption}>
                <GoKebabHorizontal />
            </button>
        </nav>
    )
}

export default Navbar