import { useContext } from "react"
import { WorkspaceContext } from "../Contexts"
import { AiOutlineClose } from "react-icons/ai";
import { BsPencilSquare, BsFillTrashFill } from "react-icons/bs";

const WorkspaceOption = () => {
    const { onClose, onRename, onDelete } = useContext(WorkspaceContext)

    const handleRenameWorkspace = async () => {
        await onClose()
        onRename()
    }

    const handleDeleteWorkspace = async () => {
        await onClose()
        onDelete()
    }

    return (
        <>
            <button className="absolute top-0 left-0 right-0 bottom-0 border-0 hover:border-0 outline-none bg-zinc-900 opacity-80 rounded-none" onClick={onClose} />
            <div className="absolute bottom-0 w-full h-48 bg-zinc-100 z-50 rounded-lg flex flex-col items-start py-4 px-6 text-zinc-800">
                <p className="flex items-center justify-between w-full font-medium text-xl mb-8">
                    <span>Workspace Options</span>
                    <AiOutlineClose onClick={onClose} className="cursor-pointer" />
                </p>
                <ul>
                    <li className="flex items-center cursor-pointer mb-8" onClick={handleRenameWorkspace}>
                        <BsPencilSquare size={20} className="text-zinc-500 me-4" />
                        <span className="text-sm">Rename</span>
                    </li>
                    <li className="flex items-center cursor-pointer" onClick={handleDeleteWorkspace}>
                        <BsFillTrashFill size={20} className="text-zinc-500 me-4" />
                        <span className="text-sm">Delete</span>
                    </li> 
                </ul>
            </div>
        </>
    )
}

export default WorkspaceOption