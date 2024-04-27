import { Menu } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setisFileHandler } from '../../redux/reducer/misc'

function FileManager({ anchorE1 }) {
  const dispatch = useDispatch()
  const { isFileMenu } = useSelector(state => state.misc)
  const closeHandel = () => {
    dispatch(setisFileHandler(false))
  }
  return (
    <Menu anchorE1={anchorE1} open={isFileMenu} onClose={closeHandel}>
      <div style={{
        width: "10rem"
      }}>
        <h1>Hello</h1>
      </div>
    </Menu>
  )
}

export default FileManager
