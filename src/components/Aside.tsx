import { useContext, useState } from "react"
import { AsideContext, QuizContext, WorkspaceContext } from "../Contexts"
import { useEffect } from "react"
import { getAllWorkspace } from "../Model"

interface AllWorkspaceType {
    id: number,
    name: string,
    length: number
}

const Aside = () => {
    const { isOpen, onClose } = useContext(AsideContext)
    const { onCreate, onOpen } = useContext(WorkspaceContext)
    const { onClose: onCloseQuiz } = useContext(QuizContext)
    const [workspaces, setWorkspaces] = useState<AllWorkspaceType[] | undefined>([])

    const fetchAllWorkspace = async () => {
        try {
            const data = await getAllWorkspace()
            if (data) setWorkspaces(data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchAllWorkspace()
    }, [])

    const handleWorkspaceClicked = (id: number) => {
        onOpen(id)
        onClose()
        onCloseQuiz()
    }

    return (
        <>
            <button className={`absolute right-0 top-0 h-screen w-4/12 rounded-none border-0 hover:border-0 opacity-60 transition-all ease-in-out duration-1000 ${isOpen ? 'opacity-50 z-10' : 'opacity-0 -z-10' } md:hidden`} onClick={onClose}/>
            <aside 
                className={`h-screen w-8/12 bg-zinc-100 absolute top-0 py-5 transition-all ease-in-out duration-500 ${isOpen ? '-translate-x-0' : '-translate-x-full' } md:w-64 md:-translate-x-0 md:relative md:border-r md:border-r-zinc-300 overflow-auto z-10`}
            >
                <button 
                    className="bg-zinc-900 rounded hover:bg-zinc-700 text-xs border-0 hover:border-0 outline-none ms-5"
                    onClick={onCreate}
                >Create Workspace</button>
                <ul className="mt-8 text-zinc-700 text-sm font-normal">
                    { workspaces &&
                        workspaces.map((workspace) => (
                            <li 
                                key={workspace.id}
                                className="flex items-center justify-between cursor-pointer px-5 py-3 hover:bg-zinc-300"
                                onClick={() => handleWorkspaceClicked(workspace.id)}
                            >
                                <span>{workspace.name}</span>
                                <span>{workspace.length}</span>
                            </li>
                        ))
                    }
                </ul>
            </aside>
        </>
    )
}

export default Aside