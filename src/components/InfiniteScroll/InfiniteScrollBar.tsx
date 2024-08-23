import React, { useEffect } from 'react'
import { getTodoList } from '../../userData/todoSlice'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'
import InfiniteScroll from 'react-infinite-scroll-component'

const InfiniteScrollBar: React.FC = () => {
    const dispatch = useAppDispatch()
    const { todos, hasMore } = useAppSelector((state) => state.todoSlice)
    const todolistResponse = useAppSelector((state) => state.todoSlice.todos)


    useEffect(() => {
        dispatch(getTodoList())
    }, [])

    const fetchMoreData = () => {
        dispatch(getTodoList())
    }

    return (
        <InfiniteScroll
            dataLength={todos.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={<p style={{ textAlign: 'center' }}>No More todos to load</p>}
        >
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
        </InfiniteScroll>

    )
}

export default InfiniteScrollBar