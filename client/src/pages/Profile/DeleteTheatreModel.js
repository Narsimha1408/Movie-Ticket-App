import {Modal, message} from "antd"
import { DeleteTheatre } from "../../apicalls/theatres";

const DeleteTheatreModel=({isDeleteModalOpen, setIsDeleteModalOpen, selectedTheatre, setSelectedTheatre, getTheatresData})=>{
    const handleOk = async () => {
        try{
            const theatreId=selectedTheatre._id
            const res = await DeleteTheatre({theatreId}) //calling the api
            if(res.success){
                setIsDeleteModalOpen(false)
                message.success(res.message);
                getTheatresData();
            }
            else{
                setIsDeleteModalOpen(false)
                message.error(res.message)
                setSelectedTheatre(null)
            }
            
        }
        catch(error){
            setIsDeleteModalOpen(false)
            message.error(error.message);
        }
        

    };

    const handleCancel = () => {
        setIsDeleteModalOpen(false);
        setSelectedTheatre(null)
    };
    return(
        <>
            
            <Modal
                title="Delete Theatre"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isDeleteModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <div>
                    <p>Are you sure you want to delete {selectedTheatre.name}?</p>
                    <p>This action can't be undone and you'll lose the theatre data</p>
                </div>
            </Modal>
    </>
    )

}

export default DeleteTheatreModel;