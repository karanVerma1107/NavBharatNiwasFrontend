import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogsByPermalink } from './Actions/siteActions'

const EditBlog = () => {
    const dispatch = useDispatch()
    const {loading, error, blogs} = useSelector(state => state.getblogsbylink)
    

    
    
  return (<>
  <div style={{marginTop:'7vmax', minHeight:"48vmax"}}>


  </div>
  </>
  )
}

export default EditBlog