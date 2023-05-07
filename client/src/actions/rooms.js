import { addToFavorite } from "./user"
import deleteImages from "./utils/deleteImages"
import fetchData from "./utils/fetchData"


const url = process.env.REACT_APP_SERVER_URL + '/room'

export const createRoom = async (room, currentUser, dispatch, setPage) => {
    dispatch({type:'START_LOADING'})
    
    const result = await fetchData({url, body:room, token:currentUser?.token}, dispatch)
    if(result){
        dispatch({type:'UPDATE_ALERT', payload:{open:true, severity:'success', message:'The room has been added successfully'}})
        dispatch({type:'RESET_ROOM'})
        setPage(0)

        //launch room deatil in popup for user view when room is created
        dispatch({type:'UPDATE_ROOM', payload:result}) //update room is the single room information that is launched with a popup when not null
    }

    dispatch({type:'END_LOADING'})
}

export const getRooms = async(dispatch) => {
    const result = await fetchData({url, method:'GET'}, dispatch)
    if(result){
        dispatch({type:'UPDATE_ALL_ROOMS', payload:result})
    }
}

export const deleteRoom = async (room, currentUser, dispatch) => {
    dispatch({type:'START_LOADING'})
    
    const result = await fetchData({url:`${url}/${room._id}`, method:'DELETE', token:currentUser?.token}, dispatch)
    if(result){
        dispatch({type:'UPDATE_ALERT', payload:{open:true, severity:'success', message:'The room has been deleted successfully'}})
       

        //launch room deatil in popup for user view when room is created
        dispatch({type:'DELETE_ROOM', payload:result._id}) //update room is the single room information that is launched with a popup when not null
        deleteImages(room.images, currentUser.id)
    }

    dispatch({type:'END_LOADING'})
}
