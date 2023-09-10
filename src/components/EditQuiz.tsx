import { useContext, useEffect, useState } from "react"
import { QuizContext } from '../Contexts'
import { addQuestion, deleteQuestion, editOption, editQuestion, getQuestions, getQuiz } from "../Model"

interface QuizType {
    id?: number,
    name?: string,
    workspace_id?: number,
    created_at?: string,
    updated_at?: string,
}

interface QuestionType {
    id?: number,
    question?: string,
    options?: [
        {
          id?: number,
          option?: string
        }
    ],
    answer?: number,
    quiz_id?: number
}

const EditQuiz = () => {
    const { quizId } = useContext(QuizContext)    
    const [quiz, setQuiz] = useState<QuizType>({})
    const [questions, setQuestions] = useState<QuestionType[]>([])

    const fetchQuiz = async () => {
        try {
            const data = await getQuiz(quizId)
            setQuiz(data)
        } catch (error) {
            console.error(error)
        }
    }

    const fetchQuestion = async () => {
        try {
            const data = await getQuestions(quizId)
            setQuestions(data)
        } catch (error) {
            console.error(error)
        }
    }

    const handleQuestionEdited = async (id: number | undefined, newQuestion: string) => {
        try {
            await editQuestion(id, newQuestion)
        } catch (error) {
            console.error(error)
        }
    }

    const handleQuestionCreated = async () => {
        try {
            await addQuestion(quizId)
            fetchQuestion()
        } catch (error) {
            console.error(error)
        }
    }

    const handleQuestionDeleted = async (id: number | undefined) => {
        try {
            await deleteQuestion(id)
            fetchQuestion()
        } catch (error) {
            console.error(error)
        }
    }

    const handleOptionEdited = async (id: number | undefined, optionId: number | undefined, newQuestion: string) => {
        try {
            await editOption(id, optionId, newQuestion)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchQuiz()
        fetchQuestion()
    }, [])

    return (
        <div className="w-screen md:w-[calc(100vw-10rem)] h-screen px-10 py-6 pb-36 text-zinc-800 overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl md:text-3xl font-semibold me-5">{quiz.name}</h1>
                <button 
                    className="bg-zinc-900 hover:bg-zinc-700 text-xs border-0 hover:border-0 outline-none text-zinc-100 rounded bottom-5 hidden md:block"
                    onClick={handleQuestionCreated}
                >New Question</button>
            </div>
            <div className="w-full">
                { questions?.map((question) => (
                    <div key={question.id} className="w-full bg-zinc-100 min-h-[20rem] md:min-h-[16rem] rounded-md shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] cursor-pointer mb-5 pb-5 group">
                        <textarea className="w-full p-5 border-b border-b-zinc-300 bg-transparent outline-none" placeholder="Your question ...." defaultValue={question.question} onChange={(e) => handleQuestionEdited(question.id, e.target.value)}/>
                        <form className="w-full flex flex-col md:flex-row md:flex-wrap p-5 text-sm">
                            { question.options?.map((option, index) => (
                                <div className="mb-3 md:w-1/2" key={index}>
                                    <input type="radio" name="options" className="me-3 accent-green-500 bg-zinc-100" />
                                    <input type="text" name="options" className="border-0 outline-none bg-transparent px-2 py-1" placeholder={`Option ${index}`} defaultValue={option.option} onChange={(e) => handleOptionEdited(question.id, option.id, e.target.value)}/>
                                </div>
                            ))}
                        </form>
                        <button 
                            className="bg-red-700 hover:bg-red-800 text-sm border-0 hover:border-0 outline-none text-zinc-100 rounded py-1 opacity-0 group-hover:opacity-100 block ms-auto me-6"
                            onClick={() => handleQuestionDeleted(question.id)}
                        >Hapus</button>
                    </div>
                ))}
            </div>
            <button 
                className="bg-zinc-900 hover:bg-zinc-700 text-lg border-0 hover:border-0 outline-none text-zinc-100 rounded absolute right-5 left-5 bottom-5 md:hidden"
                onClick={handleQuestionCreated}
            >New Question</button>
        </div>
    )
}

export default EditQuiz