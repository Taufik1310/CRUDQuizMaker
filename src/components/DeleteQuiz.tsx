import { useContext, useState, useEffect } from "react"
import { QuizContext } from "../Contexts"
import { deleteQuiz, getQuiz } from "../Model"

const DeleteQuiz = () => {
    const { onClose, quizId } = useContext(QuizContext)
    const [quizName, setQuizName] = useState('')

    const removeQuiz = async () => {
        try {
            await deleteQuiz(quizId)
        } catch (error) {
            console.error(error)
        }
    }

    const fetchQuiz = async () => {
        try {
            const result = await getQuiz(quizId)
            setQuizName(result.name)
        } catch (error) {
            console.error(error)
        }
    }

    const handleSubmittedForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        removeQuiz()
        onClose()
    }

    useEffect(() => {
        fetchQuiz()
    }, [])

    return (
        <>
            <button className="absolute top-0 left-0 right-0 bottom-0 border-0 hover:border-0 outline-none bg-zinc-900 opacity-80 rounded-none" onClick={onClose} /> 
            <form className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 h-48 bg-zinc-100 z-50 rounded-lg flex flex-col justify-center py-4 px-6 text-zinc-800" onSubmit={handleSubmittedForm}>
                <p className='text-xl mb-3'>Delete this Quiz ?</p>
                <p className="text-sm mb-5">You're about to delete: <strong>{quizName}</strong><br /> It'll be gone forever and we won't be able to recover it.</p>
                <div className='flex justify-end items-center w-full'>
                    <button className='border-0 hover:border-0 outline-none rounded-md px-3 py-2 text-xs bg-zinc-300 text-zinc-800 me-2' onClick={onClose} type="reset">Cancel</button>
                    <button className='border-0 hover:border-0 outline-none rounded-md px-3 py-2 text-xs bg-red-600 text-zinc-100' type='submit'>Yes, delete it</button>
                </div>
            </form>
        </>
    )
}

export default DeleteQuiz