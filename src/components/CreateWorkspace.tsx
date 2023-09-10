import { useContext, useState } from 'react'
import { WorkspaceContext } from '../Contexts'
import { addWorkspace } from '../Model'

const CreateWorkspace = () => {
    const { onClose } = useContext(WorkspaceContext)
    const [workspaceName, setWorkspaceName] = useState('')

    const createWorkspace = async () => {
        try {
            const result = await addWorkspace(workspaceName)
            if (result) window.location.reload()
        } catch (error) {
            console.error(error)
        }
    }

    const handleSubmittedForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        createWorkspace()
        onClose()
    }

    return (
        <>
            <button className="absolute top-0 left-0 right-0 bottom-0 border-0 hover:border-0 outline-none bg-zinc-900 opacity-50 rounded-none z-40" onClick={onClose} />
            <form className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 md:w-6/12 h-48 bg-zinc-100 z-50 rounded-lg flex flex-col items-center justify-center py-4 px-6 text-zinc-800" onSubmit={handleSubmittedForm}>
                <label htmlFor="workspace-name" className='text-xl mb-3'>Create a New Workspace</label>
                <input type="text" name="workspace-name" id="workspace-name" placeholder='Name your workspace' className='w-full bg-transparent border border-zinc-500 outline-none rounded-sm px-3 py-2 mb-5' required onChange={(e) => setWorkspaceName(e.target.value)} value={workspaceName} />
                <div className='flex justify-end items-center w-full'>
                    <button className='border-0 hover:border-0 outline-none rounded-md px-3 py-2 text-xs bg-zinc-300 text-zinc-800 me-2' onClick={onClose}>Cancel</button>
                    <button className='border-0 hover:border-0 outline-none rounded-md px-3 py-2 text-xs bg-zinc-800 text-zinc-100' type='submit'>Create Workspace</button>
                </div>
            </form>
        </>
    )
}

export default CreateWorkspace