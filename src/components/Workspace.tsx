import { useContext, useEffect, useState } from "react"
import { QuizContext, WorkspaceContext } from '../Contexts'
import { getQuizzes, getWorkspace } from '../Model'
import { GoKebabHorizontal } from 'react-icons/go'

interface WorkspaceType {
    id?: number,
    name?: string
}

interface AllQuizType {
    id: number,
    name: string,
    workspace_id: number,
    created_at: string,
    updated_at: string,
    length: number
}

const Workspace = () => {
    const { workspaceId, onDelete, onRename, onOption } = useContext(WorkspaceContext)
    const { onCreate, onDelete: onDeleteQuiz, onEdit } = useContext(QuizContext)    
    const [workspace, setWorkspace] = useState<WorkspaceType>({})
    const [quizzes, setQuizzes] = useState<AllQuizType[] | undefined>([])

    const fetchWorkspace = async () => {
        try {
            const data = await getWorkspace(workspaceId)
            setWorkspace(data)
        } catch (error) {
            console.error(error)
        }
    }

    const fetchQuizzes = async () => {
        try {
            const result = await getQuizzes(workspaceId)
            setQuizzes(result)
        } catch (error) {
            console.error(error);
        }
    }   

    useEffect(() => {
        fetchWorkspace()
        fetchQuizzes()
    }, [workspaceId])

    useEffect(() => {
        fetchQuizzes()
    }, [onDeleteQuiz, onCreate])

    useEffect(() => {
        fetchWorkspace()
    }, [onRename])

    return (
        <main className="w-screen md:w-[calc(100vw-10rem)] h-screen px-10 py-6 text-zinc-800">
            <div className="hidden md:flex items-center mb-5">
                <h1 className="text-xl md:text-3xl font-semibold me-5">{workspace.name}</h1>
                <button className='bg-transparent text-zinc-800 p-2 border-0 hover:border-0 hover:bg-zinc-300 text-2xl md:hidden' onClick={onOption}>
                <GoKebabHorizontal />
                </button>
            </div>
            <div className="hidden md:flex items-center justify-between w-full mb-6">
                <button 
                    className="bg-zinc-900 hover:bg-zinc-700 text-xs border-0 hover:border-0 outline-none text-zinc-100 rounded"
                    onClick={onCreate}
                >Create Quiz</button>
                <div className="hidden md:flex items-center">
                    <button 
                        className="bg-zinc-500 hover:bg-zinc-600 me-3 text-xs border-0 hover:border-0 outline-none text-zinc-100 rounded"
                        onClick={onRename}
                    >Rename Workspace</button>
                    <button 
                        className="bg-red-700 hover:bg-red-800 text-xs border-0 hover:border-0 outline-none text-zinc-100 rounded"
                        onClick={onDelete}
                    >Delete Workspace</button>
                </div>
            </div>
            <hr className="border-zinc-300 mb-4"/>
            <div className="hidden md:block">
                <ul className="mb-5 flex items-center text-sm">
                    <li className="w-96">Quiz</li>
                    <li className="w-44">Questions</li>
                    <li className="w-44">Created</li>
                    <li className="w-44">Updated</li>
                </ul>
                <ul className="text-xs">
                    { quizzes?.map((quiz)=>(
                        <li key={quiz.id} className="bg-zinc-100 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] py-3 px-5 cursor-pointer group mb-3" onClick={() => onEdit(quiz.id)}>
                            <ul className="flex items-center">
                                <li className="w-[24rem]">{quiz.name}</li>
                                <li className="w-36">{quiz.length}</li>
                                <li className="w-44">{quiz.created_at}</li>
                                <li className="w-44">{quiz.updated_at}</li>
                                <li className="opacity-0 group-hover:opacity-100">
                                    <button 
                                        className="bg-zinc-500 hover:bg-zinc-600 me-3 text-xs border-0 hover:border-0 outline-none text-zinc-100 rounded"
                                        onClick={() => onEdit(quiz.id)}
                                    >Edit</button>
                                    <button 
                                        className="bg-red-700 hover:bg-red-800 text-xs border-0 hover:border-0 outline-none text-zinc-100 rounded"
                                        onClick={() => onDeleteQuiz(quiz.id)}
                                    >Hapus</button>
                                </li>
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex flex-wrap gap-5 md:hidden">
                { quizzes?.map((quiz) => (
                    <div key={quiz.id} className="w-36 h-40 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-zinc-100 group cursor-pointer" onClick={() => onEdit(quiz.id)}>
                        <p className="w-full h-4/6 border-b border-b-zinc-300 flex items-center justify-center p-4 text-lg">{quiz.name}</p>
                        <div className="flex items-center justify-center h-2/6">
                            <button 
                                className="bg-red-700 hover:bg-red-800 text-xs border-0 hover:border-0 outline-none text-zinc-100 rounded py-1 hidden group-hover:block"
                                onClick={() => onDeleteQuiz(quiz.id)}
                            >Hapus</button>
                            <p className="block group-hover:hidden text-xs text-zinc-500">{quiz.created_at}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button 
                className="bg-zinc-900 hover:bg-zinc-700 text-lg border-0 hover:border-0 outline-none text-zinc-100 rounded absolute right-5 left-5 bottom-5 md:hidden"
                onClick={onCreate}
            >Create Quiz</button>
        </main>
    )
}

export default Workspace