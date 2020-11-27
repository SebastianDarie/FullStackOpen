import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
	const dispatch = useDispatch()

	const loggedUser = JSON.parse(
		window.localStorage.getItem('loggedBlogAppUser')
	)
	const authorized = blog.user.username === loggedUser.username

	const btn = {
		display: authorized ? '' : 'none',
	}

	return (
		<div>
			<div className='flex flex-col'>
				<div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
					<div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
						<div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
							<table className='min-w-full divide-y divide-gray-200 mt-5 mb-5'>
								<thead>
									<tr>
										<th
											scope='col'
											className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
											Title
										</th>
										<th
											scope='col'
											className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
											URL
										</th>
										<th
											scope='col'
											className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
											Likes
										</th>
										<th scope='col' className='px-6 py-3 bg-gray-50'>
											<span className='sr-only'>Delete</span>
										</th>
									</tr>
								</thead>
								<tbody className='bg-white divide-y divide-gray-200'>
									<tr>
										<td className='px-6 py-4 whitespace-nowrap'>
											<div className='text-sm text-gray-900'>
												<Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
											</div>
											<div className='text-sm text-gray-500'>{blog.author}</div>
										</td>
										<td className='px-6 py-4 whitespace-nowrap'>
											<span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
												{blog.url}
											</span>
										</td>
										<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
											{blog.likes}
										</td>
										<td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
											<button
												className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm'
												id='delete-btn'
												style={btn}
												onClick={() => dispatch(removeBlog(blog.id))}>
												Delete
											</button>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Blog
