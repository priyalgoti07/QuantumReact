import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'
import { getTodoList } from '../../userData/todoSlice'

const InfiniteScroll: React.FC = () => {
    const dispatch = useAppDispatch()
    const todolistResponse = useAppSelector((state) => state.todoSlice.todos);
    console.log("todolistResponse", todolistResponse);


    useEffect(() => {
        dispatch(getTodoList())
    }, [])
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6 p-4">
            {todolistResponse && todolistResponse.map((item) => (
                <div key={item.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="p-4">
                        <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                    </div>
                    <div className="bg-gray-100 p-4">
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur, sunt.</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default InfiniteScroll