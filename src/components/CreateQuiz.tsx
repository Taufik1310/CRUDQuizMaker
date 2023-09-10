import { useContext, useState } from 'react'
import { QuizContext, WorkspaceContext } from '../Contexts'
import { addQuiz } from '../Model'

const CreateQuiz = () => {
    const { workspaceId } = useContext(WorkspaceContext)
    const { onClose } = useContext(QuizContext)
    const [quizName, setQuizName] = useState('')

    const createQuiz = async () => {
        try {
            await addQuiz(workspaceId, quizName)
        } catch (error) {
            console.error(error)
        }
    }

    const handleSubmittedForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        createQuiz()
        onClose()
    }

    return (
        <>
            <button className="absolute top-0 left-0 right-0 bottom-0 border-0 hover:border-0 outline-none bg-zinc-900 opacity-50 rounded-none" onClick={onClose} />
            <form className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 h-48 bg-zinc-100 z-50 rounded-lg flex flex-col items-center justify-center py-4 px-6 text-zinc-800" onSubmit={handleSubmittedForm}>
                <label htmlFor="workspace-name" className='text-xl mb-3'>Bring your new quiz to life</label>
                <input type="text" name="workspace-name" id="workspace-name" placeholder='Name your Quiz' className='w-full bg-transparent border border-zinc-500 outline-none rounded-sm px-3 py-2 mb-5' required onChange={(e) => setQuizName(e.target.value)} value={quizName} />
                <div className='flex justify-end items-center w-full'>
                    <button className='border-0 hover:border-0 outline-none rounded-md px-3 py-2 text-xs bg-zinc-300 text-zinc-800 me-2' onClick={onClose}>Cancel</button>
                    <button className='border-0 hover:border-0 outline-none rounded-md px-3 py-2 text-xs bg-zinc-800 text-zinc-100' type='submit'>Create Workspace</button>
                </div>
            </form>
        </>
    )
}

export default CreateQuiz