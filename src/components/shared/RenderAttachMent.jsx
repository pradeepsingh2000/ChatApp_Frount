import React from 'react'
import { transformImage } from '../../lib/feature';
import { FileOpen } from '@mui/icons-material';

function RenderAttachMent(file, url) {
  switch (file) {
    case 'vedio':
      return <vedio src={url} preload="none" width={"200px"} />

    case 'image':
      return <img src={transformImage(url, 200)} width={"200px"} height={"150px"} style={{
        objectFit: "contain"
      }} />

    case 'audio':
      return <audio src={url} preload='none' controls />
    default:
      return <FileOpen />

  }
}

export default RenderAttachMent
