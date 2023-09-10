import axios from "axios"

const BASE_URL = 'http://localhost:3000'

interface QuizType {
    id: number,
    name: string,
    workspace_id: number,
    created_at: string,
    updated_at: string
}

interface WorkspaceType {
    id: number,
    name: string
}

interface AllWorkspaceType {
    id: number,
    name: string,
    length: number
}

interface AllQuizType {
    id: number,
    name: string,
    workspace_id: number,
    created_at: string,
    updated_at: string,
    length: number
}

interface QuestionType {
    id: number,
    question: string,
    options: [
        {
          id: number,
          option: string
        }
    ],
    answer: number,
    quiz_id: number
}

interface OptionType {
    id?: number,
    option?: string
}

export const getWorkspaceLength = async (id: number) => {
    try {
        const quizzes = await axios.get(`${BASE_URL}/quizzes`)
        const filteredQuiz = await quizzes.data.filter((quiz: QuizType) => quiz.workspace_id === id)
        return filteredQuiz.length
    } catch (error) {
        console.error(error)
    }
}

export const getAllWorkspace = async () => {
    try {
        const workspaces = await axios.get(`${BASE_URL}/workspaces`)
        const results: AllWorkspaceType[] = await Promise.all(
            workspaces.data.map( async (workspace: WorkspaceType) => ({
                id: workspace.id,
                name: workspace.name,
                length: await getWorkspaceLength(workspace.id)
            }))
        )
        return results
    } catch (error) {
        console.error(error)
    }
}

export const addWorkspace = async (name: string) => {
    try {
        const workspaces = await getAllWorkspace()
        let highestId: number = workspaces ? Math.max(...workspaces.map((workspace) => workspace.id)) : 0
        const result = await axios.post(`${BASE_URL}/workspaces`, {
            id: ++highestId,
            name: name
        })
        return result
    } catch (error) {
        console.error(error)
    }
}

export const getWorkspace = async (id: number) => {
    try {
        const workspace = await axios.get(`${BASE_URL}/workspaces/${id}`)
        return workspace.data
    } catch (error) {
        console.error(error)
    }
}

export const renameWorkspace = async (id: number, newName: string) => {
    try {
        const result = await axios.patch(`${BASE_URL}/workspaces/${id}`, {
            name: newName
        })
        return result
    } catch (error) {
        console.error(error)
    }
}

export const deleteWorkspace = async (id: number) => {
    try {
        const result = await axios.delete(`${BASE_URL}/workspaces/${id}`)
        return result
    } catch (error) {
        console.error(error)
    }
}

export const getQuizzes = async (workspaceId: number) => {
    try {
        const quizzes = await axios.get(`${BASE_URL}/quizzes`)
        const filteredQuiz = quizzes.data.filter((quiz: QuizType) => quiz.workspace_id === workspaceId)
        const results: AllQuizType[] = await Promise.all(
            filteredQuiz.map( async (quiz: QuizType) => ({
                id: quiz.id,
                name: quiz.name,
                created_at: quiz.created_at,
                updated_at: quiz.updated_at,
                length: await getQuizLength(quiz.id)
            }))
        )
        return results
    } catch (error) {
        console.error(error)
    }
}

export const getQuizLength = async (id: number) => {
    try {
        const questions = await axios.get(`${BASE_URL}/questions`)
        const filteredQuestion = questions.data.filter((question: QuestionType) => question.quiz_id === id)
        return filteredQuestion.length
    } catch (error) {
        console.error(error)
    }
}

export const deleteQuiz = async (id: number) => {
    try {
        const result = await axios.delete(`${BASE_URL}/quizzes/${id}`)
        return result
    } catch (error) {
        console.error(error)
    }
}

export const getQuiz = async (id: number) => {
    try {
        const quizzes = await axios.get(`${BASE_URL}/quizzes/${id}`)
        return quizzes.data
    } catch (error) {
        console.error(error)
    }
}

export const getAllQuiz = async () => {
    try {
        const quizzes = await axios.get(`${BASE_URL}/quizzes`)
        return quizzes.data
    } catch (error) {
        console.error(error)
    }
}

export const addQuiz = async (workspaceId: number,name: string) => {
    try {
        const quizzes = await getAllQuiz()
        let highestId: number = quizzes ? Math.max(...quizzes.map((quiz: QuizType) => quiz.id)) : 0
        const result = await axios.post(`${BASE_URL}/quizzes`, {
            id: ++highestId,
            name: name,
            workspace_id: workspaceId,
            created_at: new Date().toLocaleDateString('en-GB'),
            updated_at: new Date().toLocaleDateString('en-GB')
        })
        return result
    } catch (error) {
        console.error(error)
    }
}

export const getQuestions = async (quizId: number) => {
    try {
        const questions = await axios.get(`${BASE_URL}/questions`)
        const filteredQuestion = questions.data.filter((question: QuestionType) => question.quiz_id === quizId)
        return filteredQuestion
    } catch (error) {
        console.error(error)
    }
}

export const editQuestion = async (id: number | undefined, newQuestion: string) => {
    try {
        const result = await axios.patch(`${BASE_URL}/questions/${id}`, {
            question: newQuestion
        })
        return result
    } catch (error) {
        console.error(error)
    }
}

export const editOption = async (questionId: number | undefined, optionId: number | undefined, newOption: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/questions/${questionId}`)
        const question = response.data
    
        const updatedOptions = question.options.map((option: OptionType) => {
          if (option.id === optionId) {
            return { ...option, option: newOption }
          }
          return option
        })
    
        const result = await axios.patch(`${BASE_URL}/questions/${questionId}`, {
          options: updatedOptions,
        })
    
        return result
      } catch (error) {
        console.error(error)
      }
}

export const addQuestion = async (quizId: number) => {
    try {
        const questions = await getAllQuestion()
        let highestId: number = questions ? Math.max(...questions.map((question: QuestionType) => question.id)) : 0
        const result = await axios.post(`${BASE_URL}/questions`, {
            id: ++highestId,
            question: "Your question in here",
            quiz_id: quizId,
            options: [
                {
                  id: 1,
                  option: "Option 1"
                },
                {
                  id: 2,
                  option: "Option 2"
                },
                {
                  id: 3,
                  option: "Option 3"
                },
                {
                  id: 4,
                  option: "Option 4"
                },
            ],
            answer_key: 1
        })
        return result
    } catch (error) {
        console.error(error)
    }
}

export const getAllQuestion = async () => {
    try {
        const questions = await axios.get(`${BASE_URL}/questions`)
        return questions.data
    } catch (error) {
        console.error(error)
    }
}

export const deleteQuestion = async (id: number | undefined) => {
    try {
        const result = await axios.delete(`${BASE_URL}/questions/${id}`)
        return result
    } catch (error) {
        console.error(error)
    }
}