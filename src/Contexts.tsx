import { createContext } from "react"

export const AsideContext = createContext({
    isOpen: false,
    onOpen: () => {},
    onClose: () => {}
})

export const WorkspaceContext = createContext({
    workspaceId: 1,
    onOpen: (id: number) => { 
        console.log(`opening workspace with ID ${id}`) 
    },
    onCreate: () => {},
    onClose: () => {},
    onOption: () => {},
    onRename: () => {},
    onDelete: () => {}
})

export const QuizContext = createContext({
    quizId: 1,
    onOpen: (id: number) => { 
        console.log(`opening quiz with ID ${id}`) 
    },
    onCreate: () => {},
    onClose: () => {},
    onOption: () => {},
    onRename: () => {},
    onDelete: (id: number) => {
        console.log("deleting", id);
    },
    onEdit: (id: number) => {
        console.log(id,"editing");
    }
})