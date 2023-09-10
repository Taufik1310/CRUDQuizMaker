import { useState } from 'react'
import { AsideContext, QuizContext, WorkspaceContext } from "../Contexts"
import Aside from "../components/Aside"
import Navbar from "../components/Navbar"
import Header from '../components/Header'
import CreateWorkspace from '../components/CreateWorkspace'
import WorkspaceOption from '../components/WorkspaceOption'
import EditWorkspace from '../components/EditWorkspace'
import DeleteWorkspace from '../components/DeleteWorkspace'
import Workspace from '../components/Workspace'
import DeleteQuiz from '../components/DeleteQuiz'
import CreateQuiz from '../components/CreateQuiz'
import EditQuiz from '../components/EditQuiz'

const Home = () => {
    const [isOpenAside, setIsOpenAside] = useState(false)
    const [isOpenWorkspace, setIsOpenWorkspace] = useState({
        create: false,
        option: false,
        rename: false,
        delete: false
    })
    const [isOpenQuiz, setIsOpenQuiz] = useState({
        create: false,
        option: false,
        rename: false,
        delete: false,
        edit: false
    })
    const [workspaceId, setWorkspaceId] = useState(1)
    const [quizId, setQuizId] = useState(1)

    const handleAsideOpened = () => {
        setIsOpenAside(true)
    }

    const handleAsideClosed = () => {
        setIsOpenAside(false)
    }

    const handleWorkspaceClosed = () => {
        setIsOpenWorkspace({
            create: false,
            option: false,
            rename: false,
            delete: false
        })
    }

    const handleQuizClosed = () => {
        setIsOpenQuiz({
            create: false,
            option: false,
            rename: false,
            delete: false,
            edit: false
        })
    }

    const handleQuizDeleted = (id: number) => {
        setIsOpenQuiz({ ...isOpenQuiz, delete: true })
        setQuizId(id)
    }

    const handleQuizEdited = (id: number) => {
        setIsOpenQuiz({ ...isOpenQuiz, edit: true })
        setQuizId(id)
    }

    return (
        <main className="bg-zinc-200 w-screen h-screen overflow-hidden">
            <WorkspaceContext.Provider value={{ 
                workspaceId: workspaceId,
                onOpen: (id) => setWorkspaceId(id),
                onCreate: () => setIsOpenWorkspace({ ...isOpenWorkspace, create: true }),
                onClose: handleWorkspaceClosed,
                onOption: () => setIsOpenWorkspace({ ...isOpenWorkspace, option: true }),
                onRename: () => setIsOpenWorkspace({ ...isOpenWorkspace, rename: true }),
                onDelete: () => setIsOpenWorkspace({ ...isOpenWorkspace, delete: true })
             }}>
                <QuizContext.Provider value={{ 
                    quizId: quizId,
                    onOpen: (id) => setQuizId(id),
                    onCreate: () => setIsOpenQuiz({ ...isOpenQuiz, create: true }),
                    onClose: handleQuizClosed,
                    onOption: () => setIsOpenQuiz({ ...isOpenQuiz, option: true }),
                    onRename: () => setIsOpenQuiz({ ...isOpenQuiz, rename: true }),
                    onDelete: handleQuizDeleted,
                    onEdit: handleQuizEdited
                 }}>
                    <AsideContext.Provider value={{ 
                        isOpen: isOpenAside,
                        onOpen: handleAsideOpened,
                        onClose: handleAsideClosed
                    }}>
                        <Header />
                        <Navbar />
                        <div className='flex items-center'>
                            <Aside />
                            {
                                !isOpenQuiz.edit ?  <Workspace /> : <EditQuiz />
                            }
                        </div>
                        {isOpenWorkspace.create && <CreateWorkspace />}
                        {isOpenWorkspace.option && <WorkspaceOption />}
                        {isOpenWorkspace.rename && <EditWorkspace />}
                        {isOpenWorkspace.delete && <DeleteWorkspace />}
                        {isOpenQuiz.delete && <DeleteQuiz />}
                        {isOpenQuiz.create && <CreateQuiz />}
                    </AsideContext.Provider>
                </QuizContext.Provider>
            </WorkspaceContext.Provider>
        </main>
    )
}

export default Home