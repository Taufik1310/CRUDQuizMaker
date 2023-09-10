import { useContext, useState, useEffect } from "react"
import { WorkspaceContext } from "../Contexts"
import { deleteWorkspace, getWorkspace } from "../Model"

const DeleteWorkspace = () => {
    const { onClose, workspaceId } = useContext(WorkspaceContext)
    const [workspaceName, setWorkspaceName] = useState('')

    const removeWorkspace = async () => {
        try {
            const result = await deleteWorkspace(workspaceId)
            if (result) window.location.reload()
        } catch (error) {
            console.error(error)
        }
    }

    const fetchWorkspace = async () => {
        try {
            const result = await getWorkspace(workspaceId)
            setWorkspaceName(result.name)
        } catch (error) {
            console.error(error)
        }
    }

    const handleSubmittedForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        removeWorkspace()
        onClose()
    }

    useEffect(() => {
        fetchWorkspace()
    }, [])

    return (
        <>
            <button className="absolute top-0 left-0 right-0 bottom-0 border-0 hover:border-0 outline-none bg-zinc-900 opacity-80 rounded-none" onClick={onClose} /> 
            <form className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 h-48 bg-zinc-100 z-50 rounded-lg flex flex-col justify-center py-4 px-6 text-zinc-800" onSubmit={handleSubmittedForm}>
                <p className='text-xl mb-3'>Delete Workspace ?</p>
                <p className="text-sm mb-5">If you delete workspace with name: <strong>{workspaceName}</strong><br /> You'll lose access to all quizzess in it.</p>
                <div className='flex justify-end items-center w-full'>
                    <button className='border-0 hover:border-0 outline-none rounded-md px-3 py-2 text-xs bg-zinc-300 text-zinc-800 me-2' onClick={onClose} type="reset">Cancel</button>
                    <button className='border-0 hover:border-0 outline-none rounded-md px-3 py-2 text-xs bg-red-600 text-zinc-100' type='submit'>Delete</button>
                </div>
            </form>
        </>
    )
}

export default DeleteWorkspace